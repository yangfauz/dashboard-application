package auth

// Response
type AuthLoginResponse struct {
	ID        int    `json:"id"`
	FullName  string `json:"full_name"`
	ExpiredAt int64  `json:"exp"`
	Token     string `json:"token"`
}

type AuthRegisterResponse struct {
	ID        int    `json:"id"`
	FullName  string `json:"full_name"`
	ExpiredAt int64  `json:"exp"`
	Token     string `json:"token"`
}
