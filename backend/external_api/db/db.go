package db

import (
	"database/sql"
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type Config struct {
	host     string
	port     int
	user     string
	password string
	name     string
}

type DbConfig struct {
	host string
	name string
	Port int
	Db   *sql.DB
}

func (cfg Config) connect() *DbConfig {
	db_conn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s",
		cfg.host,
		cfg.user,
		cfg.password,
		cfg.name)
	if db, err := sql.Open("postgres", db_conn); err == nil {
		fmt.Printf("[XAPI INFO] Connected to Postgres Db %s/%s\n", cfg.host, cfg.name)
		return &DbConfig{
			cfg.host,
			cfg.name,
			cfg.port,
			db,
		}
	} else {
		fmt.Printf("[XAPI WARN] Database connection error: %s", err)
		return nil
	}
}

func EnvConnect() *DbConfig {
	godotenv.Load("../../.env")
	if port, err := strconv.Atoi(os.Getenv("BACKEND_PORT")); err == nil {
		cfg := Config{
			os.Getenv("HOST"),
			port,
			os.Getenv("DB_USERNAME"),
			os.Getenv("DB_PASSWORD"),
			os.Getenv("DB_NAME"),
		}
		return cfg.connect()
	} else {
		fmt.Printf("[XAPI INFO] Environment variables not set. Defaulting to postgres/postgres, %v", err)
		return nil
	}
}

func (db_cfg *DbConfig) Query(qStr string) *sql.Rows {
	if rows, err := db_cfg.Db.Query(qStr); err == nil {
		return rows
	} else {
		fmt.Printf("[XAPI WARN] Error executing query %s: %s", qStr, err)
		return nil
	}
}

func (db_cfg *DbConfig) Close() {
	defer db_cfg.Db.Close()
}
