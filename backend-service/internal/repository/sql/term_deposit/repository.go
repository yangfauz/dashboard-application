package term_deposit

import (
	"backend-service/internal/entity"
	"backend-service/pkg/app"
	"context"
	"log"
)

type TermDepositRepository interface {
	FindByCustomerID(ctx context.Context, id int) (resp entity.TermDeposit, err error)
}

type termDepositRepositoryImpl struct {
	app app.AppConfig
}

func NewTermDepositRepository(app app.AppConfig) TermDepositRepository {
	return &termDepositRepositoryImpl{
		app: app,
	}
}

func (r *termDepositRepositoryImpl) FindByCustomerID(ctx context.Context, id int) (resp entity.TermDeposit, err error) {
	err = r.app.Db.GetContext(ctx, &resp, FIND_BY_ACCOUNT_ID, id)
	if err != nil {
		log.Println(err)
		return resp, err
	}
	return resp, nil
}
