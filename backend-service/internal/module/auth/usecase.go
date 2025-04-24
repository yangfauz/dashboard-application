package auth

import (
	"backend-service/internal/entity"
	"backend-service/internal/repository/sql/user"
	"backend-service/pkg/app"
	"backend-service/pkg/bcrypt"
	"backend-service/pkg/exception"
	"backend-service/pkg/jwt"
	"backend-service/pkg/response"
	"context"
	"database/sql"
)

type AuthUsecase interface {
	Login(ctx context.Context, params AuthLoginRequest) (resp AuthLoginResponse, errData exception.Error)
	Register(ctx context.Context, params AuthRegisterRequest) (resp AuthRegisterResponse, errData exception.Error)
}

type authUsecaseImpl struct {
	app      app.AppConfig
	userRepo user.UserRepository
}

func NewAuthUsecase(app app.AppConfig, userRepo user.UserRepository) AuthUsecase {
	return &authUsecaseImpl{
		app:      app,
		userRepo: userRepo,
	}
}

func (uc *authUsecaseImpl) Login(ctx context.Context, params AuthLoginRequest) (resp AuthLoginResponse, errData exception.Error) {
	// Check User By Email
	user, err := uc.userRepo.FindByEmail(ctx, params.Email)
	if err != nil {
		return resp, exception.ErrorLoginUnauthorized()
	}

	// Check Password
	valid := bcrypt.ComparePasswordHash(params.Password, *user.Password)
	if !valid {
		return resp, exception.ErrorLoginUnauthorized()
	}

	// Generate Token
	paramsToken := jwt.DataToken{
		UserID: user.ID,
	}
	jwtToken, err := jwt.GenerateToken(paramsToken, *uc.app.Config)
	if err != nil {
		return resp, exception.ErrorBadRequest()
	}

	// Set Token
	resp.ID = user.ID
	resp.FullName = *user.FullName
	resp.Token = jwtToken.Token
	resp.ExpiredAt = jwtToken.Exp

	return resp, errData
}

func (uc *authUsecaseImpl) Register(ctx context.Context, params AuthRegisterRequest) (resp AuthRegisterResponse, errData exception.Error) {
	// Check User By Email
	user, err := uc.userRepo.FindByEmail(ctx, params.Email)
	switch err {
	case nil:
		return resp, exception.ErrorBadRequestMessage("Email Already Registered")
	case sql.ErrNoRows:
		// Continue
	default:
		return resp, exception.Error{
			Status:  response.StatusBadRequest,
			Message: "Something Wrong",
			Errors:  exception.ErrBadRequest,
		}
	}

	// Hash Password
	hashedPassword, err := bcrypt.HashPassword(10, params.Password)
	if err != nil {
		return resp, exception.ErrorBadRequest()
	}

	// Create User
	user = entity.User{
		Email:    params.Email,
		Password: &hashedPassword,
		FullName: &params.FullName,
	}
	userID, err := uc.userRepo.Insert(ctx, user)
	if err != nil {
		return resp, exception.ErrorBadRequest()
	}

	// Generate Token
	paramsToken := jwt.DataToken{
		UserID: userID,
	}
	jwtToken, err := jwt.GenerateToken(paramsToken, *uc.app.Config)
	if err != nil {
		return resp, exception.ErrorBadRequest()
	}

	// Set Token
	resp.ID = userID
	resp.FullName = *user.FullName
	resp.Token = jwtToken.Token
	resp.ExpiredAt = jwtToken.Exp

	return resp, errData
}
