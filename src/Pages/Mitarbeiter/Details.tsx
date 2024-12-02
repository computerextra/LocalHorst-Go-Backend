import LoadingSpinner from "@/components/LoadingSpinner";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Einkauf, getEinkauf } from "@/db/Einkauf";
import { getUser, Mitarbeiter } from "@/db/Mitarbeiter";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function MitarbeiterDetail() {
  const { mid } = useParams();
  const [mitarbeiter, setMitarbeiter] = useState<
    undefined | null | Mitarbeiter
  >(undefined);
  const [einkauf, setEinkauf] = useState<undefined | null | Einkauf>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function x() {
      if (mid == null) return;

      const user = await getUser({ id: mid });
      const einkauf = await getEinkauf({ id: mid });

      setEinkauf(einkauf);
      setMitarbeiter(user);
      setLoading(false);
    }

    void x();
  }, [mid]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="mb-4">{mitarbeiter?.Name}</h1>
      {mitarbeiter && (
        <Table>
          <TableBody>
            {mitarbeiter.Gruppenwahl.Valid && (
              <TableRow>
                <TableCell className="font-medium">Gruppenwahl:</TableCell>
                <TableCell>{mitarbeiter.Gruppenwahl.String}</TableCell>
              </TableRow>
            )}
            {(mitarbeiter.Interntelefon1.Valid ||
              mitarbeiter.Interntelefon2.Valid) && (
              <TableRow>
                <TableCell className="font-medium">
                  Interne Durchwahl:
                </TableCell>
                <TableCell>
                  {mitarbeiter.Interntelefon1.Valid &&
                    mitarbeiter.Interntelefon1.String}
                  {mitarbeiter.Interntelefon1.Valid &&
                    mitarbeiter.Interntelefon2.Valid && <>{" / "}</>}
                  {mitarbeiter.Interntelefon2.Valid &&
                    mitarbeiter.Interntelefon2.String}
                </TableCell>
              </TableRow>
            )}
            {mitarbeiter.Homeoffice.Valid && (
              <TableRow>
                <TableCell className="font-medium">Homeoffice:</TableCell>
                <TableCell>{mitarbeiter.Homeoffice.String}</TableCell>
              </TableRow>
            )}
            {mitarbeiter.Festnetzprivat.Valid && (
              <TableRow>
                <TableCell className="font-medium">Festnetz Privat:</TableCell>
                <TableCell>
                  <a
                    className="underline text-primary"
                    href={`tel:${mitarbeiter.Festnetzprivat.String}`}
                  >
                    {mitarbeiter.Festnetzprivat.String}
                  </a>
                </TableCell>
              </TableRow>
            )}
            {mitarbeiter.Festnetzalternativ.Valid && (
              <TableRow>
                <TableCell className="font-medium">
                  Festnetz Geschäftlich:
                </TableCell>
                <TableCell>
                  <a
                    className="underline text-primary"
                    href={`tel:${mitarbeiter.Festnetzalternativ.String}`}
                  >
                    {mitarbeiter.Festnetzalternativ.String}
                  </a>
                </TableCell>
              </TableRow>
            )}
            {mitarbeiter.Mobilbusiness.Valid && (
              <TableRow>
                <TableCell className="font-medium">Mobil Business:</TableCell>
                <TableCell>
                  <a
                    className="underline text-primary"
                    href={`tel:${mitarbeiter.Mobilbusiness.String}`}
                  >
                    {mitarbeiter.Mobilbusiness.String}
                  </a>
                </TableCell>
              </TableRow>
            )}
            {mitarbeiter.Mobilprivat.Valid && (
              <TableRow>
                <TableCell className="font-medium">Mobil Privat:</TableCell>
                <TableCell>
                  <a
                    className="underline text-primary"
                    href={`tel:${mitarbeiter.Mobilprivat.String}`}
                  >
                    {mitarbeiter.Mobilprivat.String}
                  </a>
                </TableCell>
              </TableRow>
            )}

            {mitarbeiter.Azubi.Valid && mitarbeiter.Azubi.Bool && (
              <TableRow>
                <TableCell>Azubi</TableCell>
                <TableCell>
                  <Check className="w-4 h-4 text-primary" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      {einkauf && (
        <>
          <hr />
          <div className="mt-4">
            <p>
              Letzer Einkauf vom{" "}
              {einkauf.Abgeschickt.Valid &&
                new Date(einkauf.Abgeschickt.Time).toLocaleDateString()}
            </p>
            <pre className="font-sans text-base">{einkauf?.Dinge.String}</pre>
          </div>
          <p>Letzte Bilder</p>
          <div className="grid grid-cols-3 mt-4">
            {einkauf.Bild1.Valid && <img src={einkauf.Bild1.String} />}
            {einkauf.Bild2.Valid && <img src={einkauf.Bild2.String} />}
            {einkauf.Bild3.Valid && <img src={einkauf.Bild3.String} />}
          </div>
        </>
      )}
    </>
  );
}
