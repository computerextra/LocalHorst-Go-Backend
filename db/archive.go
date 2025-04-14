package db

import "fmt"

type Archive struct {
	Id    int32
	Title string
	Body  string
}

func (d Database) SearchArchive(searchTerm string) ([]Archive, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	rows, err := conn.Query(
		fmt.Sprintf("SELECT id, title, body FROM pdfs WHERE body LIKE \"%%%s%%\" OR title LIKE \"%%%s%%\"", searchTerm, searchTerm),
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []Archive
	for rows.Next() {
		var x Archive
		if err := rows.Scan(&x.Id, &x.Title, &x.Body); err != nil {
			return nil, err
		}
		res = append(res, x)
	}
	return res, nil
}

func (d Database) GetArchive(id int32) (*Archive, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	rows, err := conn.Query(
		fmt.Sprintf("SELECT id, title, body FROM pdfs WHERE id=%v", id),
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var x Archive
	for rows.Next() {
		if err := rows.Scan(&x.Id, &x.Title, &x.Body); err != nil {
			return nil, err
		}
	}

	return &x, nil
}
