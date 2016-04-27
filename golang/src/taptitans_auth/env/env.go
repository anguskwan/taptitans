package env

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
)

var RedisHost string
var RedisPort string
var RedisPassword string
var GameRedisHost, GameRedisPort, GameRedisPassword string
var Host string
var Port string
var MySqlConnection string
var MongoDBConnection string

var Env string

var QQMPAppId, QQMPAppSecret, QQConnectAppId, QQConnectAppKey string

type GoodsInfo struct {
	Cost       int
	CostType   string
	Desc       string
	DiamondNum int
	Id         int
	Name       string
}

var Goods map[string]GoodsInfo

func InitEnvConfig(env string) (err error) {
	Env = env
	var envFile *os.File
	if envFile, err = os.Open(fmt.Sprintf("data/env/%s.json", env)); err != nil {
		return err
	}
	defer envFile.Close()
	fileReader := bufio.NewReader(envFile)
	decoder := json.NewDecoder(fileReader)
	var jsonMap map[string]string
	if err = decoder.Decode(&jsonMap); err != nil {
		return err
	}
	RedisHost = jsonMap["redis_host"]
	RedisPort = jsonMap["redis_port"]
	RedisPassword = jsonMap["redis_password"]
	GameRedisHost = jsonMap["game_redis_host"]
	GameRedisPort = jsonMap["game_redis_port"]
	GameRedisPassword = jsonMap["game_redis_password"]

	Host = jsonMap["host"]
	Port = jsonMap["port"]
	MySqlConnection = jsonMap["mysql_connection"]
	MongoDBConnection = jsonMap["mongodb_connection"]

	QQMPAppId = "200460948"
	QQMPAppSecret = "hlsMud26FXbjIFnD"
	QQConnectAppId = "101267141"
	QQConnectAppKey = "0e20e9712f8ed440f7298e359301b340"

	Goods = map[string]GoodsInfo{
		"301": {
			Cost:       12,
			CostType:   "rmb",
			Desc:       "",
			DiamondNum: 180,
			Id:         301,
			Name:       "180钻石",
		},
		"302": {
			Cost:       30,
			CostType:   "rmb",
			Desc:       "钻石增加11%",
			DiamondNum: 500,
			Id:         302,
			Name:       "500钻石",
		},
		"303": {
			Cost:       68,
			CostType:   "rmb",
			Desc:       "钻石增加33%",
			DiamondNum: 1200,
			Id:         303,
			Name:       "1200钻石",
		},
		"304": {
			Cost:       168,
			CostType:   "rmb",
			Desc:       "钻石增加38%",
			DiamondNum: 3100,
			Id:         304,
			Name:       "3100钻石",
		},
		"305": {
			Cost:       328,
			CostType:   "rmb",
			Desc:       "钻石增加44%",
			DiamondNum: 6500,
			Id:         305,
			Name:       "6500钻石",
		},
		"306": {
			Cost:       648,
			CostType:   "rmb",
			Desc:       "钻石增加56%",
			DiamondNum: 14000,
			Id:         306,
			Name:       "14000钻石",
		},
		"311": {
			Cost:       18,
			CostType:   "rmb",
			Desc:       "每月天天领钻石",
			DiamondNum: 0,
			Id:         311,
			Name:       "钻石月卡",
		},
		"312": {
			Cost:       6,
			CostType:   "rmb",
			Desc:       "新手礼包",
			DiamondNum: 270,
			Id:         312,
			Name:       "新手礼包",
		},
		"313": {
			Cost:       88,
			CostType:   "rmb",
			Desc:       "每月天天领钻石",
			DiamondNum: 0,
			Id:         313,
			Name:       "至尊月卡",
		},
	}
	return
}

func IsStaging() bool {
	return Env == "test"
}
