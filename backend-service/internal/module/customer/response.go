package customer

// Response
type CustomerDetailResponse struct {
	ID              int             `json:"id"`
	FullName        string          `json:"full_name"`
	BankAccountData BankAccountData `json:"bank_account"`
	TermDepositData TermDepositData `json:"term_deposit"`
	PocketData      []PocketData    `json:"pockets"`
}

type BankAccountData struct {
	AccountNumber string  `json:"account_number"`
	AccountType   string  `json:"account_type"`
	Balance       float64 `json:"balance"`
}

type PocketData struct {
	PocketName string  `json:"pocket_name"`
	Balance    float64 `json:"balance"`
}

type TermDepositData struct {
	Amount    float64 `json:"amount"`
	StartDate string  `json:"start_date"`
	EndDate   string  `json:"end_date"`
}
