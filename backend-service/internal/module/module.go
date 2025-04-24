package module

import (
	"backend-service/internal/module/auth"
	"backend-service/internal/module/customer"
	"backend-service/pkg/app"
)

// Import Module
func Module(app app.AppConfig) {
	app.Router = app.Router.PathPrefix("/api/v1").Subrouter()
	auth.AuthModule(app)
	customer.CustomerModule(app)
}
