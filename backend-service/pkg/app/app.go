package app

import (
	"backend-service/config"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type AppConfig struct {
	Db     *sqlx.DB
	Router *mux.Router
	Config *config.Config
}
