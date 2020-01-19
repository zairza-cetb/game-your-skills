package main

import (
	"log"
	"os"
	"fmt"

	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-contrib/cors"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"database/sql"
	"github.com/ankitjena/game-your-skills/db/models"
	"github.com/ankitjena/game-your-skills/db/handlers"
)

func  main()  {
	/** 
		Connects to postgres
		If we reach the fmt, that means we have 
		connected successfully
	**/
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
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("Successfully connected to Database!")

	//set the router as the default shipped with gin
	router := gin.Default()
	router.Use(cors.Default())
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
	
	// Setup Login/Register route
	router.POST("/register", func(c *gin.Context) {
		var user models.User
		err := c.BindJSON(&user)
		if err != nil {
			panic(err)
		}
		res := handlers.HandleLogin(&user)
		c.JSON(200, gin.H {
			"message": res,
		})
	})
	
	//start and run the server
	router.Run(":5000")
}
