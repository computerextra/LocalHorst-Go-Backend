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
