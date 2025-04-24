package pocket

import (
	"backend-service/internal/entity"
	"backend-service/pkg/app"
	"context"
	"log"
)

type PocketRepository interface {
	FindByAccountID(ctx context.Context, id int) (resp []entity.Pocket, err error)
}

type pocketRepositoryImpl struct {
	app app.AppConfig
}

func NewPocketRepository(app app.AppConfig) PocketRepository {
	return &pocketRepositoryImpl{
		app: app,
	}
}

func (r *pocketRepositoryImpl) FindByAccountID(ctx context.Context, id int) (resp []entity.Pocket, err error) {
	err = r.app.Db.SelectContext(ctx, &resp, FIND_BY_ACCOUNT_ID, id)
	if err != nil {
		log.Println(err)
		return resp, err
	}
	return resp, nil
}
