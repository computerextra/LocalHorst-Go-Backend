package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Inventur holds the schema definition for the Inventur entity.
type Inventur struct {
	ent.Schema
}

// Fields of the Inventur.
func (Inventur) Fields() []ent.Field {
	return []ent.Field{
		field.Int("Jahr").Unique(),
	}
}

// Edges of the Inventur.
func (Inventur) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("Teams", Team.Type),
	}
}
