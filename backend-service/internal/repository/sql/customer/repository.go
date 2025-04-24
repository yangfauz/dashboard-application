package customer

import (
	"backend-service/internal/entity"
	"backend-service/pkg/app"
	"backend-service/pkg/helper/paginate"
	"backend-service/pkg/sqlx"
	"context"
	"fmt"
	"log"
	"strings"
)

type CustomerRepository interface {
	FindAll(ctx context.Context, params paginate.PaginationParams) (resp paginate.Pagination, err error)
	FindByID(ctx context.Context, id int) (resp entity.Customer, err error)
}

type customerRepositoryImpl struct {
	app app.AppConfig
}

func NewCustomerRepository(app app.AppConfig) CustomerRepository {
	return &customerRepositoryImpl{
		app: app,
	}
}

func (r *customerRepositoryImpl) FindAll(ctx context.Context, params paginate.PaginationParams) (resp paginate.Pagination, err error) {
	query := FIND_ALL

	if params.Search != "" {
		escapedSearch := strings.Replace(params.Search, "'", "''", -1)
		addFilter := fmt.Sprintf("AND (c.full_name LIKE LOWER('%%%s%%') OR ba.account_number LIKE LOWER('%%%s%%'))", escapedSearch, escapedSearch)
		query = fmt.Sprintf("%s %s", query, addFilter)
	}

	if params.OrderBy != "" {
		params.SortBy = "c.id"
		query = fmt.Sprintf("%s ORDER BY %s %s", query, params.SortBy, params.OrderBy)
	}

	var customer []entity.CustomerAccount
	pagination := sqlx.NewPaginationMetadata(r.app.Db)
	result, err := pagination.GetPagination(query, params, &customer)
	if err != nil {
		log.Println(err)
		return resp, err
	}
	return result, nil
}

func (r *customerRepositoryImpl) FindByID(ctx context.Context, id int) (resp entity.Customer, err error) {
	err = r.app.Db.GetContext(ctx, &resp, FIND_BY_ID, id)
	if err != nil {
		log.Println(err)
		return resp, err
	}
	return resp, nil
}
