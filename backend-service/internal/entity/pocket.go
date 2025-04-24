package entity

import "time"

type Pocket struct {
	ID         int        `db:"id" json:"id"`
	AccountID  int        `db:"account_id" json:"account_id"`
	PocketName string     `db:"pocket_name" json:"pocket_name"`
	Balance    float64    `db:"balance" json:"balance"`
	CreatedAt  *time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  *time.Time `db:"updated_at" json:"updated_at"`
}
