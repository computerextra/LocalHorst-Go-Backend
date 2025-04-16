// Code generated by ent, DO NOT EDIT.

package migrate

import (
	"entgo.io/ent/dialect/sql/schema"
	"entgo.io/ent/schema/field"
)

var (
	// AnsprechpartnersColumns holds the columns for the "ansprechpartners" table.
	AnsprechpartnersColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "name", Type: field.TypeString, Unique: true},
		{Name: "telefon", Type: field.TypeString},
		{Name: "mobil", Type: field.TypeString},
		{Name: "mail", Type: field.TypeString},
		{Name: "lieferant_ansprechpartner", Type: field.TypeInt, Nullable: true},
	}
	// AnsprechpartnersTable holds the schema information for the "ansprechpartners" table.
	AnsprechpartnersTable = &schema.Table{
		Name:       "ansprechpartners",
		Columns:    AnsprechpartnersColumns,
		PrimaryKey: []*schema.Column{AnsprechpartnersColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "ansprechpartners_lieferants_Ansprechpartner",
				Columns:    []*schema.Column{AnsprechpartnersColumns[5]},
				RefColumns: []*schema.Column{LieferantsColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// ArtikelsColumns holds the columns for the "artikels" table.
	ArtikelsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "artikelnummer", Type: field.TypeString},
		{Name: "suchbegriff", Type: field.TypeString},
		{Name: "anzahl", Type: field.TypeInt},
		{Name: "team_artikel", Type: field.TypeInt, Nullable: true},
	}
	// ArtikelsTable holds the schema information for the "artikels" table.
	ArtikelsTable = &schema.Table{
		Name:       "artikels",
		Columns:    ArtikelsColumns,
		PrimaryKey: []*schema.Column{ArtikelsColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "artikels_teams_artikel",
				Columns:    []*schema.Column{ArtikelsColumns[4]},
				RefColumns: []*schema.Column{TeamsColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// InventursColumns holds the columns for the "inventurs" table.
	InventursColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "jahr", Type: field.TypeInt, Unique: true},
	}
	// InventursTable holds the schema information for the "inventurs" table.
	InventursTable = &schema.Table{
		Name:       "inventurs",
		Columns:    InventursColumns,
		PrimaryKey: []*schema.Column{InventursColumns[0]},
	}
	// LieferantsColumns holds the columns for the "lieferants" table.
	LieferantsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "firma", Type: field.TypeString, Unique: true},
		{Name: "kundennummer", Type: field.TypeString},
		{Name: "webseite", Type: field.TypeString},
	}
	// LieferantsTable holds the schema information for the "lieferants" table.
	LieferantsTable = &schema.Table{
		Name:       "lieferants",
		Columns:    LieferantsColumns,
		PrimaryKey: []*schema.Column{LieferantsColumns[0]},
	}
	// MitarbeitersColumns holds the columns for the "mitarbeiters" table.
	MitarbeitersColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "name", Type: field.TypeString, Unique: true},
		{Name: "short", Type: field.TypeString},
		{Name: "gruppenwahl", Type: field.TypeString},
		{Name: "intern_telefon1", Type: field.TypeString},
		{Name: "intern_telefon2", Type: field.TypeString},
		{Name: "festnetz_privat", Type: field.TypeString},
		{Name: "festnetz_alternativ", Type: field.TypeString},
		{Name: "home_office", Type: field.TypeString},
		{Name: "mobil_business", Type: field.TypeString},
		{Name: "mobil_privat", Type: field.TypeString},
		{Name: "email", Type: field.TypeString, Unique: true},
		{Name: "azubi", Type: field.TypeBool, Default: false},
		{Name: "geburtstag", Type: field.TypeTime},
		{Name: "paypal", Type: field.TypeBool, Default: false},
		{Name: "abonniert", Type: field.TypeBool, Default: false},
		{Name: "geld", Type: field.TypeString},
		{Name: "pfand", Type: field.TypeString},
		{Name: "dinge", Type: field.TypeString, Size: 2147483647},
		{Name: "abgeschickt", Type: field.TypeTime},
		{Name: "bild1", Type: field.TypeString},
		{Name: "bild2", Type: field.TypeString},
		{Name: "bild3", Type: field.TypeString},
		{Name: "bild1date", Type: field.TypeTime},
		{Name: "bild2date", Type: field.TypeTime},
		{Name: "bild3date", Type: field.TypeTime},
		{Name: "abgesc_bild3datehickt", Type: field.TypeTime},
	}
	// MitarbeitersTable holds the schema information for the "mitarbeiters" table.
	MitarbeitersTable = &schema.Table{
		Name:       "mitarbeiters",
		Columns:    MitarbeitersColumns,
		PrimaryKey: []*schema.Column{MitarbeitersColumns[0]},
	}
	// TeamsColumns holds the columns for the "teams" table.
	TeamsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeInt, Increment: true},
		{Name: "team", Type: field.TypeInt, Unique: true},
		{Name: "mitarbeiter", Type: field.TypeString},
		{Name: "farbe", Type: field.TypeString},
		{Name: "ort", Type: field.TypeString},
		{Name: "inventur_teams", Type: field.TypeInt, Nullable: true},
	}
	// TeamsTable holds the schema information for the "teams" table.
	TeamsTable = &schema.Table{
		Name:       "teams",
		Columns:    TeamsColumns,
		PrimaryKey: []*schema.Column{TeamsColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "teams_inventurs_Teams",
				Columns:    []*schema.Column{TeamsColumns[5]},
				RefColumns: []*schema.Column{InventursColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// Tables holds all the tables in the schema.
	Tables = []*schema.Table{
		AnsprechpartnersTable,
		ArtikelsTable,
		InventursTable,
		LieferantsTable,
		MitarbeitersTable,
		TeamsTable,
	}
)

func init() {
	AnsprechpartnersTable.ForeignKeys[0].RefTable = LieferantsTable
	ArtikelsTable.ForeignKeys[0].RefTable = TeamsTable
	TeamsTable.ForeignKeys[0].RefTable = InventursTable
}
