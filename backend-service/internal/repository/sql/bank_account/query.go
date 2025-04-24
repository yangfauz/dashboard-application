package bank_account

const (
	FIND_BY_CUSTOMER_ID = `
		SELECT 
			ba.id, 
			ba.customer_id,
			ba.account_number, 
			ba.account_type,
			ba.balance,
			ba.created_at,
			ba.updated_at
		FROM 
			bank_accounts ba
		WHERE 
			ba.customer_id = $1;
	`
)
