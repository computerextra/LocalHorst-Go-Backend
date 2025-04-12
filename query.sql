-- name: SearchArchive :many
SELECT * FROM pdfs 
WHERE body 
LIKE ? 
OR title LIKE ?;

-- name: GetArchive :one
SELECT * FROM pds WHERE id = ?;

-- name: GetEinkaufsListe :many
SELECT Einkauf.*, Mitarbeiter.* 
FROM Einkauf 
LEFT JOIN Mitarbeiter 
ON Einkauf.mitarbeiterId = Mitarbeiter.id 
WHERE DATE(Abgeschickt) = curdate() 
OR Abonniert = 1 
ORDER BY Abgeschickt ASC;