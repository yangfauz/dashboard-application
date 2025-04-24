package sqlx

import (
	"log"

	"backend-service/config"

	"github.com/jmoiron/sqlx"

	_ "github.com/mattn/go-sqlite3"
)

func InitSqliteConnection(config config.Config) (*sqlx.DB, error) {

	db, err := sqlx.Connect("sqlite3", config.Connection.Sqlite.Database)
	if err != nil {
		return nil, err
	}

	log.Println("Sqlite connected successfully...")

	return db, err
}
