package entity

import "time"

type Customer struct {
	ID       int    `db:"id" json:"id"`
	FullName string `db:"full_name" json:"full_name"`
}

type CustomerAccount struct {
	ID            int        `db:"id" json:"id"`
	FullName      string     `db:"full_name" json:"full_name"`
	AccountNumber string     `db:"account_number" json:"account_number"`
	AccountType   string     `db:"account_type" json:"account_type"`
	CreatedAt     *time.Time `db:"created_at" json:"created_at"`
}
