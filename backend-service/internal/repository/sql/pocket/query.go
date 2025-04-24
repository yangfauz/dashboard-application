package pocket

const (
	FIND_BY_ACCOUNT_ID = `
		SELECT 
			p.id, 
			p.account_id,
			p.pocket_name,
			p.balance,
			p.created_at,
			p.updated_at
		FROM 
			pockets p
		WHERE 
			p.account_id = $1;
	`
)
