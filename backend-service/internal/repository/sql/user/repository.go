package user

import (
	"backend-service/internal/entity"
	"backend-service/pkg/app"
	"context"
	"log"
)

type UserRepository interface {
	FindByID(ctx context.Context, id int) (resp entity.User, err error)
	FindByEmail(ctx context.Context, email string) (resp entity.User, err error)
	Insert(ctx context.Context, user entity.User) (id int, err error)
}

type userRepositoryImpl struct {
	app app.AppConfig
}

func NewUserRepository(app app.AppConfig) UserRepository {
	return &userRepositoryImpl{
		app: app,
	}
}

func (r *userRepositoryImpl) FindByID(ctx context.Context, id int) (resp entity.User, err error) {
	err = r.app.Db.GetContext(ctx, &resp, FIND_BY_ID, id)
	if err != nil {
		log.Println(err)
		return resp, err
	}
	return resp, nil
}

func (r *userRepositoryImpl) FindByEmail(ctx context.Context, email string) (resp entity.User, err error) {
	err = r.app.Db.GetContext(ctx, &resp, FIND_BY_EMAIL, email)
	if err != nil {
		log.Println(err)
		return resp, err
	}

	return resp, nil
}

func (r *userRepositoryImpl) Insert(ctx context.Context, user entity.User) (id int, err error) {
	err = r.app.Db.GetContext(ctx, &id, INSERT_USER, user.ToInsert()...)
	if err != nil {
		log.Println(err)
		return id, err
	}
	return id, nil
}
