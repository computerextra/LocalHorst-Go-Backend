package db

type Archive struct {
	Id    int32
	Title string
	Body  string
}

func (d Database) SearchArchive(searchTerm string) ([]Archive, error) {

	stmt, err := d.conn.Prepare("SELECT id, title, body FROM pdfs WHERE body LIKE ? OR title LIKE ?;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(
		searchTerm, searchTerm,
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
	stmt, err := d.conn.Prepare("SELECT id, title, body FROM pdfs WHERE id= ?;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	var x Archive
	err = stmt.QueryRow(id).Scan(&x.Id, &x.Title, &x.Body)
	if err != nil {
		return nil, err
	}

	return &x, nil
}
