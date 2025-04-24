package main

import (
	"backend-service/config"
	"backend-service/internal/module"
	"backend-service/migration"
	"backend-service/pkg/app"
	"backend-service/pkg/router"
	"backend-service/pkg/sqlx"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	// Check Config
	cfg := config.Load()

	// Init App Library
	db, err := sqlx.InitSqliteConnection(cfg)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	// Init Migration
	err = migration.InitMigration(db)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	// Seed Data
	err = migration.SeedData(db)
	if err != nil {
		log.Println(err)
		panic(err)
	}

	// Route Init
	mapRouter := router.InitRouter()

	// App Init
	appConfig := app.AppConfig{
		Db:     db,
		Router: mapRouter,
		Config: &cfg,
	}

	//Module
	module.Module(appConfig)

	// server init
	server := &http.Server{
		Addr:     fmt.Sprintf(":%d", cfg.App.Port),
		Handler:  router.MiddlewareCors(mapRouter),
		ErrorLog: &log.Logger{},
	}

	log.Printf("Starting application on port :%v", cfg.App.Port)

	// Graceful shutdown
	go func() {
		log.Fatal(server.ListenAndServe())
	}()

	sigterm := make(chan os.Signal, 1)
	signal.Notify(sigterm, syscall.SIGTERM, syscall.SIGINT)
	<-sigterm

	log.Println("Shutting down application ...")

	server.Shutdown(context.Background())

	db.Close()
}
