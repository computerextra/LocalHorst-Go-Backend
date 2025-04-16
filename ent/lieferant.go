// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fmt"
	"golang-backend/ent/lieferant"
	"strings"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
)

// Lieferant is the model entity for the Lieferant schema.
type Lieferant struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// Firma holds the value of the "Firma" field.
	Firma string `json:"Firma,omitempty"`
	// Kundennummer holds the value of the "Kundennummer" field.
	Kundennummer *string `json:"Kundennummer,omitempty"`
	// Webseite holds the value of the "Webseite" field.
	Webseite *string `json:"Webseite,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the LieferantQuery when eager-loading is set.
	Edges        LieferantEdges `json:"edges"`
	selectValues sql.SelectValues
}

// LieferantEdges holds the relations/edges for other nodes in the graph.
type LieferantEdges struct {
	// Ansprechpartner holds the value of the Ansprechpartner edge.
	Ansprechpartner []*Ansprechpartner `json:"Ansprechpartner,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
}

// AnsprechpartnerOrErr returns the Ansprechpartner value or an error if the edge
// was not loaded in eager-loading.
func (e LieferantEdges) AnsprechpartnerOrErr() ([]*Ansprechpartner, error) {
	if e.loadedTypes[0] {
		return e.Ansprechpartner, nil
	}
	return nil, &NotLoadedError{edge: "Ansprechpartner"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Lieferant) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case lieferant.FieldID:
			values[i] = new(sql.NullInt64)
		case lieferant.FieldFirma, lieferant.FieldKundennummer, lieferant.FieldWebseite:
			values[i] = new(sql.NullString)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Lieferant fields.
func (l *Lieferant) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case lieferant.FieldID:
			value, ok := values[i].(*sql.NullInt64)
			if !ok {
				return fmt.Errorf("unexpected type %T for field id", value)
			}
			l.ID = int(value.Int64)
		case lieferant.FieldFirma:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field Firma", values[i])
			} else if value.Valid {
				l.Firma = value.String
			}
		case lieferant.FieldKundennummer:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field Kundennummer", values[i])
			} else if value.Valid {
				l.Kundennummer = new(string)
				*l.Kundennummer = value.String
			}
		case lieferant.FieldWebseite:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field Webseite", values[i])
			} else if value.Valid {
				l.Webseite = new(string)
				*l.Webseite = value.String
			}
		default:
			l.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the Lieferant.
// This includes values selected through modifiers, order, etc.
func (l *Lieferant) Value(name string) (ent.Value, error) {
	return l.selectValues.Get(name)
}

// QueryAnsprechpartner queries the "Ansprechpartner" edge of the Lieferant entity.
func (l *Lieferant) QueryAnsprechpartner() *AnsprechpartnerQuery {
	return NewLieferantClient(l.config).QueryAnsprechpartner(l)
}

// Update returns a builder for updating this Lieferant.
// Note that you need to call Lieferant.Unwrap() before calling this method if this Lieferant
// was returned from a transaction, and the transaction was committed or rolled back.
func (l *Lieferant) Update() *LieferantUpdateOne {
	return NewLieferantClient(l.config).UpdateOne(l)
}

// Unwrap unwraps the Lieferant entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (l *Lieferant) Unwrap() *Lieferant {
	_tx, ok := l.config.driver.(*txDriver)
	if !ok {
		panic("ent: Lieferant is not a transactional entity")
	}
	l.config.driver = _tx.drv
	return l
}

// String implements the fmt.Stringer.
func (l *Lieferant) String() string {
	var builder strings.Builder
	builder.WriteString("Lieferant(")
	builder.WriteString(fmt.Sprintf("id=%v, ", l.ID))
	builder.WriteString("Firma=")
	builder.WriteString(l.Firma)
	builder.WriteString(", ")
	if v := l.Kundennummer; v != nil {
		builder.WriteString("Kundennummer=")
		builder.WriteString(*v)
	}
	builder.WriteString(", ")
	if v := l.Webseite; v != nil {
		builder.WriteString("Webseite=")
		builder.WriteString(*v)
	}
	builder.WriteByte(')')
	return builder.String()
}

// Lieferants is a parsable slice of Lieferant.
type Lieferants []*Lieferant
