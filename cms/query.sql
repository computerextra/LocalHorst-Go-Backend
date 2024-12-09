-- name: GetAbteilung :one
SELECT * FROM Abteilung WHERE id = ? LIMIT 1;

-- name: GetAbteilungen :many
SELECT * FROM Abteilung ORDER BY name;

-- name: UpdateAbteilung :execresult
UPDATE Abteilung SET name = ? WHERE id = ?;

-- name: CreateAbteilung :execresult
INSERT INTO Abteilung (id, name) VALUES (?, ?);

-- name: DeleteAbteilung :exec
DELETE FROM Abteilung WHERE id = ?;

-- name: GetAngebot :one
SELECT * FROM Angebot WHERE id = ? LIMIT 1;

-- name: GetAngeboten :many
SELECT * FROM Angebot ORDER BY title;

-- name: UpdateAngebot :execresult
UPDATE Angebot SET title = ?, subtitle = ?, date_start = ?, date_stop = ?, link = ?, image = ?, anzeigen = ? WHERE id = ?;

-- name: CreateAngebot :execresult
INSERT INTO Angebot (id, title, subtitle, date_start, date_stop, link, image, anzeigen)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);

-- name: DeleteAngebot :exec
DELETE FROM Angebot WHERE id = ?;


-- name: GetJob :one
SELECT * FROM Jobs WHERE id = ? LIMIT 1;

-- name: GetJos :many
SELECT * FROM Jobs ORDER BY name;

-- name: UpdateJob :execresult
UPDATE Jobs SET name = ?, online = ? WHERE id = ?;

-- name: CreateJob :execresult
INSERT INTO Jobs (id, name, online) VALUES (?, ?,?);

-- name: DeleteJob :exec
DELETE FROM Jobs WHERE id = ?;


-- name: GetMitarbeiter :one
SELECT * FROM Mitarbeiter WHERE id = ? LIMIT 1;

-- name: GetAllMitarbeiter :many
SELECT * FROM Mitarbeiter ORDER BY name;

-- name: UpdateMitarbeiter :execresult
UPDATE Mitarbeiter SET name = ?, short = ?, image = ?, sex = ?, tags = ?, focus = ?, abteilungId = ? WHERE id = ?;

-- name: CreateMitarbeiter :execresult
INSERT INTO Mitarbeiter (id, name, short, image, sex, tags, focus, abteilungId)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);

-- name: DeleteMitarbeiter :exec
DELETE FROM Mitarbeiter WHERE id = ?;


-- name: GetPartner :one
SELECT * FROM Partner WHERE id = ? LIMIT 1;

-- name: GetAllPartner :many
SELECT * FROM Partner ORDER BY name;

-- name: UpdatePartner :execresult
UPDATE Partner set name = ?, link = ?, image = ? WHERE id = ?;

-- name: CreatePartner :execresult
INSERT INTO Partner (id, name, link, image)
VALUES (?, ?, ?, ?);

-- name: DeletePartner :exec
DELETE FROM Partner WHERE id = ?;

