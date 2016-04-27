package cipher

import (
	"bytes"
	"crypto/cipher"
	"crypto/des"
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"
)

func PKCS5Padding(ciphertext []byte, blockSize int) []byte {
	padding := blockSize - len(ciphertext)%blockSize
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(ciphertext, padtext...)
}

func PKCS5UnPadding(origData []byte) []byte {
	length := len(origData)
	// 去掉最后一个字节 unpadding 次
	unpadding := int(origData[length-1])
	return origData[:(length - unpadding)]
}

func DesEncrypt(origData, key []byte) ([]byte, error) {
	block, err := des.NewCipher(key)
	if err != nil {
		return nil, err
	}
	origData = PKCS5Padding(origData, block.BlockSize())
	// origData = ZeroPadding(origData, block.BlockSize())
	blockMode := cipher.NewCBCEncrypter(block, key)
	crypted := make([]byte, len(origData))
	// 根据CryptBlocks方法的说明，如下方式初始化crypted也可以
	// crypted := origData
	blockMode.CryptBlocks(crypted, origData)
	return crypted, nil
}

func DesDecrypt(crypted, key []byte) ([]byte, error) {
	block, err := des.NewCipher(key)
	if err != nil {
		return nil, err
	}
	blockMode := cipher.NewCBCDecrypter(block, key)
	origData := make([]byte, len(crypted))
	blockMode.CryptBlocks(origData, crypted)
	origData = PKCS5UnPadding(origData)
	return origData, nil
}

func EncryptCookie(cookie *http.Cookie) (err error) {
	originalStr := fmt.Sprintf("%s#%d#%s", SECRET, cookie.Expires.Unix(), cookie.Value)
	var cryptedBytes []byte
	cryptedBytes, err = DesEncrypt([]byte(originalStr), []byte(SECRET))
	if err != nil {
		return
	}
	cookie.Value = hex.EncodeToString(cryptedBytes)
	return
}

func DecryptCookie(cookie *http.Cookie) (decrptedOpenId string) {
	decoded, err := hex.DecodeString(cookie.Value)
	decrypted, err := DesDecrypt(decoded, []byte(SECRET))
	if err != nil {
		return
	}
	params := strings.Split(string(decrypted), "#")
	var t int
	t, err = strconv.Atoi(params[1])
	if err != nil {
		return
	}
	var expire time.Time
	expire = time.Unix(int64(t), 0)
	if err != nil || params[0] != SECRET || expire.Before(time.Now()) {
		return
	}
	decrptedOpenId = params[2]
	return
}

func GenerateShareCode(openId string) (shareCode string) {
	data := []byte(fmt.Sprint("hortorgames@", openId))
	shareCode = fmt.Sprintf("%x", sha1.Sum(data))
	return
}

const SECRET = "AABBCCDD"
