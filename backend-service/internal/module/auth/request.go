package auth

// Request
type AuthLoginRequest struct {
	Email    string `json:"email" validate:"email"`
	Password string `json:"password" validate:"required"`
}

type AuthRegisterRequest struct {
	FullName string `json:"full_name" validate:"required,max=200"`
	Email    string `json:"email" validate:"email,max=250"`
	Password string `json:"password" validate:"required,min=8,max=200"`
}
