package main

import (
	"external_api/db"
	"external_api/models"
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

	// get all users
	r.GET("/users", func(c *gin.Context) {
		rows := pgdb.Query("SELECT * FROM users")
		defer rows.Close()

		var users []models.User
		for rows.Next() {
			var user models.User
			rows.Scan(&user.Id, &user.Username)
			users = append(users, user)
		}
		c.JSON(200, gin.H{
			"users": users,
		})
	})

	r.Run(fmt.Sprintf(":%d", pgdb.Port))
	pgdb.Close()
}
