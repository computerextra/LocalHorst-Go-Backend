package types

import "database/sql"

type Sg_Adressen struct {
	SG_Adressen_PK int
	Suchbegriff    sql.NullString
	KundNr         sql.NullString
	LiefNr         sql.NullString
	Homepage       sql.NullString
	Telefon1       sql.NullString
	Telefon2       sql.NullString
	Mobiltelefon1  sql.NullString
	Mobiltelefon2  sql.NullString
	EMail1         sql.NullString
	EMail2         sql.NullString
	KundUmsatz     sql.NullFloat64
	LiefUmsatz     sql.NullFloat64
}

type InventurAllFile struct {
	Artikelnummer string `json:"Artikelnummer"`
	Suchbegriff   string `json:"Suchbegriff"`
	Anzahl        int    `json:"Anzahl"`
	Team          string `json:"Team"`
}

type InventurTeamFile struct {
	Team        int    `json:"Team"`
	Mitarbeiter string `json:"Mitarbeiter"`
	Farbe       string `json:"Farbe"`
	Ort         string `json:"Ort"`
}

type InventurEntry struct {
	Artikelnummer string `json:"Artikelnummer"`
	Suchbegriff   string `json:"Suchbegriff"`
	Anzahl        int    `json:"Anzahl"`
}
