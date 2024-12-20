-- name: GetUser :one
SELECT
    *
FROM
    Mitarbeiter
WHERE
    id = ?
LIMIT
    1;

-- name: GetUsers :many
SELECT
    *
FROM
    Mitarbeiter
ORDER BY
    Name;

-- name: CreateUser :execresult
INSERT INTO
    Mitarbeiter (
        id,
        Name,
        Short,
        Gruppenwahl,
        InternTelefon1,
        InternTelefon2,
        FestnetzAlternativ,
        FestnetzPrivat,
        HomeOffice,
        MobilBusiness,
        MobilPrivat,
        Email,
        Azubi,
        Geburtstag
    )
VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: UpdateUser :execresult
UPDATE
    Mitarbeiter
SET
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
WHERE
    id = ?;

-- name: DeleteUser :exec
DELETE FROM
    Mitarbeiter
WHERE
    id = ?;

-- name: GetEinkauf :one
SELECT
    *
FROM
    Einkauf
WHERE
    mitarbeiterId = ?
LIMIT
    1;

-- name: GetEinkaufListe :many
SELECT
    Einkauf.id,
    Einkauf.Paypal,
    Einkauf.Abonniert,
    Einkauf.Geld,
    Einkauf.Pfand,
    Einkauf.Dinge,
    Einkauf.Bild1,
    Einkauf.Bild2,
    Einkauf.Bild3,
    Einkauf.Bild1Date,
    Einkauf.Bild2Date,
    Einkauf.Bild3Date,
    Mitarbeiter.Name,
    Mitarbeiter.Email
FROM
    Einkauf
    LEFT JOIN Mitarbeiter ON Einkauf.mitarbeiterId = Mitarbeiter.id
WHERE
    DATEDIFF (NOW(), Einkauf.Abgeschickt) = 0
    OR Einkauf.Abonniert = 1
ORDER BY
    Einkauf.Abgeschickt DESC;

-- name: UpdateEinkauf :execresult
UPDATE
    Einkauf
SET
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
WHERE
    mitarbeiterId = ?;

-- name: CreateEinkauf :execresult
INSERT INTO
    Einkauf (
        id,
        Paypal,
        Abonniert,
        Geld,
        Pfand,
        Dinge,
        mitarbeiterId,
        Abgeschickt,
        Bild1,
        Bild2,
        Bild3,
        Bild1Date,
        Bild2Date,
        Bild3Date
    )
VALUES
    (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?);

-- name: SkipEinkauf :exec
UPDATE
    Einkauf
SET
    Abgeschickt = ?
WHERE
    id = ?;

-- name: DeleteEinkauf :exec
DELETE FROM
    Einkauf
WHERE
    id = ?;

-- name: DeleteEinkaufFromUser :exec
DELETE FROM Einkauf WHERE mitarbeiterId = ?;

-- name: GetLieferant :one
SELECT
    *
FROM
    Lieferanten
WHERE
    id = ?
LIMIT
    1;

-- name: GetLieferantWithAnsprechpartner :many
SELECT * FROM Lieferanten INNER JOIN Anschprechpartner ON lieferanten.id = anschprechpartner.lieferantenId WHERE lieferanten.id = ?;

-- name: GetLieferanten :many
SELECT
    *
FROM
    Lieferanten
ORDER BY
    Firma;

-- name: CreateLieferant :execresult
INSERT INTO
    Lieferanten (id, Firma, Kundennummer, Webseite)
VALUES
    (?, ?, ?, ?);

-- name: UpdateLuieferant :execresult
UPDATE
    Lieferanten
SET
    Firma = ?,
    Kundennummer = ?,
    Webseite = ?
WHERE
    id = ?;

-- name: DeleteLieferant :exec
DELETE FROM
    Lieferanten
WHERE
    id = ?;

-- name: GetAnsprechpartner :one
SELECT
    *
FROM
    Anschprechpartner
WHERE
    id = ?;

-- name: GetAnsprechpartnerFromLiegerant :many
SELECT
    *
FROM
    Anschprechpartner
WHERE
    lieferantenId = ?;

-- name: CreateAnsprechpartner :execresult
INSERT INTO
    Anschprechpartner (id, Name, Telefon, Mobil, Mail, lieferantenId)
VALUES
    (?, ?, ?, ?, ?, ?);

-- name: UpdateAnsprechpartner :execresult
UPDATE
    Anschprechpartner
SET
    Name = ?,
    Telefon = ?,
    Mobil = ?,
    Mail = ?,
    lieferantenId = ?
WHERE
    id = ?;

-- name: DeleteAnsprechpartner :exec
DELETE FROM Anschprechpartner
WHERE
    id = ?;


-- name: GetWikis :many
SELECT * FROM Wiki ORDER BY created_at DESC;

-- name: GetWiki :one
SELECT * FROM Wiki WHERE id = ? LIMIT 1;

-- name: CreateWiki :execresult
INSERT INTO Wiki (id, Name, Inhalt) VALUES(?, ?, ?);

-- name: UpdateWiki :execresult
UPDATE Wiki SET Name = ?, Inhalt = ?, created_at = NOW() WHERE id = ?;

-- name: DeleteWiki :exec
DELETE FROM Wiki WHERE id = ?; 

-- name: SearchArchive :many
SELECT id, title  FROM pdfs WHERE title LIKE ? OR body LIKE ?;

-- name: GetWarenlieferung :many
SELECT * FROM Warenlieferung;

-- name: InsertWarenlieferung :execresult
INSERT INTO Warenlieferung (id, Name, angelegt, Artikelnummer) VALUES(?, ?, NOW(), ?);

-- name: UpdateWarenlieferung :execresult
UPDATE Warenlieferung SET geliefert=NOW(), Name = ? WHERE id = ?;

-- name: UpdatePreisWarenlieferung :execresult
UPDATE Warenlieferung SET Preis=NOW(), AlterPreis = ?, NeuerPreis = ? WHERE id = ?;

-- name: GetDailyWarenlieferung :many
SELECT Name, Artikelnummer, AlterPreis, NeuerPreis FROM Warenlieferung WHERE DATE_FORMAT(Preis, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d') AND DATE_FORMAT(angelegt, '%Y-%m-%d') != DATE_FORMAT(NOW(), '%Y-%m-%d') ORDER BY Artikelnummer ASC;

-- name: GetDailyDelivered :many
SELECT Name, Artikelnummer FROM Warenlieferung WHERE DATE_FORMAT(geliefert, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d') AND DATE_FORMAT(angelegt, '%Y-%m-%d') != DATE_FORMAT(NOW(), '%Y-%m-%d') ORDER BY Artikelnummer ASC;

-- name: GetDailyNew :many
SELECT Name, Artikelnummer FROM Warenlieferung WHERE DATE_FORMAT(angelegt, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d') ORDER BY Artikelnummer ASC;

-- name: InsertAussteller :execresult
INSERT INTO Aussteller (id, Artikelnummer, Artikelname, Specs, Preis) VALUES (?, ?, ?,?,?) ON DUPLICATE KEY UPDATE Artikelname = ?, Specs = ?, Preis = ?;