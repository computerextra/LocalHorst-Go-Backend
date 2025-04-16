package main

func (a *App) GetLieferanten() []db.Lieferant {

	res, err := a.db.GetLieferanten()

	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetLieferant(id string) *db.Lieferant {

	res, err := a.db.GetLieferant(id)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) UpsertLieferant(params db.LieferantenParams, id string) bool {

	_, err := a.db.UpsertLieferant(params, id)

	return err == nil

}

func (a *App) DeleteLieferant(id string) bool {

	_, err := a.db.DeleteLieferant(id)
	return err == nil
}

func (a *App) GetAnsprechpartner(id string) *db.Ansprechpartner {

	res, err := a.db.GetAnsprechpartner(id)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) UpsertAnsprechpartner(id string, params db.AnsprechpartnerParams) bool {

	_, err := a.db.UpsertAnsprechpartner(params, id)
	return err == nil
}

func (a *App) DeleteAnsprechpartner(id string) bool {

	_, err := a.db.DeleteAnsprechpartner(id)
	return err == nil
}
