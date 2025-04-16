package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Mitarbeiter holds the schema definition for the Mitarbeiter entity.
type Mitarbeiter struct {
	ent.Schema
}

// Fields of the Mitarbeiter.
func (Mitarbeiter) Fields() []ent.Field {
	return []ent.Field{
		// Mitarbeiter
		field.String("Name").NotEmpty().Unique(),
		field.String("Short").Nillable(),
		field.String("Gruppenwahl").Nillable(),
		field.String("InternTelefon1").Nillable(),
		field.String("InternTelefon2").Nillable(),
		field.String("FestnetzPrivat").Nillable(),
		field.String("FestnetzAlternativ").Nillable(),
		field.String("HomeOffice").Nillable(),
		field.String("MobilBusiness").Nillable(),
		field.String("MobilPrivat").Nillable(),
		field.String("Email").Nillable().Unique(),
		field.Bool("Azubi").Default(false),
		field.Time("Geburtstag").Nillable(),
		// Einkauf
		field.Bool("Paypal").Default(false),
		field.Bool("Abonniert").Default(false),
		field.String("Geld").Nillable(),
		field.String("Pfand").Nillable(),
		field.Text("Dinge").Nillable(),
		field.Time("Abgeschickt").Nillable(),
		field.String("Bild1").Nillable(),
		field.String("Bild2").Nillable(),
		field.String("Bild3").Nillable(),
		field.Time("Bild1Date").Nillable(),
		field.Time("Bild2Date").Nillable(),
		field.Time("Bild3Date").Nillable(),
		field.Time("AbgescBild3Datehickt").Nillable(),
	}
}

// Edges of the Mitarbeiter.
func (Mitarbeiter) Edges() []ent.Edge {
	return nil
}
