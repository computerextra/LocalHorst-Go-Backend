package service

import (
	"crypto/tls"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/env"
	"github.com/computerextra/golang-backend/helper"
	"github.com/computerextra/golang-backend/sage"
	gomail "gopkg.in/mail.v2"
)

func GenerateWarenlieferung(w http.ResponseWriter, r *http.Request) {
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()

	datebase, err := sql.Open("mysql", env.DATABASE_URL)
	if err != nil {
		panic(err)
	}
	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)
	Products, err := queries.GetWarenlieferung(ctx)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}

	neueArtikel, geliefert, neuePreise, err := helper.SortProducts(Products)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}

	for i := range neueArtikel {
		_, err := queries.InsertWarenlieferung(ctx, db.InsertWarenlieferungParams{
			ID:            neueArtikel[i].ID,
			Name:          neueArtikel[i].Name,
			Artikelnummer: neueArtikel[i].Artikelnummer,
		})
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
		}
	}
	for i := range geliefert {
		_, err := queries.UpdateWarenlieferung(ctx, db.UpdateWarenlieferungParams{
			Name: geliefert[i].Name,
			ID:   geliefert[i].ID,
		})
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
		}
	}
	for i := range neuePreise {
		var altFloat float64
		var neuFloat float64
		if neuePreise[i].Alterpreis.Valid {
			altFloat, _ = strconv.ParseFloat(neuePreise[i].Alterpreis.String, 64)
		}
		if neuePreise[i].Neuerpreis.Valid {
			neuFloat, _ = strconv.ParseFloat(neuePreise[i].Neuerpreis.String, 64)
		}
		if neuFloat > 0 && altFloat > 0 && altFloat != neuFloat {
			_, err := queries.UpdatePreisWarenlieferung(ctx, db.UpdatePreisWarenlieferungParams{
				Alterpreis: neuePreise[i].Alterpreis,
				Neuerpreis: neuePreise[i].Neuerpreis,
				ID:         neuePreise[i].ID,
			})
			if err != nil {
				fehler := err.Error()
				json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
			}
		}

	}
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	} else {
		json.NewEncoder(w).Encode(map[string]string{"ok": "true", "error": "false"})
	}
}

func SendWarenlieferung(w http.ResponseWriter, r *http.Request) {
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	datebase, err := sql.Open("mysql", env.DATABASE_URL)
	if err != nil {
		panic(err)
	}
	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)

	Mitarbeiter, err := queries.GetUsers(ctx)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}
	neueArtikel, err := queries.GetDailyNew(ctx)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}
	gelieferteArtikel, err := queries.GetDailyDelivered(ctx)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}
	neuePreise, err := queries.GetDailyWarenlieferung(ctx)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}
	wertBestand, wertVerfügbar, err := sage.GetLagerWert()
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}
	teureArtikel, err := sage.GetHighestSum()
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}
	teureVerfArtikel, err := sage.GetHighestVerfSum()
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}
	leichen, err := sage.GetLeichen()
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}
	SN, err := sage.GetAlteSeriennummern()
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}

	MAIL_FROM := env.MAIL_FROM
	MAIL_SERVER := env.MAIL_SERVER
	MAIL_PORT := env.MAIL_PORT
	MAIL_USER := env.MAIL_USER
	MAIL_PASSWORD := env.MAIL_PASSWORD

	var body string
	if len(neueArtikel) > 0 {
		body = fmt.Sprintf("%s<h2>Neue Artikel</h2><ul>", body)

		for i := range neueArtikel {
			body = fmt.Sprintf("%s<li><b>%s</b> - %s</li>", body, neueArtikel[i].Artikelnummer, neueArtikel[i].Name)
		}
		body = fmt.Sprintf("%s</ul>", body)
	}

	if len(gelieferteArtikel) > 0 {
		body = fmt.Sprintf("%s<br><br><h2>Gelieferte Artikel</h2><ul>", body)

		for i := range gelieferteArtikel {
			body = fmt.Sprintf("%s<li><b>%s</b> - %s</li>", body, gelieferteArtikel[i].Artikelnummer, gelieferteArtikel[i].Name)
		}
		body = fmt.Sprintf("%s</ul>", body)
	}

	if len(neuePreise) > 0 {
		body = fmt.Sprintf("%s<br><br><h2>Preisänderungen</h2><ul>", body)

		for i := range neuePreise {
			var alterPreis string
			var neuerPreis string

			alterPreis = neuePreise[i].Alterpreis.String
			neuerPreis = neuePreise[i].Neuerpreis.String

			if neuerPreis != alterPreis {
				body = fmt.Sprintf("%s<li><b>%s</b> - %s: %s ➡️ %s ", body, neuePreise[i].Artikelnummer, neuePreise[i].Name, alterPreis, neuerPreis)
				var altFloat float64
				var neuFloat float64
				if neuePreise[i].Alterpreis.Valid {
					altFloat, _ = strconv.ParseFloat(neuePreise[i].Alterpreis.String, 64)
				}
				if neuePreise[i].Neuerpreis.Valid {
					neuFloat, _ = strconv.ParseFloat(neuePreise[i].Neuerpreis.String, 64)
				}
				absolute := neuFloat - altFloat
				prozent := ((altFloat / altFloat) * 100) - 100
				body = fmt.Sprintf("%s(%.2f %% // %.2f €)</li>", body, prozent, absolute)
			}

		}
		body = fmt.Sprintf("%s</ul>", body)
	}

	body = fmt.Sprintf("%s<h2>Aktuelle Lagerwerte</h2><p><b>Lagerwert Verfügbare Artikel:</b> %.2f €</p><p><b>Lagerwert alle lagernde Artikel:</b> %.2f €</p>", body, wertVerfügbar, wertBestand)
	body = fmt.Sprintf("%s<p>Wert in aktuellen Aufträgen: %.2f €", body, wertBestand-wertVerfügbar)

	if len(SN) > 0 {
		body = fmt.Sprintf("%s<h2>Artikel mit alten Seriennummern</h2><p>Nachfolgende Artikel sollten mit erhöhter Prioriät verkauf werden, da die Seriennummern bereits sehr alt sind. Gegebenenfalls sind die Artikel bereits außerhalb der Herstellergarantie!</p>", body)
		body = fmt.Sprintf("%s<p>Folgende Werte gelten:</p>", body)
		body = fmt.Sprintf("%s<p>Wortmann: Angebene Garantielaufzeit + 2 Monate ab Kaufdatum CompEx</p>", body)
		body = fmt.Sprintf("%s<p>Lenovo: Angegebene Garantielaufzeit ab Kauf CompEx</p>", body)
		body = fmt.Sprintf("%s<p>Bei allen anderen Herstellern gilt teilweise das Kaufdatum des Kunden. <br>Falls sich dies ändern sollte, wird es in der Aufzählung ergänzt.</p>", body)

		body = fmt.Sprintf("%s<p>Erklärungen der Farben:</p>", body)
		body = fmt.Sprintf("%s<p><span style='background-color: \"#f45865\"'>ROT:</span> Artikel ist bereits seit mehr als 2 Jahren lagernd und sollte schnellstens Verkauft werden!</p>", body)
		body = fmt.Sprintf("%s<p><span style='background-color: \"#fff200\"'>Gelb:</span> Artikel ist bereits seit mehr als 1 Jahr lagernd!</p>", body)

		body = fmt.Sprintf("%s<table><thead>", body)
		body = fmt.Sprintf("%s<tr>", body)
		body = fmt.Sprintf("%s<th>Artikelnummer</th>", body)
		body = fmt.Sprintf("%s<th>Name</th>", body)
		body = fmt.Sprintf("%s<th>Bestand</th>", body)
		body = fmt.Sprintf("%s<th>Verfügbar</th>", body)
		body = fmt.Sprintf("%s<th>Garantiebeginn des ältesten Artikels</th>", body)
		body = fmt.Sprintf("%s</tr>", body)
		body = fmt.Sprintf("%s</thead>", body)
		body = fmt.Sprintf("%s</thbody>", body)
		for i := range SN {
			year, _, _ := time.Now().Date()
			tmp := strings.Split(strings.Replace(strings.Split(SN[i].GeBeginn, "T")[0], "-", ".", -1), ".")
			year_tmp, err := strconv.Atoi(tmp[0])
			if err != nil {
				log.Fatal("SendMail: Fehler beim voncertieren von string zu int (year) in GetAlteSeriennummern!", err)
			}

			GarantieBeginn := fmt.Sprintf("%s.%s.%s", tmp[2], tmp[1], tmp[0])
			diff := year - year_tmp
			if diff >= 2 {
				body = fmt.Sprintf("%s<tr style='background-color: \"#f45865\"'>", body)
			} else if diff >= 1 {
				body = fmt.Sprintf("%s<tr style='background-color: \"#fff200\"'>", body)
			} else {
				body = fmt.Sprintf("%s<tr>", body)
			}
			body = fmt.Sprintf("%s<td>%s</td>", body, SN[i].ArtNr)
			body = fmt.Sprintf("%s<td>%s</td>", body, SN[i].Suchbegriff)
			body = fmt.Sprintf("%s<td>%v</td>", body, SN[i].Bestand)
			body = fmt.Sprintf("%s<td>%v</td>", body, SN[i].Verfügbar)
			body = fmt.Sprintf("%s<td>%s</td>", body, GarantieBeginn)
			body = fmt.Sprintf("%s</tr>", body)

		}
		body = fmt.Sprintf("%s</tbody></table>", body)
	}

	if len(teureArtikel) > 0 {
		body = fmt.Sprintf("%s<h2>Top 10: Die teuersten Artikel inkl. aktive Aufträge</h2><table><thead><tr><th>Artikelnummer</th><th>Name</th><th>Bestand</th><th>Einzelpreis</th><th>Summe</th></tr></thead><tbody>", body)

		for i := range teureArtikel {
			body = fmt.Sprintf("%s<tr><td>%s</td><td>%s</td><td>%d</td><td>%.2f €</td><td>%.2f €</td></tr>", body, teureArtikel[i].Artikelnummer, teureArtikel[i].Artikelname, teureArtikel[i].Bestand, teureArtikel[i].EK, teureArtikel[i].Summe)
		}
		body = fmt.Sprintf("%s</tbody></table>", body)
	}

	if len(teureVerfArtikel) > 0 {
		body = fmt.Sprintf("%s<h2>Top 10: Die teuersten Artikel exkl. aktive Aufträge</h2><table><thead><tr><th>Artikelnummer</th><th>Name</th><th>Bestand</th><th>Einzelpreis</th><th>Summe</th></tr></thead><tbody>", body)

		for i := range teureVerfArtikel {
			body = fmt.Sprintf("%s<tr><td>%s</td><td>%s</td><td>%d</td><td>%.2f €</td><td>%.2f €</td></tr>", body, teureVerfArtikel[i].Artikelnummer, teureVerfArtikel[i].Artikelname, teureVerfArtikel[i].Bestand, teureVerfArtikel[i].EK, teureVerfArtikel[i].Summe)

		}
		body = fmt.Sprintf("%s</tbody></table>", body)
	}

	if len(leichen) > 0 {
		body = fmt.Sprintf("%s<h2>Top 20: Leichen bei CE</h2><table><thead><tr><th>Artikelnummer</th><th>Name</th><th>Bestand</th><th>Verfügbar</th><th>Letzter Umsatz:</th><th>Wert im Lager:</th></tr></thead><tbody>", body)
		for i := range leichen {
			summe := float64(leichen[i].Verfügbar) * leichen[i].EK
			var LetzterUmsatz string
			if leichen[i].LetzterUmsatz == "1899-12-30T00:00:00Z" {
				LetzterUmsatz = "nie"
			} else {
				tmp := strings.Split(strings.Replace(strings.Split(leichen[i].LetzterUmsatz, "T")[0], "-", ".", -1), ".")
				LetzterUmsatz = fmt.Sprintf("%s.%s.%s", tmp[2], tmp[1], tmp[0])
			}
			bestand := leichen[i].Bestand
			verf := leichen[i].Verfügbar
			artNr := leichen[i].Artikelnummer
			name := leichen[i].Artikelname
			body = fmt.Sprintf("%s<tr><td>%s</td><td>%s</td><td>%d</td><td>%d</td><td>%s</td><td>%.2f€</td></tr>", body, artNr, name, bestand, verf, LetzterUmsatz, summe)
		}
		body = fmt.Sprintf("%s</tbody></table>", body)
	}

	d := gomail.NewDialer(MAIL_SERVER, MAIL_PORT, MAIL_USER, MAIL_PASSWORD)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}
	s, err := d.Dial()
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
	}
	m := gomail.NewMessage()

	for i := range Mitarbeiter {
		if Mitarbeiter[i].Email.Valid && len(Mitarbeiter[i].Email.String) > 1 {

			// Set Mail Sender
			m.SetHeader("From", MAIL_FROM)
			// Receiver
			m.SetHeader("To", Mitarbeiter[i].Email.String)
			// Set Subject
			m.SetHeader("Subject", fmt.Sprintf("Warenlieferung vom %v", time.Now().Format(time.DateOnly)))
			// Set Body
			m.SetBody("text/html", body)

			if err := gomail.Send(s, m); err != nil {
				fmt.Println(err)
				fehler := err.Error()
				json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
				return
			}

			m.Reset()
		}
	}
	json.NewEncoder(w).Encode(map[string]string{"ok": "true", "error": "false"})
}
