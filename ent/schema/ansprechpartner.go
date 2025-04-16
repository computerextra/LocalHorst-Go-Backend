package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Ansprechpartner holds the schema definition for the Ansprechpartner entity.
type Ansprechpartner struct {
	ent.Schema
}

// Fields of the Ansprechpartner.
func (Ansprechpartner) Fields() []ent.Field {
	return []ent.Field{
		field.String("Name").NotEmpty().Unique(),
		field.String("Telefon").Nillable(),
		field.String("Mobil").Nillable(),
		field.String("Mail").Nillable(),
	}
}

// Edges of the Ansprechpartner.
func (Ansprechpartner) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("Lieferant", Lieferant.Type).Ref("Ansprechpartner").Unique(),
	}
}
