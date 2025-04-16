// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"golang-backend/ent/artikel"
	"golang-backend/ent/team"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// ArtikelCreate is the builder for creating a Artikel entity.
type ArtikelCreate struct {
	config
	mutation *ArtikelMutation
	hooks    []Hook
	conflict []sql.ConflictOption
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
	_spec.OnConflict = ac.conflict
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
		_node.team_artikel = &nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Artikel.Create().
//		SetArtikelnummer(v).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.ArtikelUpsert) {
//			SetArtikelnummer(v+v).
//		}).
//		Exec(ctx)
func (ac *ArtikelCreate) OnConflict(opts ...sql.ConflictOption) *ArtikelUpsertOne {
	ac.conflict = opts
	return &ArtikelUpsertOne{
		create: ac,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Artikel.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
func (ac *ArtikelCreate) OnConflictColumns(columns ...string) *ArtikelUpsertOne {
	ac.conflict = append(ac.conflict, sql.ConflictColumns(columns...))
	return &ArtikelUpsertOne{
		create: ac,
	}
}

type (
	// ArtikelUpsertOne is the builder for "upsert"-ing
	//  one Artikel node.
	ArtikelUpsertOne struct {
		create *ArtikelCreate
	}

	// ArtikelUpsert is the "OnConflict" setter.
	ArtikelUpsert struct {
		*sql.UpdateSet
	}
)

// SetArtikelnummer sets the "Artikelnummer" field.
func (u *ArtikelUpsert) SetArtikelnummer(v string) *ArtikelUpsert {
	u.Set(artikel.FieldArtikelnummer, v)
	return u
}

// UpdateArtikelnummer sets the "Artikelnummer" field to the value that was provided on create.
func (u *ArtikelUpsert) UpdateArtikelnummer() *ArtikelUpsert {
	u.SetExcluded(artikel.FieldArtikelnummer)
	return u
}

// SetSuchbegriff sets the "Suchbegriff" field.
func (u *ArtikelUpsert) SetSuchbegriff(v string) *ArtikelUpsert {
	u.Set(artikel.FieldSuchbegriff, v)
	return u
}

// UpdateSuchbegriff sets the "Suchbegriff" field to the value that was provided on create.
func (u *ArtikelUpsert) UpdateSuchbegriff() *ArtikelUpsert {
	u.SetExcluded(artikel.FieldSuchbegriff)
	return u
}

// SetAnzahl sets the "Anzahl" field.
func (u *ArtikelUpsert) SetAnzahl(v int) *ArtikelUpsert {
	u.Set(artikel.FieldAnzahl, v)
	return u
}

// UpdateAnzahl sets the "Anzahl" field to the value that was provided on create.
func (u *ArtikelUpsert) UpdateAnzahl() *ArtikelUpsert {
	u.SetExcluded(artikel.FieldAnzahl)
	return u
}

// AddAnzahl adds v to the "Anzahl" field.
func (u *ArtikelUpsert) AddAnzahl(v int) *ArtikelUpsert {
	u.Add(artikel.FieldAnzahl, v)
	return u
}

// UpdateNewValues updates the mutable fields using the new values that were set on create.
// Using this option is equivalent to using:
//
//	client.Artikel.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//		).
//		Exec(ctx)
func (u *ArtikelUpsertOne) UpdateNewValues() *ArtikelUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.Artikel.Create().
//	    OnConflict(sql.ResolveWithIgnore()).
//	    Exec(ctx)
func (u *ArtikelUpsertOne) Ignore() *ArtikelUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *ArtikelUpsertOne) DoNothing() *ArtikelUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the ArtikelCreate.OnConflict
// documentation for more info.
func (u *ArtikelUpsertOne) Update(set func(*ArtikelUpsert)) *ArtikelUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&ArtikelUpsert{UpdateSet: update})
	}))
	return u
}

// SetArtikelnummer sets the "Artikelnummer" field.
func (u *ArtikelUpsertOne) SetArtikelnummer(v string) *ArtikelUpsertOne {
	return u.Update(func(s *ArtikelUpsert) {
		s.SetArtikelnummer(v)
	})
}

// UpdateArtikelnummer sets the "Artikelnummer" field to the value that was provided on create.
func (u *ArtikelUpsertOne) UpdateArtikelnummer() *ArtikelUpsertOne {
	return u.Update(func(s *ArtikelUpsert) {
		s.UpdateArtikelnummer()
	})
}

// SetSuchbegriff sets the "Suchbegriff" field.
func (u *ArtikelUpsertOne) SetSuchbegriff(v string) *ArtikelUpsertOne {
	return u.Update(func(s *ArtikelUpsert) {
		s.SetSuchbegriff(v)
	})
}

// UpdateSuchbegriff sets the "Suchbegriff" field to the value that was provided on create.
func (u *ArtikelUpsertOne) UpdateSuchbegriff() *ArtikelUpsertOne {
	return u.Update(func(s *ArtikelUpsert) {
		s.UpdateSuchbegriff()
	})
}

// SetAnzahl sets the "Anzahl" field.
func (u *ArtikelUpsertOne) SetAnzahl(v int) *ArtikelUpsertOne {
	return u.Update(func(s *ArtikelUpsert) {
		s.SetAnzahl(v)
	})
}

// AddAnzahl adds v to the "Anzahl" field.
func (u *ArtikelUpsertOne) AddAnzahl(v int) *ArtikelUpsertOne {
	return u.Update(func(s *ArtikelUpsert) {
		s.AddAnzahl(v)
	})
}

// UpdateAnzahl sets the "Anzahl" field to the value that was provided on create.
func (u *ArtikelUpsertOne) UpdateAnzahl() *ArtikelUpsertOne {
	return u.Update(func(s *ArtikelUpsert) {
		s.UpdateAnzahl()
	})
}

// Exec executes the query.
func (u *ArtikelUpsertOne) Exec(ctx context.Context) error {
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for ArtikelCreate.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *ArtikelUpsertOne) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}

// Exec executes the UPSERT query and returns the inserted/updated ID.
func (u *ArtikelUpsertOne) ID(ctx context.Context) (id int, err error) {
	node, err := u.create.Save(ctx)
	if err != nil {
		return id, err
	}
	return node.ID, nil
}

// IDX is like ID, but panics if an error occurs.
func (u *ArtikelUpsertOne) IDX(ctx context.Context) int {
	id, err := u.ID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// ArtikelCreateBulk is the builder for creating many Artikel entities in bulk.
type ArtikelCreateBulk struct {
	config
	err      error
	builders []*ArtikelCreate
	conflict []sql.ConflictOption
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
					spec.OnConflict = acb.conflict
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

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Artikel.CreateBulk(builders...).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.ArtikelUpsert) {
//			SetArtikelnummer(v+v).
//		}).
//		Exec(ctx)
func (acb *ArtikelCreateBulk) OnConflict(opts ...sql.ConflictOption) *ArtikelUpsertBulk {
	acb.conflict = opts
	return &ArtikelUpsertBulk{
		create: acb,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Artikel.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
func (acb *ArtikelCreateBulk) OnConflictColumns(columns ...string) *ArtikelUpsertBulk {
	acb.conflict = append(acb.conflict, sql.ConflictColumns(columns...))
	return &ArtikelUpsertBulk{
		create: acb,
	}
}

// ArtikelUpsertBulk is the builder for "upsert"-ing
// a bulk of Artikel nodes.
type ArtikelUpsertBulk struct {
	create *ArtikelCreateBulk
}

// UpdateNewValues updates the mutable fields using the new values that
// were set on create. Using this option is equivalent to using:
//
//	client.Artikel.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//		).
//		Exec(ctx)
func (u *ArtikelUpsertBulk) UpdateNewValues() *ArtikelUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.Artikel.Create().
//		OnConflict(sql.ResolveWithIgnore()).
//		Exec(ctx)
func (u *ArtikelUpsertBulk) Ignore() *ArtikelUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *ArtikelUpsertBulk) DoNothing() *ArtikelUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the ArtikelCreateBulk.OnConflict
// documentation for more info.
func (u *ArtikelUpsertBulk) Update(set func(*ArtikelUpsert)) *ArtikelUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&ArtikelUpsert{UpdateSet: update})
	}))
	return u
}

// SetArtikelnummer sets the "Artikelnummer" field.
func (u *ArtikelUpsertBulk) SetArtikelnummer(v string) *ArtikelUpsertBulk {
	return u.Update(func(s *ArtikelUpsert) {
		s.SetArtikelnummer(v)
	})
}

// UpdateArtikelnummer sets the "Artikelnummer" field to the value that was provided on create.
func (u *ArtikelUpsertBulk) UpdateArtikelnummer() *ArtikelUpsertBulk {
	return u.Update(func(s *ArtikelUpsert) {
		s.UpdateArtikelnummer()
	})
}

// SetSuchbegriff sets the "Suchbegriff" field.
func (u *ArtikelUpsertBulk) SetSuchbegriff(v string) *ArtikelUpsertBulk {
	return u.Update(func(s *ArtikelUpsert) {
		s.SetSuchbegriff(v)
	})
}

// UpdateSuchbegriff sets the "Suchbegriff" field to the value that was provided on create.
func (u *ArtikelUpsertBulk) UpdateSuchbegriff() *ArtikelUpsertBulk {
	return u.Update(func(s *ArtikelUpsert) {
		s.UpdateSuchbegriff()
	})
}

// SetAnzahl sets the "Anzahl" field.
func (u *ArtikelUpsertBulk) SetAnzahl(v int) *ArtikelUpsertBulk {
	return u.Update(func(s *ArtikelUpsert) {
		s.SetAnzahl(v)
	})
}

// AddAnzahl adds v to the "Anzahl" field.
func (u *ArtikelUpsertBulk) AddAnzahl(v int) *ArtikelUpsertBulk {
	return u.Update(func(s *ArtikelUpsert) {
		s.AddAnzahl(v)
	})
}

// UpdateAnzahl sets the "Anzahl" field to the value that was provided on create.
func (u *ArtikelUpsertBulk) UpdateAnzahl() *ArtikelUpsertBulk {
	return u.Update(func(s *ArtikelUpsert) {
		s.UpdateAnzahl()
	})
}

// Exec executes the query.
func (u *ArtikelUpsertBulk) Exec(ctx context.Context) error {
	if u.create.err != nil {
		return u.create.err
	}
	for i, b := range u.create.builders {
		if len(b.conflict) != 0 {
			return fmt.Errorf("ent: OnConflict was set for builder %d. Set it on the ArtikelCreateBulk instead", i)
		}
	}
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for ArtikelCreateBulk.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *ArtikelUpsertBulk) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}
