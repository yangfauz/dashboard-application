package entity

type User struct {
	ID       int     `db:"id" json:"id"`
	Email    string  `db:"email" json:"email"`
	Password *string `db:"password" json:"password,omitempty"`
	FullName *string `db:"full_name" json:"full_name"`
}

func (a *User) ToInsert() []interface{} {
	return []interface{}{
		a.Email,
		a.Password,
		a.FullName,
	}
}
