package auth

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"taptitans_auth/cipher"
	"taptitans_auth/db"
	"taptitans_auth/env"
	"taptitans_auth/utils"
	"time"

	"gopkg.in/mgo.v2/bson"

	qq_connect "git.hortorgames.com/hortor/qqapi/connect"
	mp_oauth2 "git.hortorgames.com/hortor/qqapi/mp/oauth2"

	"github.com/garyburd/redigo/redis"
	"github.com/julienschmidt/httprouter"
	"github.com/ungerik/go-dry"
)

const (
	COOKIE_NAME = "taptitans_encrypted_id"
)

var (
	ErrInvalidParam = errors.New("参数错误")
)

func UseHandler(mux *httprouter.Router) {
	mux.HandlerFunc("GET", "/taptitans/share", ShareHandler)
	mux.HandlerFunc("GET", "/taptitans/index", IndexHandler)
	mux.HandlerFunc("GET", "/taptitans/login", LoginHandler)
	mux.HandlerFunc("GET", "/taptitans/remove-cookie", RemoveCookieHandler)
	mux.HandlerFunc("POST", "/taptitans/add-goods", AddGoodsHandler)
	mux.HandlerFunc("POST", "/taptitans/update-subscribe", UpdateSubscribeHandler)
}

func buildClientUrl(channel, scode string) (url string) {
	return fmt.Sprintf("http://h5-qq.hortorgames.com/taptitans.html?channel=%s&scode=%s", channel, scode)
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie(COOKIE_NAME)
	if err == http.ErrNoCookie {
		err = nil
		cookie = nil
	}
	if cookie == nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte{})
		return
	}
	playerId := cipher.DecryptCookie(cookie)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(playerId))
	return
}

func AddGoodsHandler(w http.ResponseWriter, r *http.Request) {
	openId := r.Header.Get("X-SESSION-ID")
	goodsId := r.FormValue("goodsId")
	if openId == "" || goodsId == "" {
		utils.ErrorHandler(ErrInvalidParam, w, r)
		return
	}
	goodsInfo := env.Goods[goodsId]
	player := Player{}
	c := db.GameMongoDB.C("players")
	err := c.Find(bson.M{"uniqueId": openId}).One(&player)
	if err != nil {
		utils.ErrorHandler(err, w, r)
		return
	}
	diamond := goodsInfo.DiamondNum
	count := player.PurchaseCount[goodsId]
	if count == 0 && goodsInfo.Id < 310 {
		diamond = diamond * 2
	}
	player.PurchaseCount[goodsId] = count + 1
	if goodsInfo.Id < 310 {
		c.Update(bson.M{"id": player.Id}, bson.M{
			"$inc": bson.M{"diamond": diamond, "purchaseNum": goodsInfo.Cost},
			"$set": bson.M{"purchaseTime": bson.Now(), "purchaseCount": player.PurchaseCount},
		})
	} else if goodsInfo.Id == 311 {
		//月卡
		c.Update(bson.M{"id": player.Id}, bson.M{
			"$inc": bson.M{"purchaseNum": goodsInfo.Cost},
			"$set": bson.M{"monthCardTime": bson.Now(), "purchaseTime": bson.Now(), "purchaseCount": player.PurchaseCount},
		})
	} else if goodsInfo.Id == 312 {
		//新手礼包
		c.Update(bson.M{"id": player.Id}, bson.M{
			"$inc": bson.M{"diamond": diamond, "purchaseNum": goodsInfo.Cost},
			"$set": bson.M{"isNewbiePackageBought": true, "purchaseTime": bson.Now(), "purchaseCount": player.PurchaseCount},
		})
	} else if goodsInfo.Id == 313 {
		//至尊月卡
		c.Update(bson.M{"id": player.Id}, bson.M{
			"$inc": bson.M{"purchaseNum": goodsInfo.Cost},
			"$set": bson.M{"supMonthCardTime": bson.Now(), "purchaseTime": bson.Now(), "purchaseCount": player.PurchaseCount},
		})
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte{})
	return
}

func UpdateSubscribeHandler(w http.ResponseWriter, r *http.Request) {
	openId := r.Header.Get("X-SESSION-ID")
	status := r.FormValue("status")
	if openId == "" || status == "" {
		utils.ErrorHandler(ErrInvalidParam, w, r)
		return
	}
	player := Player{}
	c := db.GameMongoDB.C("players")
	query := c.Find(bson.M{"uniqueId": openId})
	err := query.One(&player)
	if err != nil {
		utils.ErrorHandler(err, w, r)
		return
	}
	if player.Id == 0 {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte{})
		return
	}
	if status == "true" && player.IsSubscribed == false {
		err := c.Update(bson.M{"uniqueId": openId}, bson.M{"$set": bson.M{"isSubscribed": true}})
		if err != nil {
			utils.ErrorHandler(err, w, r)
			return
		}
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte{})
	return
}

func RemoveCookieHandler(w http.ResponseWriter, r *http.Request) {
	cookie := &http.Cookie{
		Name:   COOKIE_NAME,
		Value:  "",
		MaxAge: 0,
	}
	d := time.Duration(cookie.MaxAge) * time.Second
	cookie.Expires = time.Now().Add(d).UTC()
	http.SetCookie(w, cookie)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte{})
	return
}

func ShareHandler(w http.ResponseWriter, r *http.Request) {
	scode := r.FormValue("scode")
	channel := "hortor"
	if r.FormValue("channel") != "" {
		channel = r.FormValue("channel")
	}
	//如果存在cookie, 直接跳转到客户端
	cookie, err := r.Cookie(COOKIE_NAME)
	if err == http.ErrNoCookie {
		err = nil
		cookie = nil
	}
	if cookie != nil {
		url := buildClientUrl(channel, scode)
		utils.RedirectHandler(url, w, r)
		return
	}
	code := r.FormValue("code")
	openId := ""
	redirectUrl := fmt.Sprintf("%s/taptitans/share?channel=%s&scode=%s", env.Host, channel, scode)
	oauth2Config := mp_oauth2.NewOAuth2Config(
		env.QQMPAppId,
		env.QQMPAppSecret,
		redirectUrl,
		nil,
	)
	if code == "" {
		//如果无code，跳转到授权
		utils.RedirectHandler(oauth2Config.AuthCodeURL(""), w, r)
		return
	} else {
		//如果有code，获取openid
		if openId, err = oauth2Config.ExchangeOpenId(code); err != nil {
			utils.ErrorHandler(err, w, r)
			return
		}
	}
	playerId, err := db.Redis.GetString(openId)
	if err == redis.ErrNil {
		err = nil
		playerId = ""
	}
	if err != nil {
		utils.ErrorHandler(err, w, r)
		return
	}
	if playerId != "" {
		//如果能找到用户，设置cookie,跳转到客户端
		utils.CookieHandler(COOKIE_NAME, env.Host, playerId, w)
		utils.RedirectHandler(buildClientUrl(channel, scode), w, r)
		return
	} else {
		//如果找不到用户，跳转到index
		url := fmt.Sprintf("%s/taptitans/index?channel=%s&scode=%s", env.Host, channel, scode)
		utils.RedirectHandler(url, w, r)
		return
	}

}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	scode := r.FormValue("scode")
	channel := "hortor"
	if r.FormValue("channel") != "" {
		channel = r.FormValue("channel")
	}
	redirectUrl := fmt.Sprintf("%s/taptitans/index?channel=%s&scode=%s", env.Host, channel, scode)
	if r.FormValue("code") == "" {
		//如果没有code,跳转去授权
		url := qq_connect.GetAuthorizationCodeUrl(env.QQConnectAppId, redirectUrl, "", "")
		utils.RedirectHandler(url, w, r)
		return
	} else {
		//如果有code，检查是否已创建角色
		var accessToken, openId string
		var err error
		if accessToken, _, _, err = qq_connect.GetAccessToken(env.QQConnectAppId, env.QQConnectAppKey, r.FormValue("code"), redirectUrl); err != nil {
			return
		}
		if openId, err = qq_connect.GetOpenId(accessToken); err != nil {
			return
		}
		var userInfo *qq_connect.UserInfo
		if userInfo, err = qq_connect.GetUserInfo(accessToken, env.QQConnectAppId, openId); err != nil {
			return
		}
		playerId, err := db.Redis.GetString(openId)
		if err == redis.ErrNil {
			err = nil
			playerId = ""
		}
		if err != nil {
			utils.ErrorHandler(err, w, r)
			return
		}
		if playerId == "" {
			//新用户，创建用户
			id, err := createUser(openId, channel, userInfo)
			if err != nil {
				utils.ErrorHandler(err, w, r)
				return
			}
			//记录渠道
			query := "INSERT INTO `gamecenter_qq`.`channel`(`open_id`,`game_id`,`channel`,`created_at`) VALUES(?,?,?,?)"
			stmt, err := db.MySQL.Prepare(query)
			if err != nil {
				utils.ErrorHandler(err, w, r)
				return
			}
			defer stmt.Close()
			_, err = stmt.Exec(openId, "taptitans", channel, time.Now().Unix())
			if err != nil {
				utils.ErrorHandler(err, w, r)
				return
			}
			utils.CookieHandler(COOKIE_NAME, env.Host, fmt.Sprint(id), w)
			utils.RedirectHandler(buildClientUrl(channel, scode), w, r)
			return
		} else {
			//老用户，设置cookie，跳转到客户端
			utils.CookieHandler(COOKIE_NAME, env.Host, playerId, w)
			utils.RedirectHandler(buildClientUrl(channel, scode), w, r)
			return
		}

	}
}

type Player struct {
	UniqueId              string           `bson:"uniqueId"`
	Id                    int              `bson:"id"`
	Id_                   int              `bson:"_id"`
	CreateTime            time.Time        `bson:"createTime"`
	LastTimeLogout        time.Time        `bson:"lastTimeLogout"`
	Achievements          []map[string]int `bson:"achievements"`
	Name                  string           `bson:"name"`
	LoginType             string           `bson:"native"`
	Avatar                string           `bson:"avatar"`
	ShareCode             string           `bson:"shareCode"`
	Channel               string           `bson:"channel"`
	ServerId              int              `bson:"serverId"`
	Location              string           `bson:"location"`
	IsSubscribed          bool             `bson:"isSubscribed"`
	ContestId             string           `bson:"contestId"`
	HeroWeapons           []int            `bson:"heroWeapons"`
	ShopItems             []int            `bson:"shopItems"`
	MailBox               []interface{}    `bson:"mailBox"`
	PurchaseCount         map[string]int   `bson:"purchaseCount"`
	MasterEquips          []int            `bson:"masterEquips"`
	EquipValues           []int            `bson:"equipValues"`
	Diamond               int              `bson:"diamond"`
	IsNewbiePackageBought bool             `bson:"isNewbiePackageBought"`
	MonthCardTime         time.Time        `bson:"monthCardTime"`
	SupMonthCardTime      time.Time        `bson:"supMonthCardTime"`
	Friends               []int            `bson:"friends"`
	ProtectExpire         time.Time        `bson:"protectExpire"`
	IsBanned              bool             `bson:"isBanned"`
	PurchaseNum           int              `bson:"purchaseNum"`
	Guild                 int              `bson:"guild"`
	PurchaseTime          time.Time        `bson:"purchaseTime"`
}

func createUser(openId string, channel string, userInfo *qq_connect.UserInfo) (playerId int64, err error) {
	var serverIdStr string
	var serverId int
	serverIdStr, err = db.GameRedis.GetString("counter:GameServer")
	if err == redis.ErrNil {
		err = nil
		serverIdStr = ""
	}
	if err != nil {
		return
	}
	if serverIdStr == "" {
		serverIdStr = "1"
	}
	serverId, err = strconv.Atoi(serverIdStr)
	if err != nil {
		return
	}
	playerId, err = db.GameRedis.Increase("counter:Player")
	if err != nil {
		return
	}
	shareCode := dry.StringMD5Hex(fmt.Sprint(playerId))
	err = db.GameRedis.SetString(shareCode, fmt.Sprint(playerId))
	if err != nil {
		return
	}
	err = db.GameRedis.SetString(openId, fmt.Sprint(playerId))
	if err != nil {
		return
	}
	achievements := make([]map[string]int, 15)
	for i, _ := range achievements {
		achievements[i] = map[string]int{
			"id":    i,
			"value": 0,
			"stars": 0,
		}
	}
	player := Player{
		UniqueId:       openId,
		Id:             int(playerId),
		Id_:            int(playerId),
		CreateTime:     bson.Now(),
		LastTimeLogout: bson.Now(),
		Achievements:   achievements,
		Name:           userInfo.Nickname,
		LoginType:      "native",
		Avatar:         userInfo.Figureurl_qq_1,
		ShareCode:      shareCode,
		Channel:        channel,
		ServerId:       serverId,
		Location:       "北京",
		IsSubscribed:   false,
		ContestId:      "none",
		HeroWeapons:    make([]int, 33),
		ShopItems:      make([]int, 7),
		MailBox:        make([]interface{}, 0),
		PurchaseCount: map[string]int{
			"301": 0,
		},
		MasterEquips:          make([]int, 7),
		EquipValues:           make([]int, 7),
		Diamond:               0,
		MonthCardTime:         time.Unix(0, 0),
		SupMonthCardTime:      time.Unix(0, 0),
		IsNewbiePackageBought: false,
		Friends:               []int{},
		ProtectExpire:         time.Unix(0, 0),
		IsBanned:              false,
		PurchaseNum:           0,
		Guild:                 0,
		PurchaseTime:          time.Unix(0, 0),
	}
	err = db.GameMongoDB.C("players").Insert(player)
	if err != nil {
		return
	}
	return
}
