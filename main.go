package main

import (
	"log"
	"os"
	"fmt"

	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/static"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"database/sql"
)

func  main()  {
	//set the router as the default shipped with gin
	router := gin.Default()

	// connect to postgres
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	uri := os.Getenv("DB_URI")
	db, err := sql.Open("postgres", uri)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	fmt.Println("Connected")


	//serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))

	//setup route group for the API
	api := router.Group(("/v1/api"))
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "Hello world",
			})
		})
	}
	
	//start and run the server
	router.Run(":5000")
}
