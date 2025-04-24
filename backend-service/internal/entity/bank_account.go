package entity

import "time"

type BankAccount struct {
	ID            int        `db:"id" json:"id"`
	CustomerID    int        `db:"customer_id" json:"customer_id"`
	AccountNumber string     `db:"account_number" json:"account_number"`
	AccountType   string     `db:"account_type" json:"account_type"`
	Balance       float64    `db:"balance" json:"balance"`
	CreatedAt     *time.Time `db:"created_at" json:"created_at"`
	UpdatedAt     *time.Time `db:"updated_at" json:"updated_at"`
}
