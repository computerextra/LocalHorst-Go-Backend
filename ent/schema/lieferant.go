package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Lieferant holds the schema definition for the Lieferant entity.
type Lieferant struct {
	ent.Schema
}

// Fields of the Lieferant.
func (Lieferant) Fields() []ent.Field {
	return []ent.Field{
		field.String("Firma").NotEmpty().Unique(),
		field.String("Kundennummer").Nillable().Optional(),
		field.String("Webseite").Nillable().Optional(),
	}
}

// Edges of the Lieferant.
func (Lieferant) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("Ansprechpartner", Ansprechpartner.Type),
	}
}
