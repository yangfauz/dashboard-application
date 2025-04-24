package auth

import (
	"backend-service/pkg/app"
	"backend-service/pkg/response"
	"backend-service/pkg/validator"
	"log"
	"net/http"
)

type AuthHandler struct {
	App     app.AppConfig
	Usecase AuthUsecase
}

func NewAuthHandler(app app.AppConfig, usecase AuthUsecase) {
	handler := &AuthHandler{
		App:     app,
		Usecase: usecase,
	}

	// Router
	authRoutes := app.Router.PathPrefix("/auth").Subrouter()

	authRoutes.HandleFunc("/login", handler.Login).Methods(http.MethodPost).Name("auth.login")
	authRoutes.HandleFunc("/register", handler.Register).Methods(http.MethodPost).Name("auth.register")
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	// Init
	var req AuthLoginRequest
	var resp response.Response
	ctx := r.Context()

	resp, errV := validator.ValidateRequest(r, &req)
	if errV != nil {
		resp.JSON(w)
		return
	}

	service, err := h.Usecase.Login(ctx, req)
	if err.Errors != nil {
		log.Println(err)
		resp = response.Error(err.Status, err.Message, err.Errors)
		resp.JSON(w)
		return
	}

	resp = response.Success(response.StatusOK, "Login Success", service)
	resp.JSON(w)
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	// Init
	var req AuthRegisterRequest
	var resp response.Response
	ctx := r.Context()

	resp, errV := validator.ValidateRequest(r, &req)
	if errV != nil {
		resp.JSON(w)
		return
	}

	service, err := h.Usecase.Register(ctx, req)
	if err.Errors != nil {
		log.Println(err)
		resp = response.Error(err.Status, err.Message, err.Errors)
		resp.JSON(w)
		return
	}

	resp = response.Success(response.StatusOK, "Register Success", service)
	resp.JSON(w)
}
