package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	mgo "gopkg.in/mgo.v2"

	"taptitans_auth/env"
)

var Redis *RedisDB
var GameRedis *RedisDB
var MySQL *sql.DB
var GameMongoDB *mgo.Database

func InitDB() (err error) {
	//初始化redis
	optionCache := NewRedisOption("tcp", fmt.Sprintf("%s:%s", env.RedisHost, env.RedisPort), env.RedisPassword)
	optionCache.SetMaxAge(0)
	optionCache.SetMaxLength(0)
	if Redis, err = NewRedisDBWithOption(optionCache); err != nil {
		return
	}

	optionGameRedis := NewRedisOption("tcp", fmt.Sprintf("%s:%s", env.GameRedisHost, env.GameRedisPort), env.GameRedisPassword)
	optionGameRedis.SetMaxAge(0)
	optionGameRedis.SetMaxLength(0)
	if GameRedis, err = NewRedisDBWithOption(optionGameRedis); err != nil {
		return
	}
	session, err := mgo.Dial(env.MongoDBConnection)
	if err != nil {
		panic(err)
	}
	GameMongoDB = session.DB("taptitans")
	if MySQL, err = sql.Open("mysql", env.MySqlConnection); err != nil {
		return
	}
	MySQL.SetMaxOpenConns(50)
	MySQL.SetMaxIdleConns(30)
	return
}

func CloseDB() {
	Redis.Option.Close()
	GameRedis.Option.Close()
	MySQL.Close()
	GameMongoDB.Session.Close()
}
