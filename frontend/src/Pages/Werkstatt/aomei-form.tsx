import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

export default function AomeiForm() {
  const [Lizenz, setLizenz] = useState<undefined | string>(undefined);
  const [Gerätenummer, setGerätenummer] = useState<undefined | string>(
    undefined
  );

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="print:hidden space-y-4">
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Gerätenummer">Gerätenummer</Label>
            <Input
              required
              type="text"
              id="Gerätenummer"
              placeholder="Gerätenummer"
              defaultValue={Gerätenummer}
              onChange={(e) => setGerätenummer(e.target.value)}
            />
          </div>

          <Button onClick={window.print} type="submit">
            Drucken
          </Button>
        </div>
      </form>
      <div className="hidden print:block">
        <div className="mt-24">
          <h1 className="text-center">
            AOMEI Backupper Pro
            <br />
            für 2 Computer
          </h1>
          <img
            src="/images/aomei.png"
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
          />
          <div className="mt-4 text-center">
            <p id="print-p1">
              <b>Lizenzschlüssel:</b>
              <br />
              {Lizenz}
            </p>
            <p id="print-p2">
              <b>Installiert auf Gerät:</b>
              <br />
              {Gerätenummer}
            </p>
            <div className="max-w-[40%] mx-auto mt-8">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, wenn Sie sich erneut in AOMEI anmelden möchten.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
