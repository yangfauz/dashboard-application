package migration

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
)

func InitMigration(db *sqlx.DB) (err error) {
	// Create User table
	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email VARCHAR(255) NOT NULL UNIQUE,
		password TEXT,
		full_name TEXT
	);
	`)
	if err != nil {
		return err
	}

	// Create Customer table
	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS customers (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		full_name TEXT
	);
	`)
	if err != nil {
		return err
	}

	// Create BankAccount table
	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS bank_accounts (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
		account_number VARCHAR(255) NOT NULL UNIQUE,
		account_type TEXT,
		balance NUMERIC DEFAULT 0,
		created_at TIMESTAMP,
		updated_at TIMESTAMP
	);
	`)
	if err != nil {
		return err
	}

	// Create Pocket table
	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS pockets (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		account_id INTEGER NOT NULL REFERENCES bank_accounts(id) ON DELETE CASCADE,
		pocket_name TEXT,
		balance NUMERIC DEFAULT 0,
		created_at TIMESTAMP,
		updated_at TIMESTAMP
	);
	`)
	if err != nil {
		return err
	}

	// Create TermDeposit table
	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS term_deposits (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
		amount NUMERIC NOT NULL,
		start_date DATE NOT NULL,
		end_date DATE NOT NULL,
		created_at TIMESTAMP,
		updated_at TIMESTAMP
	);
	`)
	if err != nil {
		return err
	}

	return nil
}

func SeedData(db *sqlx.DB) (err error) {
	// Enable foreign key constraints in SQLite
	_, err = db.Exec(`PRAGMA foreign_keys = ON;`)
	if err != nil {
		return fmt.Errorf("enable foreign keys: %w", err)
	}

	// Clean up existing data in proper order due to FK relationships
	tables := []string{
		"pockets",
		"term_deposits",
		"bank_accounts",
		"customers",
		"users",
	}

	for _, table := range tables {
		_, err := db.Exec(fmt.Sprintf("DELETE FROM %s;", table))
		if err != nil {
			return fmt.Errorf("delete from %s: %w", table, err)
		}
	}

	// Optional: reset AUTOINCREMENT sequences (if needed)
	for _, table := range tables {
		_, _ = db.Exec(fmt.Sprintf("DELETE FROM sqlite_sequence WHERE name='%s';", table))
	}

	// === Continue with the original seeding logic ===

	rand.Seed(time.Now().UnixNano())

	for i := 1; i <= 30; i++ {
		fullName := fmt.Sprintf("Customer %02d", i)
		// Insert customer
		res, err := db.Exec(`INSERT INTO customers (full_name) VALUES (?)`, fullName)
		if err != nil {
			return fmt.Errorf("insert customer %d: %w", i, err)
		}

		customerID, err := res.LastInsertId()
		if err != nil {
			return fmt.Errorf("get customer ID: %w", err)
		}

		// Insert bank account
		accountNumber := fmt.Sprintf("ACC%08d", i)
		accountType := "savings"
		balance := float64(rand.Intn(10_000_000) + 1_000_000)
		res, err = db.Exec(`
			INSERT INTO bank_accounts (customer_id, account_number, account_type, balance, created_at, updated_at)
			VALUES (?, ?, ?, ?, DATETIME('now'), DATETIME('now'))
		`, customerID, accountNumber, accountType, balance)
		if err != nil {
			return fmt.Errorf("insert bank_account %d: %w", i, err)
		}

		accountID, err := res.LastInsertId()
		if err != nil {
			return fmt.Errorf("get account ID: %w", err)
		}

		// Insert term deposit
		amount := float64(rand.Intn(5_000_000) + 1_000_000)
		startDate := time.Now().Format("2006-01-02")
		endDate := time.Now().AddDate(1, 0, 0).Format("2006-01-02")
		_, err = db.Exec(`
			INSERT INTO term_deposits (customer_id, amount, start_date, end_date, created_at, updated_at)
			VALUES (?, ?, ?, ?, DATETIME('now'), DATETIME('now'))
		`, customerID, amount, startDate, endDate)
		if err != nil {
			return fmt.Errorf("insert term_deposit %d: %w", i, err)
		}

		// Insert 1–8 pockets
		pocketCount := rand.Intn(8) + 1
		for j := 1; j <= pocketCount; j++ {
			pocketName := fmt.Sprintf("Pocket %d-%d", i, j)
			pocketBalance := float64(rand.Intn(1_000_000))
			_, err := db.Exec(`
				INSERT INTO pockets (account_id, pocket_name, balance, created_at, updated_at)
				VALUES (?, ?, ?, DATETIME('now'), DATETIME('now'))
			`, accountID, pocketName, pocketBalance)
			if err != nil {
				return fmt.Errorf("insert pocket %d-%d: %w", i, j, err)
			}
		}
	}

	// Insert user
	password := "Admin@123"
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("bcrypt error: %w", err)
	}

	email := fmt.Sprintf("admin@admin.com")
	fullName := fmt.Sprintf("Admin User")

	_, err = db.Exec(`INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)`, email, string(hashedPassword), fullName)
	if err != nil {
		return fmt.Errorf("insert user: %w", err)
	}

	return nil
}
