package auth

import (
	"backend-service/internal/repository/sql/user"
	"backend-service/pkg/app"
)

func AuthModule(appConfig app.AppConfig) {
	// Repo
	userRepo := user.NewUserRepository(appConfig)

	// Usecase
	authUsecase := NewAuthUsecase(appConfig, userRepo)

	// Handler Route
	NewAuthHandler(appConfig, authUsecase)
}
