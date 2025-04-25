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
		field.String("Short").Nillable().Optional(),
		field.String("Gruppenwahl").Nillable().Optional(),
		field.String("InternTelefon1").Nillable().Optional(),
		field.String("InternTelefon2").Nillable().Optional(),
		field.String("FestnetzPrivat").Nillable().Optional(),
		field.String("FestnetzAlternativ").Nillable().Optional(),
		field.String("HomeOffice").Nillable().Optional(),
		field.String("MobilBusiness").Nillable().Optional(),
		field.String("MobilPrivat").Nillable().Optional(),
		field.String("Email").Nillable().Optional(),
		field.Bool("Azubi").Default(false),
		field.Time("Geburtstag").Nillable().Optional(),
		// Einkauf
		field.Bool("Paypal").Default(false),
		field.Bool("Abonniert").Default(false),
		field.String("Geld").Nillable().Optional(),
		field.String("Pfand").Nillable().Optional(),
		field.Text("Dinge").Nillable().Optional(),
		field.Time("Abgeschickt").Nillable().Optional(),
		field.String("Bild1").Nillable().Optional(),
		field.String("Bild2").Nillable().Optional(),
		field.String("Bild3").Nillable().Optional(),
		field.Time("Bild1Date").Nillable().Optional(),
		field.Time("Bild2Date").Nillable().Optional(),
		field.Time("Bild3Date").Nillable().Optional(),
	}
}

// Edges of the Mitarbeiter.
func (Mitarbeiter) Edges() []ent.Edge {
	return nil
}
