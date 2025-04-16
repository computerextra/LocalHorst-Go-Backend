package db

import (
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type Database struct {
	conn *sqlx.DB
}

func GetConnection(DatabaseUrl string) (*Database, error) {
	conn, err := sqlx.Open("mysql", DatabaseUrl)
	if err != nil {
		return nil, err
	}

	err = conn.Ping()
	if err != nil {
		return nil, err
	}

	conn.SetConnMaxIdleTime(10 * time.Minute)
	conn.SetMaxIdleConns(10)
	conn.SetMaxOpenConns(10)

	return &Database{
		conn: conn,
	}, nil
}
