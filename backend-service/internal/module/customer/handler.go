package customer

import (
	"backend-service/pkg/app"
	"backend-service/pkg/helper/paginate"
	"backend-service/pkg/middleware"
	"backend-service/pkg/response"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type CustomerHandler struct {
	App     app.AppConfig
	Usecase CustomerUsecase
}

func NewCustomerHandler(app app.AppConfig, usecase CustomerUsecase) {
	handler := &CustomerHandler{
		App:     app,
		Usecase: usecase,
	}

	// Router
	customerRoutes := app.Router.PathPrefix("/customers").Subrouter()
	customerRoutes.Use(middleware.JWT)

	customerRoutes.HandleFunc("", handler.ListPaginate).Methods(http.MethodGet).Name("customers.paginate")
	customerRoutes.HandleFunc("/{id}", handler.Detail).Methods(http.MethodGet).Name("customers.detail")
}

func (h *CustomerHandler) ListPaginate(w http.ResponseWriter, r *http.Request) {
	var resp response.Response
	ctx := r.Context()

	param := paginate.PaginationParams{}
	param = param.GetPaginateParam(r)

	service, err := h.Usecase.ListPaginate(ctx, param)
	if err.Errors != nil {
		log.Println(err)
		resp = response.Error(err.Status, err.Message, err.Errors)
		resp.JSON(w)
		return
	}

	resp = response.Success(response.StatusOK, "Success", service)
	resp.JSON(w)
}

func (h *CustomerHandler) Detail(w http.ResponseWriter, r *http.Request) {
	var resp response.Response
	ctx := r.Context()

	param := paginate.PaginationParams{}
	param = param.GetPaginateParam(r)

	vars := mux.Vars(r)
	id := vars["id"]

	data, err := h.Usecase.Detail(ctx, id)
	if err.Errors != nil {
		log.Println(err)
		resp = response.Error(err.Status, err.Message, err.Errors)
		resp.JSON(w)
		return
	}

	// dummyData := map[string]interface{}{
	// 	"id":        1,
	// 	"full_name": "agus",
	// 	"bank_account": map[string]interface{}{
	// 		"account_number": "123123123",
	// 		"account_type":   "tabungan",
	// 		"balance":        40000,
	// 	},
	// 	"pockets": []map[string]interface{}{
	// 		{
	// 			"name":    "tabungan utama",
	// 			"balance": 20000,
	// 		},
	// 		{
	// 			"name":    "tabungan kedua",
	// 			"balance": 20000,
	// 		},
	// 	},
	// 	"term_deposit": map[string]interface{}{
	// 		"amount":     3000,
	// 		"start_date": "2020-01-01",
	// 		"end_date":   "2020-01-01",
	// 	},
	// }

	resp = response.Success(response.StatusOK, "Success", data)
	resp.JSON(w)
}
