package customer

import (
	"backend-service/internal/repository/sql/bank_account"
	"backend-service/internal/repository/sql/customer"
	"backend-service/internal/repository/sql/pocket"
	"backend-service/internal/repository/sql/term_deposit"
	"backend-service/pkg/app"
)

func CustomerModule(appConfig app.AppConfig) {
	// Repo
	customerRepo := customer.NewCustomerRepository(appConfig)
	bankAccountRepo := bank_account.NewBankAccountRepository(appConfig)
	pocketRepo := pocket.NewPocketRepository(appConfig)
	termDepositRepo := term_deposit.NewTermDepositRepository(appConfig)

	// Usecase
	customerUsecase := NewCustomerUsecase(appConfig, customerRepo, bankAccountRepo, pocketRepo, termDepositRepo)

	// Handler Route
	NewCustomerHandler(appConfig, customerUsecase)
}
