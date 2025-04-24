package entity

import "time"

type TermDeposit struct {
	ID         int        `db:"id" json:"id"`
	CustomerID int        `db:"customer_id" json:"customer_id"`
	Amount     float64    `db:"amount" json:"amount"`
	StartDate  time.Time  `db:"start_date" json:"start_date"`
	EndDate    time.Time  `db:"end_date" json:"end_date"`
	CreatedAt  *time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  *time.Time `db:"updated_at" json:"updated_at"`
}
