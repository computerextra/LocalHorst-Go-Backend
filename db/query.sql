-- name: GetUser :one
SELECT * FROM Mitarbeiter WHERE id = ? LIMIT 1;

-- name: GetUsers :many
SELECT * FROM Mitarbeiter ORDER BY name;

-- name: CreateUser :execresult
INSERT INTO Mitarbeiter 
(Name, Short, Gruppenwahl, 
InternTelefon1, InternTelefon2, 
FestnetzAlternativ, FestnetzPrivat, 
HomeOffice, MobilBusiness, 
MobilPrivat, Email, Azubi, Geburtstag) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: DeleteAuthor :exec
DELETE FROM Mitarbeiter WHERE id = ?;