package bank_account

import (
	"backend-service/internal/entity"
	"backend-service/pkg/app"
	"context"
	"log"
)

type BankAccountRepository interface {
	FindByCustomerID(ctx context.Context, id int) (resp entity.BankAccount, err error)
}

type bankAccountRepositoryImpl struct {
	app app.AppConfig
}

func NewBankAccountRepository(app app.AppConfig) BankAccountRepository {
	return &bankAccountRepositoryImpl{
		app: app,
	}
}

func (r *bankAccountRepositoryImpl) FindByCustomerID(ctx context.Context, id int) (resp entity.BankAccount, err error) {
	err = r.app.Db.GetContext(ctx, &resp, FIND_BY_CUSTOMER_ID, id)
	if err != nil {
		log.Println(err)
		return resp, err
	}
	return resp, nil
}
