import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router";
import { GetMitarbeiter } from "../../../wailsjs/go/main/App";

export default function DetailMitarbeiter() {
  const { id } = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["mitarbeiter", id],
    queryFn: () => GetMitarbeiter(id ? parseInt(id) : 0),
    enabled: !!id,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{data.Name}</CardTitle>
          <CardDescription>{data.Email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Interne Nummern:</p>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="Gruppenwahl">Gruppenwahl</Label>
              <Input
                type="text"
                id="Gruppenwahl"
                placeholder="Gruppenwahl"
                value={data.Gruppenwahl}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="InternTelefon1">InternTelefon1</Label>
              <Input
                type="text"
                id="InternTelefon1"
                placeholder="InternTelefon1"
                value={data.InternTelefon1}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="InternTelefon2">InternTelefon2</Label>
              <Input
                type="text"
                id="InternTelefon2"
                placeholder="InternTelefon2"
                value={data.InternTelefon2}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="HomeOffice">HomeOffice</Label>
              <Input
                type="text"
                id="HomeOffice"
                placeholder="HomeOffice"
                value={data.HomeOffice}
                disabled
              />
            </div>
          </div>
          <Separator className="my-2" />
          <p className="mb-2">Externe Nummern:</p>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <span>Festnetz Privat</span>
              <a href={"tel:" + data.FestnetzPrivat} className="underline">
                {data.FestnetzPrivat}
              </a>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <span>Festnetz Business</span>
              <a href={"tel:" + data.FestnetzAlternativ} className="underline">
                {data.FestnetzAlternativ}
              </a>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <span>Mobil Privat</span>
              <a href={"tel:" + data.MobilPrivat} className="underline">
                {data.MobilPrivat}
              </a>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <span>Mobil Business</span>
              <a href={"tel:" + data.MobilBusiness} className="underline">
                {data.MobilBusiness}
              </a>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <span>Geburtstag</span>
            <p>
              {data.Geburtstag
                ? new Date(data.Geburtstag).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "--.--.----"}
            </p>
          </div>
          <Separator className="my-2" />
          <div>Letzer Einkauf:</div>
          TODO: Letzter Einkauf
        </CardContent>
        <CardFooter>
          <Button asChild>
            <NavLink to={`/mitarbeiter/${id}/edit`}>Bearbeiten</NavLink>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
