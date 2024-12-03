import LoadingSpinner from "@/components/LoadingSpinner";
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
import { getUsers, type Mitarbeiter } from "@/db/Mitarbeiter";
import { Check } from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function MitarbeiterOverview() {
  const [mitarbeiter, setMitarbeiter] = useState<undefined | Mitarbeiter[]>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function x() {
      const user = await getUsers();
      setMitarbeiter(user);
      setLoading(false);
    }

    void x();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1>Mitarbeiter</h1>
      <div className="grid grid-cols-2 gap-4 mt-4 2xl:grid-cols-3">
        {mitarbeiter?.map((x) => (
          <Card key={x.ID}>
            <CardHeader>
              <CardTitle>{x.Name}</CardTitle>
              <CardDescription>
                {x.Email.Valid ? (
                  <a
                    className="underline text-primary"
                    href={`mailto:${x.Email.String}`}
                  >
                    {x.Email.String}
                  </a>
                ) : (
                  ""
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[11rem]">
              <Table>
                <TableBody>
                  {x.Gruppenwahl.Valid && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Gruppenwahl:
                      </TableCell>
                      <TableCell>{x.Gruppenwahl.String}</TableCell>
                    </TableRow>
                  )}
                  {(x.Interntelefon1.Valid || x.Interntelefon2.Valid) && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Interne Durchwahl:
                      </TableCell>
                      <TableCell>
                        {x.Interntelefon1.Valid && x.Interntelefon1.String}
                        {x.Interntelefon1.Valid && x.Interntelefon2.Valid && (
                          <>{" / "}</>
                        )}
                        {x.Interntelefon2.Valid && x.Interntelefon2.String}
                      </TableCell>
                    </TableRow>
                  )}
                  {x.Homeoffice.Valid && (
                    <TableRow>
                      <TableCell className="font-medium">Homeoffice:</TableCell>
                      <TableCell>{x.Homeoffice.String}</TableCell>
                    </TableRow>
                  )}
                  {x.Festnetzprivat.Valid && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Festnetz Privat:
                      </TableCell>
                      <TableCell>
                        <a
                          className="underline text-primary"
                          href={`tel:${x.Festnetzprivat.String}`}
                        >
                          {x.Festnetzprivat.String}
                        </a>
                      </TableCell>
                    </TableRow>
                  )}
                  {x.Festnetzalternativ.Valid && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Festnetz Geschäftlich:
                      </TableCell>
                      <TableCell>
                        <a
                          className="underline text-primary"
                          href={`tel:${x.Festnetzalternativ.String}`}
                        >
                          {x.Festnetzalternativ.String}
                        </a>
                      </TableCell>
                    </TableRow>
                  )}
                  {x.Mobilbusiness.Valid && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Mobil Business:
                      </TableCell>
                      <TableCell>
                        <a
                          className="underline text-primary"
                          href={`tel:${x.Mobilbusiness.String}`}
                        >
                          {x.Mobilbusiness.String}
                        </a>
                      </TableCell>
                    </TableRow>
                  )}
                  {x.Mobilprivat.Valid && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Mobil Privat:
                      </TableCell>
                      <TableCell>
                        <a
                          className="underline text-primary"
                          href={`tel:${x.Mobilprivat.String}`}
                        >
                          {x.Mobilprivat.String}
                        </a>
                      </TableCell>
                    </TableRow>
                  )}

                  {x.Azubi.Valid && x.Azubi.Bool && (
                    <TableRow>
                      <TableCell className="font-medium">Azubi</TableCell>
                      <TableCell>
                        <Check className="w-4 h-4 text-primary" />
                      </TableCell>
                    </TableRow>
                  )}

                  {x.Geburtstag.Valid && x.Geburtstag.Time && (
                    <TableRow>
                      <TableCell className="font-medium">Geburtstag:</TableCell>
                      <TableCell>
                        {new Date(x.Geburtstag.Time).toLocaleDateString(
                          "de-DE",
                          { day: "2-digit", month: "long" }
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="justify-between">
              <Button asChild>
                <Link to={`/Mitarbeiter/${x.ID}`}>Details</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to={`/Mitarbeiter/${x.ID}/Bearbeiten`}>Bearbeiten</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
