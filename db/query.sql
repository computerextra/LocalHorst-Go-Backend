-- name: GetUser :one
SELECT * FROM Mitarbeiter WHERE id = ? LIMIT 1;

-- name: GetUsers :many
SELECT * FROM Mitarbeiter ORDER BY Name;


-- name: CreateUser :execresult
INSERT INTO Mitarbeiter 
(id, Name, Short, Gruppenwahl, 
InternTelefon1, InternTelefon2, 
FestnetzAlternativ, FestnetzPrivat, 
HomeOffice, MobilBusiness, 
MobilPrivat, Email, Azubi, Geburtstag) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

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
SELECT 
Einkauf.id, Einkauf.Paypal, Einkauf.Abonniert, Einkauf.Geld, Einkauf.Pfand, Einkauf.Dinge, 
Einkauf.Bild1, Einkauf.Bild2, Einkauf.Bild3, Einkauf.Bild1Date, Einkauf.Bild2Date, 
Einkauf.Bild3Date, Mitarbeiter.Name, Mitarbeiter.Email
FROM Einkauf 
LEFT JOIN Mitarbeiter ON Einkauf.mitarbeiterId = Mitarbeiter.id 
WHERE DATEDIFF(NOW(), Einkauf.Abgeschickt) = 0 OR Einkauf.Abonniert = 1 
ORDER BY Einkauf.Abgeschickt DESC;

-- name: UpdateEinkauf :execresult
UPDATE Einkauf SET 
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
Bild3Date = ?
WHERE mitarbeiterId = ?;

-- name: CreateEinkauf :execresult
INSERT INTO Einkauf (Paypal, Abonniert, Geld, Pfand, Dinge, mitarbeiterId, Abgeschickt, Bild1, Bild2, Bild3, Bild1Date, Bild2Date, Bild3Date)
VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?);

-- name: SkipEinkauf :exec
UPDATE Einkauf SET Abgeschickt = DATE_ADD(NOW(), INTERVAL 1 DAY) WHERE id = ?;

-- name: DeleteEinkauf :exec
DELETE FROM Einkauf WHERE id = ?;