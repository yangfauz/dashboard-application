package customer

import (
	"backend-service/internal/repository/sql/bank_account"
	"backend-service/internal/repository/sql/customer"
	"backend-service/internal/repository/sql/pocket"
	"backend-service/internal/repository/sql/term_deposit"
	"backend-service/pkg/app"
	"backend-service/pkg/exception"
	"backend-service/pkg/helper/paginate"
	"context"
	"strconv"
)

type CustomerUsecase interface {
	ListPaginate(ctx context.Context, params paginate.PaginationParams) (resp paginate.Pagination, errData exception.Error)
	Detail(ctx context.Context, id string) (resp CustomerDetailResponse, errData exception.Error)
}

type customerUsecaseImpl struct {
	app             app.AppConfig
	customerRepo    customer.CustomerRepository
	bankAccountRepo bank_account.BankAccountRepository
	pocketRepo      pocket.PocketRepository
	termDepositRepo term_deposit.TermDepositRepository
}

func NewCustomerUsecase(
	app app.AppConfig,
	customerRepo customer.CustomerRepository,
	bankAccountRepo bank_account.BankAccountRepository,
	pocketRepo pocket.PocketRepository,
	termDepositRepo term_deposit.TermDepositRepository,
) CustomerUsecase {
	return &customerUsecaseImpl{
		app:             app,
		customerRepo:    customerRepo,
		bankAccountRepo: bankAccountRepo,
		pocketRepo:      pocketRepo,
		termDepositRepo: termDepositRepo,
	}
}

func (uc *customerUsecaseImpl) ListPaginate(ctx context.Context, params paginate.PaginationParams) (resp paginate.Pagination, errData exception.Error) {
	customer, err := uc.customerRepo.FindAll(ctx, params)
	if err != nil {
		return resp, exception.ErrorBadRequest()
	}
	return customer, errData
}

func (uc *customerUsecaseImpl) Detail(ctx context.Context, id string) (resp CustomerDetailResponse, errData exception.Error) {
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return resp, exception.ErrorBadRequest()
	}
	// Check Customer By ID
	customer, err := uc.customerRepo.FindByID(ctx, idInt)
	checkSql := exception.ErrorSqlNotFound("Customer not found", err)
	if checkSql != nil {
		return resp, exception.ErrorUnauthorizedMessage("Customer not found")
	}

	// Check Bank Account
	bank, err := uc.bankAccountRepo.FindByCustomerID(ctx, customer.ID)
	if err != nil {
		return resp, exception.ErrorBadRequestMessage("Bank Account Not Found")
	}

	deposit, err := uc.termDepositRepo.FindByCustomerID(ctx, customer.ID)
	if err != nil {
		return resp, exception.ErrorBadRequestMessage("Something Wrong In Deposit")
	}

	pockets, err := uc.pocketRepo.FindByAccountID(ctx, customer.ID)
	checkSql = exception.ErrorSqlCheckNotFound(err)
	if checkSql != nil {
		return resp, exception.ErrorBadRequestMessage("Something Wrong In Pocket")
	}

	// Assume 'resp' is CustomerDetailResponse
	resp = CustomerDetailResponse{
		ID:       customer.ID,
		FullName: customer.FullName,
		BankAccountData: BankAccountData{
			AccountNumber: bank.AccountNumber,
			AccountType:   bank.AccountType,
			Balance:       bank.Balance,
		},
		TermDepositData: TermDepositData{
			Amount:    deposit.Amount,
			StartDate: deposit.StartDate.Format("2006-01-02"),
			EndDate:   deposit.EndDate.Format("2006-01-02"),
		},
	}

	// Map pockets to []PocketData
	for _, p := range pockets {
		pocketData := PocketData{
			PocketName: p.PocketName,
			Balance:    p.Balance,
		}
		resp.PocketData = append(resp.PocketData, pocketData)
	}
	return resp, errData
}
