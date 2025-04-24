package customer

const (
	FIND_ALL = `
		SELECT c.id, c.full_name, ba.account_number, ba.account_type, ba.created_at
		FROM customers c
		JOIN bank_accounts ba on ba.customer_id = c.id
		WHERE 0=0
	`

	FIND_BY_ID = `
		SELECT 
			c.id, 
			c.full_name
		FROM 
			customers c
		WHERE 
			c.id = $1;
	`
)
