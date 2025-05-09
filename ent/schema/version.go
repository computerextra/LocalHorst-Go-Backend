package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Version holds the schema definition for the Version entity.
type Version struct {
	ent.Schema
}

// Fields of the Version.
func (Version) Fields() []ent.Field {
	return []ent.Field{
		field.Float("CurrentVersion").Unique(),
	}
}

// Edges of the Version.
func (Version) Edges() []ent.Edge {
	return nil
}
