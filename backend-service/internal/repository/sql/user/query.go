package user

const (
	FIND_BY_ID = `
	SELECT 
		u.id, 
		u.email,  
		u.password, 
		u.full_name
	FROM 
		users u
	WHERE 
		u.id = $1;
`

	FIND_BY_EMAIL = `
	SELECT 
		u.id, 
		u.email,  
		u.password, 
		u.full_name
	FROM 
		users u
	WHERE 
		u.email = $1;
`
	INSERT_USER = `
	INSERT INTO users (email, password, full_name)
	VALUES (:email, :password, :full_name)
	RETURNING id;
`
)
