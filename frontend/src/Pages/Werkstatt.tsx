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
  const [Lizenz, setLizenz] = useState<string | undefined>(undefined);
  const [Gerätenummer, setGerätenummer] = useState<string | undefined>(
    undefined
  );

  const handlePrint = () => window.print();
  return (
    <>
      <div className="print:hidden">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Lizenz</legend>
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
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gerätenummer</legend>
          <input
            type="text"
            name="Gerätenummer"
            id="Gerätenummer"
            required
            defaultValue={Gerätenummer}
            onChange={(e) => setGerätenummer(e.target.value)}
            className="input"
          />
        </fieldset>
        <input
          onClick={handlePrint}
          value="Drucken"
          className="btn btn-success"
        />
      </div>
      <div className="hidden print:block" data-theme="light">
        <div className="mt-24">
          <h1 className="text-center">
            AOMEI Backupper Pro
            <br />
            für 2 Computer
          </h1>
          <img
            src="/images/LOGO2.png"
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

function AppleForm() {
  const [Benutzername, setBenutzername] = useState<string | undefined>(
    undefined
  );
  const [Passwort, setPasswort] = useState<string | undefined>(undefined);
  const [Kundennummer, setKundennummer] = useState<string | undefined>(
    undefined
  );

  const [Kundendaten, setKundendaten] = useState<undefined | main.User>();

  useEffect(() => {
    async function x() {
      if (Kundennummer == null) return;
      if (Kundennummer.length < 7) return;

      setKundendaten(await GetKunde(Kundennummer));
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
            required
            className="input"
            defaultValue={Kundennummer}
            onChange={(e) => setKundennummer(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Kundennummer</legend>
          <input
            type="text"
            name="Kundennummer"
            id="Kundennummer"
            required
            className="input"
            disabled
            value={Kundendaten && `${Kundendaten.Vorname} ${Kundendaten.Name}`}
          />
        </fieldset>
        <input
          onClick={handlePrint}
          value="Drucken"
          className="btn btn-success"
        />
      </div>
      <div className="hidden print:block" data-theme="light">
        <div className="mt-24">
          <h1 className="text-center">Apple ID Zugangsdaten</h1>
          <img
            src="/images/Apple_logo_black.svg.png"
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
          />
          <div className="text-center">
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
            <div className="max-w-[40%] mx-auto mt-8">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, wenn Sie sich erneut bei Apple anmelden möchten.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
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
  const [Kundendaten, setKundendaten] = useState<undefined | main.User>();
  const [Kundennummer, setKundennummer] = useState<undefined | string>(
    undefined
  );
  const [Benutzername, setBenutzername] = useState<undefined | string>(
    undefined
  );
  const [Passwort, setPasswort] = useState<undefined | string>(undefined);

  useEffect(() => {
    async function x() {
      if (Kundennummer == null) return;
      if (Kundennummer.length < 7) return;

      setKundendaten(await GetKunde(Kundennummer));
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
            defaultValue={Benutzername}
            onChange={(e) => setBenutzername(e.target.value)}
            required
            className="input"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Passwort</legend>
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
          <legend className="fieldset-legend">Kundennummer</legend>
          <input
            type="text"
            name="Kundennummer"
            id="Kundennummer"
            defaultValue={Kundennummer}
            onChange={(e) => setKundennummer(e.target.value)}
            required
            className="input"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Kundenname</legend>
          <input
            type="text"
            name="Kundenname"
            value={Kundendaten && `${Kundendaten.Vorname} ${Kundendaten.Name}`}
            disabled
            required
            className="input"
          />
        </fieldset>
        <input
          onClick={handlePrint}
          value="Drucken"
          className="btn btn-success"
        />
      </div>
      <div className="hidden print:block" data-theme="light">
        <div className="mt-24">
          <h1 className="text-center">Google Zugangsdaten</h1>
          <img
            src="/images/Google__G__logo.svg.png"
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
          />
          <div className="text-center">
            <p id="print-p1">
              <b>Kundennummer:</b>
              <br />
              {Kundennummer}
            </p>
            <p id="print-p2">
              <b>Name:</b>
              <br />
              {Kundendaten?.Vorname}
              {""}
              {Kundendaten?.Name}
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
            <div className="max-w-[40%] mx-auto mt-8">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, wenn Sie sich erneut bei Google anmelden möchten.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TelekomForm() {
  const [Benutzername, setBenutzername] = useState<string | undefined>(
    undefined
  );
  const [Passwort, setPasswort] = useState<string | undefined>(undefined);
  const [Kundennummer, setKundennummer] = useState<string | undefined>(
    undefined
  );

  const [Mobil, setMobil] = useState<string | undefined>(undefined);
  const [Antwort, setAntwort] = useState<string | undefined>(undefined);
  const [Geburtstag, setGeburtstag] = useState<string | undefined>(undefined);
  const [Sicherheitsfrage, setSicherheitsfrage] = useState<string>(
    "Wie heißt die Antwort auf die Frage aller Fragen?"
  );
  const [Kundendaten, setKundendaten] = useState<undefined | main.User>();

  useEffect(() => {
    async function x() {
      if (Kundennummer == null) return;
      if (Kundennummer.length < 7) return;

      setKundendaten(await GetKunde(Kundennummer));
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
            required
            className="input"
            defaultValue={Kundennummer}
            onChange={(e) => setKundennummer(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Kundennummer</legend>
          <input
            type="text"
            name="Kundennummer"
            id="Kundennummer"
            required
            className="input"
            disabled
            value={Kundendaten && `${Kundendaten.Vorname} ${Kundendaten.Name}`}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Sicherheitsfrage</legend>
          <select
            className="select"
            required
            name="Sicherheitsfrage"
            id="Sicherheitsfrage"
            defaultValue={"Wie heißt die Antwort auf die Frage aller Fragen?"}
            onChange={(e) => setSicherheitsfrage(e.target.value)}
          >
            <option value="Wie lautet der Beruf Ihres Großvaters?">
              Wie lautet der Beruf Ihres Großvaters?
            </option>
            <option value="Wo haben Sie Ihren Partner kennengelernt?">
              Wo haben Sie Ihren Partner kennengelernt?
            </option>
            <option value="Wie lautet der Name Ihrer Grundschule?">
              Wie lautet der Name Ihrer Grundschule?
            </option>
            <option value="Wie lautet Ihre Lieblingsfigur aus der Geschichte?">
              Wie lautet Ihre Lieblingsfigur aus der Geschichte?
            </option>
            <option value="Wie lautet der Name Ihrer Grundschule?">
              Wie lautet der Name Ihrer Grundschule?
            </option>
            <option value="Was ist Ihr Lieblingshobby?">
              Was ist Ihr Lieblingshobby?
            </option>
            <option value="Wie lautet der Geburtsname Ihrer Mutter?">
              Wie lautet der Geburtsname Ihrer Mutter?
            </option>
            <option value="Welche ist Ihre Lieblingsmannschaft?">
              Welche ist Ihre Lieblingsmannschaft?
            </option>
            <option value="Was war Ihr erstes Auto?">
              Was war Ihr erstes Auto?
            </option>
            <option value="Wie hieß der beste Freund aus Ihrer Kindheit?">
              Wie hieß der beste Freund aus Ihrer Kindheit?
            </option>
            <option value="Wie heißt oder hieß Ihr erstes Haustier?">
              Wie heißt oder hieß Ihr erstes Haustier?
            </option>
            <option value="Wie ist der Name Ihres Lieblingslehrers?">
              Wie ist der Name Ihres Lieblingslehrers?
            </option>
            <option value="Wie hieß der Titel Ihres ersten Musik-Albums?">
              Wie hieß der Titel Ihres ersten Musik-Albums?
            </option>
            <option value="Was war Ihr erstes Faschingskostüm?">
              Was war Ihr erstes Faschingskostüm?
            </option>
            <option value="Wie hieß Ihr erstes Buch?">
              Wie hieß Ihr erstes Buch?
            </option>
            <option value="Wie hieß Ihr erstes Plüschtier?">
              Wie hieß Ihr erstes Plüschtier?
            </option>
            <option value="Wo waren Sie bei Ihrem ersten Kuss?">
              Wo waren Sie bei Ihrem ersten Kuss?
            </option>
            <option value="Was war Ihr schönstes Weihnachtsgeschenk?">
              Was war Ihr schönstes Weihnachtsgeschenk?
            </option>
            <option value="Wie heißt die Antwort auf die Frage aller Fragen?">
              Wie heißt die Antwort auf die Frage aller Fragen?
            </option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Antwort</legend>
          <input
            type="text"
            name="Antwort"
            id="Antwort"
            required
            className="input"
            defaultValue={Antwort}
            onChange={(e) => setAntwort(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Mobilfunk Nummer</legend>
          <input
            type="text"
            name="Mobilfunk"
            id="Mobilfunk"
            required
            className="input"
            defaultValue={Mobil}
            onChange={(e) => setMobil(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Geburtstag</legend>
          <input
            type="date"
            className="input"
            name="Geburtstag"
            id="Geburtstag"
            required
            defaultValue={Geburtstag}
            onChange={(e) => setGeburtstag(e.target.value)}
          />
        </fieldset>
        <input
          onClick={handlePrint}
          value="Drucken"
          className="btn btn-success"
        />
      </div>
      <div className="hidden print:block" data-theme="light">
        <div className="mt-24">
          <h1 className="text-center">Telekom E-Mail Zugangsdaten</h1>
          <img
            src="/images/TELEKOM.jpg"
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
          />
          <div className="text-center">
            <p id="print-p1">
              Für: <br />
              {Kundennummer} - {Kundendaten?.Vorname} {Kundendaten?.Name} <br />
              <b>Benutzername:</b>
              <br />
              {Benutzername} <br />
              <b>Passwort:</b>
              <br />
              {Passwort} <br />
              <b>Mobilfunk:</b>
              <br />
              {Mobil} <br />
              <b>Geburtstag:</b>
              <br />
              {new Date(Geburtstag!).toLocaleDateString("de-DE")} <br />
              <b>Sicherheitsfrage:</b>
              <br />
              {Sicherheitsfrage} <br />
              <b>Antwort:</b> {Antwort}
            </p>
            <div className="max-w-[40%] mx-auto mt-4">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, wenn Sie sich erneut bei Telekom anmelden möchten.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
