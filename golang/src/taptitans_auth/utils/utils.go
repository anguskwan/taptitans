package utils

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"net/url"
	"sort"
	"strings"
	"time"

	"taptitans_auth/cipher"
	"taptitans_auth/graylog"

	"github.com/cznic/mathutil"
	dry "github.com/ungerik/go-dry"
)

func ErrorHandler(err error, w http.ResponseWriter, r *http.Request) {
	graylog.Error(err.Error(), map[string]interface{}{
		"error": err,
		"url":   r.RequestURI,
	})
	w.WriteHeader(http.StatusBadRequest)
	w.Write([]byte(err.Error()))
}

func RedirectHandler(url string, w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, url, http.StatusFound)
}

func SaveURLParameters(formValue url.Values, ignoreParams []string) (params map[string]string) {
	params = make(map[string]string)
	for k, v := range formValue {
		if dry.StringInSlice(k, ignoreParams) {
			continue
		}
		params[k] = v[0]
	}
	return
}

func BuildURLParameterString(paramsArr []map[string]string) (str string) {
	for _, params := range paramsArr {
		for k, v := range params {
			str += fmt.Sprintf("&%s=%s", k, v)
		}
	}
	if len(str) > 0 {
		str = str[1:]
	}
	return
}

const chars = "abcdefghijklmnopqrstuvwxyz0123456789"

func GetNonce() (nonce string) {
	for i := 0; i < 32; i++ {
		nonce += string(chars[rand.Int()%len(chars)])
	}
	return nonce
}

func AddRandomDomainPrefix(url string) (urlStr string) {
	prefix := "gc"
	for i := 0; i < 3; i++ {
		randNum := rand.Int() % 10
		prefix = fmt.Sprint(prefix, randNum)
	}
	urlStr = fmt.Sprint("http://", prefix, ".", url[7:])
	return
}

func JsonRender(resp interface{}, w http.ResponseWriter, status int) {
	bytes, _ := json.Marshal(resp)
	w.Header().Set("X-Powered-By", "Hortor Server")
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	fmt.Fprintf(w, "%s", bytes)
	return
}

// sort Map by Value
type Pair struct {
	Key   string
	Value int64
}

type PairList []Pair

func (p PairList) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }
func (p PairList) Len() int           { return len(p) }
func (p PairList) Less(i, j int) bool { return p[i].Value < p[j].Value }

// A function to turn a map into a PairList, then sort and return it.
func SortMapByValue(m map[string]int64) PairList {
	p := make(PairList, 0)
	for k, v := range m {
		pair := Pair{k, v}
		p = append(p, pair)
	}
	sort.Sort(p)
	return p
}

func DistinctStringSlice(slice []string) (ret []string) {
	m := make(map[string]int)

	for _, s := range slice {
		m[s] = 1
	}
	for k, _ := range m {
		ret = append(ret, k)
	}
	return
}

func CookieHandler(cookieName, domain string, openId string, w http.ResponseWriter) {
	cookie := &http.Cookie{
		Name:   cookieName,
		Value:  openId,
		MaxAge: 2 * 60 * 60,
	}
	d := time.Duration(cookie.MaxAge) * time.Second
	cookie.Expires = time.Now().Add(d).UTC()
	if err := cipher.EncryptCookie(cookie); err != nil {
		return
	}
	http.SetCookie(w, cookie)
}

func StringInSlice(a string, list []string) bool {
	for _, b := range list {
		if b == a {
			return true
		}
	}
	return false
}

func StringSliceMerge(slice []string, otherSlice []string) (ret []string) {
	mergeMap := make(map[string]string, 0)
	for _, v := range slice {
		mergeMap[v] = v
	}
	for _, v := range otherSlice {
		mergeMap[v] = v
	}
	ret = make([]string, len(mergeMap))
	i := 0
	for _, s := range mergeMap {
		ret[i] = s
		i++
	}
	return
}

func GenerateShareChannel(channel string) (newChannel string) {
	if channel == "" {
		channel = "hortor"
	}
	if channel[len(channel)-1:] == "_" {
		newChannel = channel
	} else {
		newChannel = channel + "_"
	}
	return
}

func CountDown(seconds int) {
	for i := 0; i < seconds; i++ {
		log.Println("ready to go, ", seconds-i)
		time.Sleep(time.Second)
	}
}

func SplitArrayByCount(arr []string, count int) (result [][]string) {
	for i := 0; i < len(arr); i += count {
		result = append(result, arr[i:mathutil.Min(i+count, len(arr))])
	}
	return
}

func SendHttpPost(url, content, openId string) (statusCode int, body string, err error) {
	var req *http.Request
	req, err = http.NewRequest("POST", url, strings.NewReader(content))
	if err != nil {
		return
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	if openId != "" {
		req.Header.Set("X-SESSION-ID", openId)
	}
	var resp *http.Response
	client := &http.Client{}
	resp, err = client.Do(req)
	if err != nil {
		// log.Println("xzhaodebug client DO err", err)
		body = err.Error()
		return
	}
	defer resp.Body.Close()
	statusCode = resp.StatusCode
	var respBody []byte
	respBody, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		body = err.Error()
		return
	}
	body = string(respBody)
	// log.Println("xzhaodebug HttpRequest body: ", body)
	return
}
