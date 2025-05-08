import { FindeKunde, type HandoutKunde } from "@/api/kunden";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function MicrosoftForm() {
  const mutation = useMutation({
    mutationFn: (kundennummer: string) => FindeKunde(kundennummer),
    onSuccess: (data) => setKundendaten(data),
  });

  const [Benutzername, setBenutzername] = useState<string | undefined>(
    undefined
  );
  const [Passwort, setPasswort] = useState<string | undefined>(undefined);
  const [Kundennummer, setKundennummer] = useState<string | undefined>(
    undefined
  );
  const [Email, setEmail] = useState<string | undefined>(undefined);
  const [Mobil, setMobil] = useState<string | undefined>(undefined);

  const [Kundendaten, setKundendaten] = useState<undefined | HandoutKunde>();

  useEffect(() => {
    if (Kundennummer == null || Kundennummer.length < 7) return;
    mutation.mutate(Kundennummer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Kundennummer]);

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
            <Label htmlFor="Email">Email</Label>
            <Input
              type="text"
              id="Email"
              placeholder="Email"
              defaultValue={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Passwort">Mobil</Label>
            <Input
              type="text"
              id="Mobil"
              placeholder="Mobil"
              defaultValue={Mobil}
              onChange={(e) => setMobil(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Kundennummer">Kundennummer</Label>
            <Input
              required
              type="text"
              id="Kundennummer"
              placeholder="Kundennummer"
              defaultValue={Kundennummer}
              onChange={(e) => setKundennummer(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Kundendaten">Kundendaten</Label>
            <Input
              required
              type="text"
              id="Kundendaten"
              disabled
              placeholder="Kundendaten"
              value={
                Kundendaten && `${Kundendaten.Vorname} ${Kundendaten.Name}`
              }
            />
          </div>

          <Button type="submit">Drucken</Button>
        </form>
      </div>
      <div className="hidden print:block" data-theme="light">
        <div className="mt-10">
          <h1 className="text-center">Microsoft Zugangsdaten</h1>
          <img
            src="/images/microsoft.jpg"
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
          />
          <div className="mt-4 text-center">
            <p id="print-p1">
              <b>Kundennummer:</b>
              <br />
              {Kundennummer}
            </p>
            <p id="print-p2">
              <b>Name:</b>
              <br />
              {Kundendaten?.Vorname} {Kundendaten?.Name}
            </p>
            <p id="print-p3">
              <b>Benutzername:</b>
              <br />
              {Benutzername}
            </p>
            <p id="print-p4">
              <b>Passwort:</b>
              <br />
              {Passwort}
            </p>
            <p id="print-p5">
              <b>Alternative E-Mail-Adresse:</b>
              <br />
              {Email}
            </p>
            <p id="print-p6">
              <b>Mobilfunk:</b>
              <br />
              {Mobil}
            </p>
            <div className="max-w-[40%] mx-auto mt-8">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, wenn Sie sich erneut bei Microsoft anmelden möchten.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
