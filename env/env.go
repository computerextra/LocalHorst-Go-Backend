package env

import (
	"log"

	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"
)

type Config struct {
	DATABASE_URL     string `env:"DATABASE_URL,required"`
	CMS_DATABASE_URL string `env:"CMS_DATABASE_URL,required"`
	VITE_PORT        int    `env:"VITE_PORT,required"`
	VITE_API         string `env:"VITE_API,required"`
	ARCHIVE_PATH     string `env:"ARCHIVE_PATH,required"`
	UPLOAD_FOLDER    string `env:"UPLOAD_FOLDER,required"`
	MAIL_FROM        string `env:"MAIL_FROM,required"`
	MAIL_SERVER      string `env:"MAIL_SERVER,required"`
	MAIL_PORT        int    `env:"MAIL_PORT,required"`
	MAIL_USER        string `env:"MAIL_USER,required"`
	MAIL_PASSWORD    string `env:"MAIL_PASSWORD,required"`
	SAGE_SERVER      string `env:"SAGE_SERVER,required"`
	SAGE_PORT        int    `env:"SAGE_PORT,required"`
	SAGE_USER        string `env:"SAGE_USER,required"`
	SAGE_PASS        string `env:"SAGE_PASS,required"`
	SAGE_DB          string `env:"SAGE_DB,required"`
	ACCESS_DB        string `env:"ACCESS_DB,required"`
}

// Get .env Vars
func GetEnv() Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("unable to load .env file: %e", err)
	}

	cfg := Config{} // 👈 new instance of `Config`

	err = env.Parse(&cfg) // 👈 Parse environment variables into `Config`
	if err != nil {
		log.Fatalf("unable to parse ennvironment variables: %e", err)
	}

	return cfg
}
