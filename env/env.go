package env

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// Get .env Vars
func GetEnv(key string) string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv(key)
}
