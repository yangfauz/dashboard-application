package term_deposit

const (
	FIND_BY_ACCOUNT_ID = `
		SELECT 
			td.id, 
			td.customer_id,
			td.amount,
			td.start_date,
			td.end_date,
			td.created_at,
			td.updated_at
		FROM 
			term_deposits td
		WHERE 
			td.customer_id = $1;
	`
)
