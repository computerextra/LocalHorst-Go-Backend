package main

import "golang-backend/db"

func (a *App) getAllMitarbeiter() ([]db.MitarbeiterModel, error) {
	return a.database.Mitarbeiter.
		FindMany().
		OrderBy(
			db.Mitarbeiter.Name.Order(
				db.SortOrderAsc,
			),
		).
		With(db.Mitarbeiter.Einkauf.Fetch()).Exec(a.ctx)
}

func (a *App) GetAllMitarbeiter() []db.MitarbeiterModel {
	ma, err := a.getAllMitarbeiter()
	if err != nil {
		return nil
	}

	return ma
}
