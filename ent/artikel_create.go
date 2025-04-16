// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"golang-backend/ent/artikel"
	"golang-backend/ent/team"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// ArtikelCreate is the builder for creating a Artikel entity.
type ArtikelCreate struct {
	config
	mutation *ArtikelMutation
	hooks    []Hook
}

// SetArtikelnummer sets the "Artikelnummer" field.
func (ac *ArtikelCreate) SetArtikelnummer(s string) *ArtikelCreate {
	ac.mutation.SetArtikelnummer(s)
	return ac
}

// SetSuchbegriff sets the "Suchbegriff" field.
func (ac *ArtikelCreate) SetSuchbegriff(s string) *ArtikelCreate {
	ac.mutation.SetSuchbegriff(s)
	return ac
}

// SetAnzahl sets the "Anzahl" field.
func (ac *ArtikelCreate) SetAnzahl(i int) *ArtikelCreate {
	ac.mutation.SetAnzahl(i)
	return ac
}

// SetTeamID sets the "team" edge to the Team entity by ID.
func (ac *ArtikelCreate) SetTeamID(id int) *ArtikelCreate {
	ac.mutation.SetTeamID(id)
	return ac
}

// SetNillableTeamID sets the "team" edge to the Team entity by ID if the given value is not nil.
func (ac *ArtikelCreate) SetNillableTeamID(id *int) *ArtikelCreate {
	if id != nil {
		ac = ac.SetTeamID(*id)
	}
	return ac
}

// SetTeam sets the "team" edge to the Team entity.
func (ac *ArtikelCreate) SetTeam(t *Team) *ArtikelCreate {
	return ac.SetTeamID(t.ID)
}

// Mutation returns the ArtikelMutation object of the builder.
func (ac *ArtikelCreate) Mutation() *ArtikelMutation {
	return ac.mutation
}

// Save creates the Artikel in the database.
func (ac *ArtikelCreate) Save(ctx context.Context) (*Artikel, error) {
	return withHooks(ctx, ac.sqlSave, ac.mutation, ac.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (ac *ArtikelCreate) SaveX(ctx context.Context) *Artikel {
	v, err := ac.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ac *ArtikelCreate) Exec(ctx context.Context) error {
	_, err := ac.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ac *ArtikelCreate) ExecX(ctx context.Context) {
	if err := ac.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ac *ArtikelCreate) check() error {
	if _, ok := ac.mutation.Artikelnummer(); !ok {
		return &ValidationError{Name: "Artikelnummer", err: errors.New(`ent: missing required field "Artikel.Artikelnummer"`)}
	}
	if _, ok := ac.mutation.Suchbegriff(); !ok {
		return &ValidationError{Name: "Suchbegriff", err: errors.New(`ent: missing required field "Artikel.Suchbegriff"`)}
	}
	if _, ok := ac.mutation.Anzahl(); !ok {
		return &ValidationError{Name: "Anzahl", err: errors.New(`ent: missing required field "Artikel.Anzahl"`)}
	}
	return nil
}

func (ac *ArtikelCreate) sqlSave(ctx context.Context) (*Artikel, error) {
	if err := ac.check(); err != nil {
		return nil, err
	}
	_node, _spec := ac.createSpec()
	if err := sqlgraph.CreateNode(ctx, ac.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	ac.mutation.id = &_node.ID
	ac.mutation.done = true
	return _node, nil
}

func (ac *ArtikelCreate) createSpec() (*Artikel, *sqlgraph.CreateSpec) {
	var (
		_node = &Artikel{config: ac.config}
		_spec = sqlgraph.NewCreateSpec(artikel.Table, sqlgraph.NewFieldSpec(artikel.FieldID, field.TypeInt))
	)
	if value, ok := ac.mutation.Artikelnummer(); ok {
		_spec.SetField(artikel.FieldArtikelnummer, field.TypeString, value)
		_node.Artikelnummer = value
	}
	if value, ok := ac.mutation.Suchbegriff(); ok {
		_spec.SetField(artikel.FieldSuchbegriff, field.TypeString, value)
		_node.Suchbegriff = value
	}
	if value, ok := ac.mutation.Anzahl(); ok {
		_spec.SetField(artikel.FieldAnzahl, field.TypeInt, value)
		_node.Anzahl = value
	}
	if nodes := ac.mutation.TeamIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   artikel.TeamTable,
			Columns: []string{artikel.TeamColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(team.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.team_team_name = &nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// ArtikelCreateBulk is the builder for creating many Artikel entities in bulk.
type ArtikelCreateBulk struct {
	config
	err      error
	builders []*ArtikelCreate
}

// Save creates the Artikel entities in the database.
func (acb *ArtikelCreateBulk) Save(ctx context.Context) ([]*Artikel, error) {
	if acb.err != nil {
		return nil, acb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(acb.builders))
	nodes := make([]*Artikel, len(acb.builders))
	mutators := make([]Mutator, len(acb.builders))
	for i := range acb.builders {
		func(i int, root context.Context) {
			builder := acb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*ArtikelMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				var err error
				nodes[i], specs[i] = builder.createSpec()
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, acb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, acb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{msg: err.Error(), wrap: err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				if specs[i].ID.Value != nil {
					id := specs[i].ID.Value.(int64)
					nodes[i].ID = int(id)
				}
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, acb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (acb *ArtikelCreateBulk) SaveX(ctx context.Context) []*Artikel {
	v, err := acb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (acb *ArtikelCreateBulk) Exec(ctx context.Context) error {
	_, err := acb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (acb *ArtikelCreateBulk) ExecX(ctx context.Context) {
	if err := acb.Exec(ctx); err != nil {
		panic(err)
	}
}
