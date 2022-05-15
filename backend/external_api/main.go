package main

import (
	"external_api/api"
	"external_api/db"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.New()
	pgdb := db.EnvConnect()
	log.SetFlags(2)
	r.Use(gin.LoggerWithFormatter(
		func(param gin.LogFormatterParams) string {
			return fmt.Sprintf("[XAPI INFO] %s %s -> %d\n", param.Method, param.Path, param.StatusCode)
		}))
	r.Use(gin.Recovery())

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	api.GroupApi(r, pgdb)

	r.Run(fmt.Sprintf(":%d", pgdb.Port))
	pgdb.Close()
}
