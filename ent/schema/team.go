package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Team holds the schema definition for the Team entity.
type Team struct {
	ent.Schema
}

// Fields of the Team.
func (Team) Fields() []ent.Field {
	return []ent.Field{
		field.Int("Team").Unique(),
		field.String("Mitarbeiter"),
		field.String("Farbe"),
		field.String("Ort"),
	}
}

// Edges of the Team.
func (Team) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("teamName", Artikel.Type),
		edge.From("Jahr", Inventur.Type).Ref("Teams").Unique(),
	}
}
