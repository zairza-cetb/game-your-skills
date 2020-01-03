package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/static"
)

func  main()  {
	//set the router as the default shipped with gin
	router := gin.Default()

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