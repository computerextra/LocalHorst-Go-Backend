-- name: GetAbteilung :one
SELECT * FROM Abteilung WHERE id = ? LIMIT 1;

-- name: GetAbteilungen :many
SELECT * FROM Abteilung ORDER BY name;


-- name: GetAngebot :one
SELECT * FROM Angebot WHERE id = ? LIMIT 1;

-- name: GetAngeboten :many
SELECT * FROM Angebot ORDER BY title;


-- name: GetJob :one
SELECT * FROM Jobs WHERE id = ? LIMIT 1;

-- name: GetJos :many
SELECT * FROM Jobs ORDER BY name;

-- name: GetMitarbeiter :one
SELECT * FROM Mitarbeiter WHERE id = ? LIMIT 1;

-- name: GetAllMitarbeiter :many
SELECT * FROM Mitarbeiter ORDER BY name;

-- name: GetPartner :one
SELECT * FROM Partner WHERE id = ? LIMIT 1;

-- name: GetAllPartner :many
SELECT * FROM Partner ORDER BY name;