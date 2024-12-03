import LoadingSpinner from "@/components/LoadingSpinner";
import { getEinkauf } from "@/db/Einkauf";
import { getUser } from "@/db/Mitarbeiter";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function MitarbeiterDetail() {
  const { mid } = useParams();
  const {
    data: mitarbeiter,
    isLoading: maLoading,
    isError: maError,
  } = useQuery({
    queryKey: ["user", mid],
    queryFn: () => getUser({ id: mid ?? "" }),
    enabled: !!mid,
  });
  const {
    data: einkauf,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["einkauf", mid],
    queryFn: () => getEinkauf({ id: mid ?? "" }),
    enabled: !!mid,
  });

  if (isLoading || maLoading) return <LoadingSpinner />;
  if (isError || maError) return <>Fehler...</>;

  return (
    <>
      <h1 className="mb-4">{mitarbeiter?.Name}</h1>
      {mitarbeiter && (
        <Card key={mitarbeiter.ID}>
          <CardHeader>
            <CardTitle>{mitarbeiter.Name}</CardTitle>
            <CardDescription>
              {mitarbeiter.Email.Valid ? (
                <a
                  className="underline text-primary"
                  href={`mailto:${mitarbeiter.Email.String}`}
                >
                  {mitarbeiter.Email.String}
                </a>
              ) : (
                ""
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[11rem]">
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
                    <TableCell className="font-medium">
                      Festnetz Privat:
                    </TableCell>
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
                    <TableCell className="font-medium">
                      Mobil Business:
                    </TableCell>
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
                    <TableCell className="font-medium">Azubi</TableCell>
                    <TableCell>
                      <Check className="w-4 h-4 text-primary" />
                    </TableCell>
                  </TableRow>
                )}

                {mitarbeiter.Geburtstag.Valid &&
                  mitarbeiter.Geburtstag.Time && (
                    <TableRow>
                      <TableCell className="font-medium">Geburtstag:</TableCell>
                      <TableCell>
                        {new Date(
                          mitarbeiter.Geburtstag.Time
                        ).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "long",
                        })}
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-between">
            <Button asChild>
              <Link to={`/Mitarbeiter/${mitarbeiter.ID}`}>Details</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to={`/Mitarbeiter/${mitarbeiter.ID}/Bearbeiten`}>
                Bearbeiten
              </Link>
            </Button>
          </CardFooter>
        </Card>
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
