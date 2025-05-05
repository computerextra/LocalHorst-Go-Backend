package main

import (
	"golang-backend/ent"
	"golang-backend/ent/mitarbeiter"
	"golang-backend/ent/user"
)

func (a *App) GetUser(id int) *ent.User {
	res, err := a.db.User.Query().Where(user.ID(id)).Only(a.ctx)
	if err != nil {
		return nil
	}
	return res
}

type UserParams struct {
	Name     string
	Password string
	Mail     string
}

func (a *App) CreateUser(values UserParams) bool {
	// Finde Mitarbeiter zum Linken
	r, err := a.db.Mitarbeiter.Query().Where(mitarbeiter.Email(values.Name)).Only(a.ctx)
	if err != nil {
		return false
	}
	err = a.db.User.Create().
		SetActive(true).
		SetName(values.Name).
		SetPassword(values.Password).
		SetMail(values.Mail).
		SetMitarbeiterID(r.ID).
		Exec(a.ctx)
	return err == nil
}

func (a *App) Login(mail, password string) *ent.User {
	r, err := a.db.User.Query().Where(user.MailEQ(mail)).Only(a.ctx)
	if err != nil {
		return nil
	}
	if r.Password == password {
		return r
	}
	return nil
}

func (a *App) ChangePassword(id int, password, newPassword string) bool {
	r, err := a.db.User.Query().Where(user.ID(id)).Only(a.ctx)
	if err != nil {
		return false
	}
	if r.Password == password {
		err := r.Update().SetPassword(newPassword).Exec(a.ctx)
		if err != nil {
			return false
		} else {
			return true
		}
	}
	return false
}

func (a *App) DeactivateUser(id int) bool {
	err := a.db.User.UpdateOneID(id).SetActive(false).Exec(a.ctx)
	return err == nil
}

func (a *App) ActivateUser(id int) bool {
	err := a.db.User.UpdateOneID(id).SetActive(true).Exec(a.ctx)
	return err == nil
}
