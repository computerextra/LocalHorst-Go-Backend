package main

import (
	"fmt"
	"golang-backend/ent"
	"golang-backend/ent/mitarbeiter"
	"golang-backend/ent/user"
	"strings"
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

func (a *App) CreateUser(values UserParams) string {
	fmt.Println(values)

	r, err := a.db.Mitarbeiter.Query().Where(mitarbeiter.EmailContains(strings.ToLower(values.Mail))).Only(a.ctx)
	if err != nil {
		return fmt.Sprintf("Fehler: %s", err.Error())
	}
	err = a.db.User.Create().
		SetActive(true).
		SetName(values.Name).
		SetPassword(values.Password).
		SetMail(strings.ToLower(values.Mail)).
		SetMitarbeiterID(r.ID).
		Exec(a.ctx)

	if err != nil {
		return fmt.Sprintf("Fehler: %s", err.Error())
	}
	return "Benutzer erfolgreich angelegt."
}

type UserWithMa struct {
	User        *ent.User
	Mitarbeiter *ent.Mitarbeiter
}

func (a *App) Login(mail, password string) *UserWithMa {
	r, err := a.db.User.Query().Where(user.MailEQ(strings.ToLower(mail))).Only(a.ctx)
	if err != nil {
		return nil
	}
	if r.Password == password {
		ma, err := r.QueryMitarbeiter().Only(a.ctx)
		if err != nil {
			return nil
		}

		u := UserWithMa{
			User:        r,
			Mitarbeiter: ma,
		}
		return &u
	}
	return nil
}

func (a *App) ChangePassword(id int, password, newPassword string) string {
	r, err := a.db.User.Query().Where(user.IDEQ(id)).Only(a.ctx)
	if err != nil {
		return "Benutzer nicht gefunden"
	}
	if r.Password == password {
		err := r.Update().SetPassword(newPassword).Exec(a.ctx)
		if err != nil {
			return "Passwörter passen nicht zusammen."
		} else {
			return "Passwort erfolgreich geändert."
		}
	}
	return "Server Fehler!"
}

func (a *App) DeactivateUser(id int) bool {
	err := a.db.User.UpdateOneID(id).SetActive(false).Exec(a.ctx)
	return err == nil
}

func (a *App) ActivateUser(id int) bool {
	err := a.db.User.UpdateOneID(id).SetActive(true).Exec(a.ctx)
	return err == nil
}
