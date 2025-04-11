import { useEffect, useState } from "react";
import { GetKunde } from "../../wailsjs/go/main/App";
import { main } from "../../wailsjs/go/models";
import BackButton from "../Components/BackButton";

export default function Werkstatt() {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  return (
    <>
      <BackButton href="/" />
      <h1 className="print:!hidden">Kunden Handout für Zugangsdaten</h1>
      <fieldset className="fieldset mb-8 print:mb-0 print:!hidden">
        <legend className="fieldset-legend">Software</legend>
        <select
          className="select"
          required
          name="val"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option disabled selected>
            Bitte wählen
          </option>
          <option value="AOMEI">AOMEI</option>
          <option value="Apple">Apple</option>
          <option value="GData">G Data</option>
          <option value="Google">Google</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Telekom">Telekom</option>
        </select>
      </fieldset>
      <div className="divider print:!hidden"></div>
      <WerkstattForm selected={selected} />
    </>
  );
}

function WerkstattForm({ selected }: { selected?: string }) {
  switch (selected) {
    case "AOMEI":
      return <AomeiForm />;

    case "Apple":
      return <AppleForm />;

    case "GData":
      return <GdataForm />;

    case "Microsoft":
      return <MicrosoftForm />;

    case "Google":
      return <GoogleForm />;

    case "Telekom":
      return <TelekomForm />;
  }
}

function AomeiForm() {
  // TODO: Implement
  return <>aeomei</>;
}

function AppleForm() {
  // TODO: Implement
  return <></>;
}

function GdataForm() {
  const [Benutzername, setBenutzername] = useState<string | undefined>(
    undefined
  );
  const [Passwort, setPasswort] = useState<string | undefined>(undefined);
  const [Version, setVersion] = useState<string | undefined>(undefined);
  const [Benutzer, setBenutzer] = useState<string | undefined>(undefined);
  const [Lizenz, setLizenz] = useState<string | undefined>(undefined);

  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <div className="print:hidden">
        <fieldset className="fieldset">
          <legend>Benutzername</legend>
          <input
            type="text"
            name="Benutzername"
            id="Benutzername"
            defaultValue={Benutzername}
            onChange={(e) => setBenutzername(e.target.value)}
            required
            className="input"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend>Passwort</legend>
          <input
            type="text"
            name="Passwort"
            id="Passwort"
            defaultValue={Passwort}
            onChange={(e) => setPasswort(e.target.value)}
            required
            className="input"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Software Version</legend>
          <select
            className="select"
            required
            name="Version"
            id="Version"
            defaultValue={Version}
            onChange={(e) => setVersion(e.target.value)}
          >
            <option disabled selected>
              Bitte wählen
            </option>
            <option value="Anti-Virus">Anti-Virus</option>
            <option value="MES">MES</option>
            <option value="InternetSecurity">InternetSecurity</option>
            <option value="Internet Security Attached">
              Internet Security Attached
            </option>
            <option value="Mobile Internet Security">
              Mobile Internet Security
            </option>
            <option value="Mobile Security">Mobile Security</option>
            <option value="Total Security">Total Security</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend>Anzahl der Benutzer</legend>
          <input
            type="number"
            name="Benutzer"
            id="Benutzer"
            required
            min="1"
            defaultValue={Benutzer}
            onChange={(e) => setBenutzer(e.target.value)}
            className="input"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend>Lizenz Schlüssel</legend>
          <input
            type="text"
            name="Lizenz"
            id="Lizenz"
            required
            defaultValue={Lizenz}
            onChange={(e) => setLizenz(e.target.value)}
            className="input"
          />
        </fieldset>
        <input
          onClick={handlePrint}
          value="Drucken"
          type="submit"
          className="btn btn-success"
        />
      </div>
      <div className="hidden print:block" data-theme="light">
        <div className="mt-24">
          <h1 className="text-center">G Data {Version} Zugangsdaten</h1>
          <img
            src="/images/GDATA.png"
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

function MicrosoftForm() {
  const [Benutzername, setBenutzername] = useState<string | undefined>(
    undefined
  );
  const [Passwort, setPasswort] = useState<string | undefined>(undefined);
  const [Kundennummer, setKundennummer] = useState<string | undefined>(
    undefined
  );
  const [Email, setEmail] = useState<string | undefined>(undefined);
  const [Mobil, setMobil] = useState<string | undefined>(undefined);
  const [Kundendaten, setKundendaten] = useState<undefined | main.User>();
  const [loading, setLoadin] = useState(false);

  useEffect(() => {
    async function x() {
      if (Kundennummer == null) return;
      if (Kundennummer.length < 7) return;
      setLoadin(true);
      setKundendaten(await GetKunde(Kundennummer));
      setLoadin(false);
    }
    x();
  }, [Kundennummer]);

  const handlePrint = () => {
    if (Kundendaten == null) return;
    window.print();
  };

  return (
    <>
      <div className="print:hidden">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Benutzername</legend>
          <input
            type="text"
            name="Benutzername"
            id="Benutzername"
            required
            className="input"
            disabled={loading}
            defaultValue={Benutzername}
            onChange={(e) => setBenutzername(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Passwort</legend>
          <input
            type="text"
            name="Passwort"
            id="Passwort"
            required
            disabled={loading}
            className="input"
            defaultValue={Passwort}
            onChange={(e) => setPasswort(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Kundennummer</legend>
          <input
            type="text"
            name="Kundennummer"
            id="Kundennummer"
            disabled={loading}
            required
            className="input"
            defaultValue={Kundennummer}
            onChange={(e) => setKundennummer(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Kundenname</legend>
          <input
            type="text"
            name="Name"
            disabled
            required
            className="input"
            value={Kundendaten && `${Kundendaten.Vorname} ${Kundendaten.Name}`}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            name="Email"
            id="Email"
            disabled={loading}
            className="input"
            defaultValue={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="fieldset-label">Optional</span>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Mobilfunk Nr.</legend>
          <input
            type="text"
            name="Mobil"
            id="Mobil"
            disabled={loading}
            className="input"
            defaultValue={Mobil}
            onChange={(e) => setMobil(e.target.value)}
          />
          <span className="fieldset-label">Optional</span>
        </fieldset>
        <input
          onClick={handlePrint}
          value={loading ? "Bitte warten..." : "Drucken"}
          disabled={loading}
          className="btn btn-success"
        />
      </div>
      <div className="hidden print:block" data-theme="light">
        <div className="mt-10">
          <h1 className="text-center">Microsoft Zugangsdaten</h1>
          <img
            src="/images/MS.jpg"
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

function GoogleForm() {
  // TODO: Implement
  return <></>;
}

function TelekomForm() {
  // TODO: Implement
  return <></>;
}
