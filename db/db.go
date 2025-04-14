package db

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

type Database struct {
	connectionString string
}

func New(connectionString string) *Database {
	return &Database{
		connectionString: connectionString,
	}
}

func getConnection(DatabaseUrl string) (*sql.DB, error) {
	conn, err := sql.Open("mysql", DatabaseUrl)
	if err != nil {
		return nil, err
	}
	return conn, nil
}
