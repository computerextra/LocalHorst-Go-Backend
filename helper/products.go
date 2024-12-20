package helper

import (
	"database/sql"
	"fmt"
	"strconv"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/sage"
)

func SortProducts(Products []db.Warenlieferung) ([]db.Warenlieferung, []db.Warenlieferung, []db.Warenlieferung, error) {
	Sage, err := sage.GetAllProductsFromSage()
	if err != nil {
		return nil, nil, nil, err
	}
	History, err := sage.GetLagerHistory()
	if err != nil {
		return nil, nil, nil, err
	}
	Prices, err := sage.GetPrices()
	if err != nil {
		return nil, nil, nil, err
	}

	var neueArtikel []db.Warenlieferung
	var gelieferteArtikel []db.Warenlieferung
	var geliefert []int
	var neuePreise []db.Warenlieferung

	if len(Products) <= 0 {
		for i := range Sage {
			neu := db.Warenlieferung{
				ID:            int32(Sage[i].Id),
				Artikelnummer: Sage[i].Artikelnummer,
				Name:          Sage[i].Suchbegriff,
			}
			neueArtikel = append(neueArtikel, neu)
		}
	} else {
		for i := range History {
			if History[i].Action == "Insert" {
				geliefert = append(geliefert, History[i].Id)
			}
		}
		for i := range Sage {
			var found bool
			found = false
			for y := 0; y < len(geliefert); y++ {
				if Sage[i].Id == geliefert[y] {
					prod := db.Warenlieferung{
						ID:   int32(Sage[i].Id),
						Name: Sage[i].Suchbegriff,
					}
					gelieferteArtikel = append(gelieferteArtikel, prod)
				}
			}
			for x := 0; x < len(Products); x++ {
				if Sage[i].Id == int(Products[x].ID) {
					found = true
					break
				}
			}
			if !found {
				neu := db.Warenlieferung{
					ID:            int32(Sage[i].Id),
					Artikelnummer: Sage[i].Artikelnummer,
					Name:          Sage[i].Suchbegriff,
				}
				neueArtikel = append(neueArtikel, neu)
			}
		}
		for i := range Prices {
			var temp db.Warenlieferung
			var found bool
			idx := 0
			if len(neuePreise) > 0 {
				for x := 0; x < len(neuePreise); x++ {
					if neuePreise[x].ID == int32(Prices[i].Id) {
						found = true
						temp = neuePreise[x]
						idx = x
					}
				}
			}
			if !found {
				temp.ID = int32(Prices[i].Id)
				temp.Preis = sql.NullTime{Time: time.Now(), Valid: true}
			}
			if Prices[i].Action == "Insert" {
				temp.Neuerpreis = sql.NullString{String: fmt.Sprintf("%.2f", Prices[i].Price), Valid: true}
			}
			if Prices[i].Action == "Delete" {
				temp.Alterpreis = sql.NullString{String: fmt.Sprintf("%.2f", Prices[i].Price), Valid: true}
			}
			if idx > 0 {
				var altFloat float64
				var neuFloat float64
				if temp.Alterpreis.Valid {
					altFloat, _ = strconv.ParseFloat(temp.Alterpreis.String, 32)
				}
				if altFloat > 0 {
					neuePreise[idx].Alterpreis = sql.NullString{String: temp.Alterpreis.String, Valid: true}
				}
				if temp.Neuerpreis.Valid {
					neuFloat, _ = strconv.ParseFloat(temp.Neuerpreis.String, 32)
				}
				if neuFloat > 0 {
					neuePreise[idx].Neuerpreis = sql.NullString{String: temp.Neuerpreis.String, Valid: true}
				}
			} else {
				neuePreise = append(neuePreise, temp)
			}
		}
	}

	return neueArtikel, gelieferteArtikel, neuePreise, nil
}
