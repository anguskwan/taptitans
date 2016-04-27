package qq

import (
	"taptitans_auth/db"

	"git.hortorgames.com/hortor/qqapi/mp"
)

var QQTokenServer mp.AccessTokenServer

func InitTokenServer() (err error) {
	// auth is slave
	QQTokenServer = mp.NewSlaveAccessTokenServer(db.Redis)
	return
}
