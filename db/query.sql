-- name: GetUser :one
SELECT * FROM Mitarbeiter WHERE id = ? LIMIT 1;

-- name: GetUsers :many
SELECT * FROM Mitarbeiter ORDER BY Name;


-- name: CreateUser :execresult
INSERT INTO Mitarbeiter 
(Name, Short, Gruppenwahl, 
InternTelefon1, InternTelefon2, 
FestnetzAlternativ, FestnetzPrivat, 
HomeOffice, MobilBusiness, 
MobilPrivat, Email, Azubi, Geburtstag) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: UpdateUser :execresult
UPDATE Mitarbeiter SET
 Name = ?,
 Short = ?,
 Gruppenwahl = ?,
 InternTelefon1 = ?,
 InternTelefon2 = ?,
 FestnetzAlternativ = ?,
 FestnetzPrivat = ?,
 HomeOffice = ?,
 MobilBusiness = ?,
 MobilPrivat = ?,
 Email = ?,
 Azubi = ?,
 Geburtstag = ?
 WHERE id = ?;

-- name: DeleteUser :exec
DELETE FROM Mitarbeiter WHERE id = ?;

-- name: GetEinkauf :one
SELECT * FROM Einkauf WHERE mitarbeiterId = ? LIMIT 1;

-- name: GetEinkaufListe :many
SELECT * FROM Einkauf ORDER BY Abgeschickt DESC;

-- name: UpsertEinkauf :execresult
INSERT INTO Einkauf (Paypal, Abonniert, Geld, Pfand, Dinge, mitarbeiterId, Abgeschickt, Bild1, Bild2, Bild3, Bild1Date, Bild2Date, Bild3Date)
VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
Paypal = ?,
Abonniert = ?,
Geld = ?,
Pfand = ?,
Dinge = ?,
Abgeschickt = NOW(),
Bild1 = ?,
Bild2 = ?,
Bild3 = ?,
Bild1Date = ?,
Bild2Date = ?,
Bild3Date = ?;

-- name: SkipEinkauf :exec
UPDATE Einkauf SET Abgeschickt = DATE_ADD(NOW(), INTERVAL 1 DAY) WHERE id = ?;

-- name: DeleteEinkauf :exec
DELETE FROM Einkauf WHERE id = ?;