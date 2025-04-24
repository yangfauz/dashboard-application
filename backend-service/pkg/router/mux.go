package router

import (
	"backend-service/pkg/exception"
	"backend-service/pkg/response"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func InitRouter() *mux.Router {
	// Dependencies Init
	// Route Init
	router := mux.NewRouter()
	// Handle method not allowed
	router.MethodNotAllowedHandler = http.HandlerFunc(methodNotAllowedHandler)
	// Handle route not found
	router.NotFoundHandler = http.HandlerFunc(notFoundHandler)
	// Handle Skip Clean
	router.SkipClean(true)
	// Handle Recovery
	router.Use(recoveryHandler())
	// Handle Logging
	router.Use(loggingMiddleware())

	return router
}

func MiddlewareCors(router *mux.Router) http.Handler {
	//cors
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
	})

	return c.Handler(router)
}

func loggingMiddleware() mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			log.Println(r.RequestURI)
			next.ServeHTTP(w, r)
		})
	}
}

func methodNotAllowedHandler(w http.ResponseWriter, r *http.Request) {
	res := response.Error(response.StatusMethodNotAllowed, "Method Not Allowed", exception.ErrMethodNotAllowed)
	res.JSON(w)
}

func notFoundHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.RequestURI)
	fmt.Println(r.Method)
	res := response.Error(response.StatusNotFound, "Route Not Found", exception.ErrNotFound)
	res.JSON(w)
}

func recoveryHandler() mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				err := recover()
				if err != nil {
					log.Println(err)
					res := response.Error(response.StatusInternalServerError, "There was Internal Server Error", exception.ErrInternalServer)
					res.JSON(w)
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	var resp response.Response
	resData := map[string]string{
		"status": "OK",
	}

	resp = response.Success(response.StatusOK, "Success", resData)
	resp.JSON(w)
}
