package middleware

import (
	"backend-service/pkg/exception"
	jwtValidate "backend-service/pkg/jwt"
	"backend-service/pkg/response"
	"context"
	"encoding/json"
	"net/http"
	"strings"
)

type Claims struct {
	Data DataClaims `json:"data"`
	Exp  int64      `json:"exp"`
	Iat  int64      `json:"iat"`
}

type DataClaims struct {
	UserID int `json:"user_id"`
}

func JWT(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authorization := r.Header.Get("authorization")

		token := strings.TrimSpace(strings.Replace(authorization, "Bearer", "", 1))

		tokenValidate, err := jwtValidate.ValidateJWTToken(token)
		if err != nil {
			resp := response.Error(response.StatusForbiddend, "Unauthorized", exception.ErrUnauthorized)
			resp.JSON(w)
			return
		}

		// Extract claims
		var claims Claims
		claimsBytes, err := json.Marshal(tokenValidate.Claims)
		if err != nil {
			resp := response.Error(response.StatusForbiddend, "Unauthorized", exception.ErrUnauthorized)
			resp.JSON(w)
			return
		}
		json.Unmarshal(claimsBytes, &claims)

		userID := claims.Data.UserID

		ctx := r.Context()
		ctx = context.WithValue(ctx, "user_id", userID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func JWTNoMandatory(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authorization := r.Header.Get("authorization")

		if authorization == "" {
			next.ServeHTTP(w, r)
		} else {
			token := strings.TrimSpace(strings.Replace(authorization, "Bearer", "", 1))

			tokenValidate, err := jwtValidate.ValidateJWTToken(token)
			if err != nil {
				resp := response.Error(response.StatusForbiddend, "Unauthorized", exception.ErrUnauthorized)
				resp.JSON(w)
				return
			}

			// Extract claims
			var claims Claims
			claimsBytes, err := json.Marshal(tokenValidate.Claims)
			if err != nil {
				resp := response.Error(response.StatusForbiddend, "Unauthorized", exception.ErrUnauthorized)
				resp.JSON(w)
				return
			}
			json.Unmarshal(claimsBytes, &claims)

			userID := claims.Data.UserID

			ctx := r.Context()
			ctx = context.WithValue(ctx, "user_id", userID)

			next.ServeHTTP(w, r.WithContext(ctx))
		}
	})
}
