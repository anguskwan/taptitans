package main

import (
	"log"
	"net/http"
	"os"

	"github.com/codegangsta/negroni"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"

	"taptitans_auth/auth"
	"taptitans_auth/db"
	"taptitans_auth/env"
	"taptitans_auth/graylog"
	"taptitans_auth/qq"
)

func main() {
	logger := log.New(os.Stdout, "[wxauth] ", 0)
	if len(os.Args) < 2 {
		panic("Can not find environment!")
	}
	envParam := os.Args[1]
	logger.Printf("environment is [%s]", envParam)

	/******初始化全局配置*******/
	if err := env.InitEnvConfig(envParam); err != nil {
		panic(err)
	}

	/********初始化数据库*******/
	if err := db.InitDB(); err != nil {
		panic(err)
	}
	defer db.CloseDB()

	/*******初始化QQ-token服务器******/
	if err := qq.InitTokenServer(); err != nil {
		panic(err)
	}

	/*******初始化graylog*******/
	graylog.Init(graylog.Config{
		GraylogHostname: "log.hortorgames.com",
		Application:     "taptitans_auth",
	})

	mux := httprouter.New()

	//微信登陆与推送
	auth.UseHandler(mux)

	n := negroni.Classic()
	c := cors.New(cors.Options{
		Debug:            false,
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})
	n.Use(c)

	n.UseHandler(mux)

	addr := env.Port
	logger.Printf("listening on %s", addr)
	server := http.Server{
		Addr:    addr,
		Handler: n,
	}
	err := server.ListenAndServe()
	logger.Fatal("exit unexpectedly: ", err)
}
