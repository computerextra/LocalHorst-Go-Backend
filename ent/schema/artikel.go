package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Artikel holds the schema definition for the Artikel entity.
type Artikel struct {
	ent.Schema
}

// Fields of the Artikel.
func (Artikel) Fields() []ent.Field {
	return []ent.Field{
		field.String("Artikelnummer"),
		field.String("Suchbegriff"),
		field.Int("Anzahl"),
	}
}

// Edges of the Artikel.
func (Artikel) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("team", Team.Type).Ref("artikel").Unique(),
	}
}
