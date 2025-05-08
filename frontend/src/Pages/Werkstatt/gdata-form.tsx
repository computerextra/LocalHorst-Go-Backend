import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { z } from "zod";

const Versions = z.enum([
  "Anti-Virus",
  "MES",
  "Internet Security",
  "Internet Security Attached",
  "Mobile Internet Security",
  "Mobile Security",
  "Total Security",
]);

export default function GdataForm() {
  const [Benutzername, setBenutzername] = useState<string | undefined>(
    undefined
  );
  const [Passwort, setPasswort] = useState<string | undefined>(undefined);
  const [Version, setVersion] = useState<z.infer<typeof Versions> | undefined>(
    undefined
  );
  const [Benutzer, setBenutzer] = useState<string | undefined>(undefined);
  const [Lizenz, setLizenz] = useState<string | undefined>(undefined);

  return (
    <>
      <div className="print:hidden">
        <form onSubmit={window.print} className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Benutzername">Benutzername</Label>
            <Input
              required
              type="text"
              id="Benutzername"
              placeholder="Benutzername"
              defaultValue={Benutzername}
              onChange={(e) => setBenutzername(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Passwort">Passwort</Label>
            <Input
              required
              type="text"
              id="Passwort"
              placeholder="Passwort"
              defaultValue={Passwort}
              onChange={(e) => setPasswort(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Benutzer">Benutzer</Label>
            <Input
              required
              type="text"
              id="Benutzer"
              placeholder="Benutzer"
              defaultValue={Benutzer}
              onChange={(e) => setBenutzer(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Version">Version</Label>
            <Select
              defaultValue={Version}
              onValueChange={(e) => {
                const res = Versions.parse(e);
                setVersion(res);
              }}
            >
              <SelectTrigger id="Version" className="w-[180px]">
                <SelectValue placeholder="Bitte wählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Anwendungen</SelectLabel>
                  {Object.keys(Versions.enum).map((x) => (
                    <SelectItem value={x} key={x}>
                      {x}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Lizenz">Lizenz</Label>
            <Input
              required
              type="text"
              id="Lizenz"
              placeholder="Lizenz"
              defaultValue={Lizenz}
              onChange={(e) => setLizenz(e.target.value)}
            />
          </div>

          <Button type="submit">Drucken</Button>
        </form>
      </div>
      <div className="hidden print:block" data-theme="light">
        <div className="mt-24">
          <h1 className="text-center">G Data {Version} Zugangsdaten</h1>
          <img
            src="/images/gdata.png"
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
          />
          <div className="mt-8 text-center">
            <p>
              G Data {Version} für {Benutzer} Benutzer
            </p>
            <p>
              <b>Lizenzschlüssel:</b>
              <br />
              {Lizenz}
            </p>
            <p>
              <b>Benutzername:</b>
              <br />
              {Benutzername}
            </p>
            <p>
              <b>Passwort:</b>
              <br />
              {Passwort}
            </p>
            <div className="max-w-[40%] mx-auto mt-8">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, wenn Sie sich erneut in G Data anmelden möchten.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
