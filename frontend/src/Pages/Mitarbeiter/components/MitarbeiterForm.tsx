import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UpsertMitarbeiter } from "../../../../wailsjs/go/main/App";
import { db, main } from "../../../../wailsjs/go/models";
import LoadingSpinner from "../../../Components/LoadingSpinner";

export default function MitarbeiterForm({
  mitarbeiter,
}: {
  mitarbeiter?: db.MitarbeiterModel;
}) {
  const [Name, setName] = useState<string | undefined>(undefined);
  const [Short, setShort] = useState<string | undefined>(undefined);
  const [Gruppenwahl, setGruppenwahl] = useState<string | undefined>(undefined);
  const [InternTelefon1, setInternTelefon1] = useState<string | undefined>(
    undefined
  );
  const [InternTelefon2, setInternTelefon2] = useState<string | undefined>(
    undefined
  );
  const [FestnetzAlternativ, setFestnetzAlternativ] = useState<
    string | undefined
  >(undefined);
  const [FestnetzPrivat, setFestnetzPrivat] = useState<string | undefined>(
    undefined
  );
  const [HomeOffice, setHomeOffice] = useState<string | undefined>(undefined);
  const [MobilBusiness, setMobilBusiness] = useState<string | undefined>(
    undefined
  );
  const [MobilPrivat, setMobilPrivat] = useState<string | undefined>(undefined);
  const [Email, setEmail] = useState<string | undefined>(undefined);
  const [Azubi, setAzubi] = useState<boolean | undefined>(undefined);
  const [Geburtstag, setGeburtstag] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mitarbeiter == null) return;
    setLoading(true);
    setName(mitarbeiter.Name);
    setShort(mitarbeiter.Short);
    setGruppenwahl(mitarbeiter.Gruppenwahl);
    setInternTelefon1(mitarbeiter.InternTelefon1);
    setInternTelefon2(mitarbeiter.InternTelefon2);
    setFestnetzAlternativ(mitarbeiter.FestnetzAlternativ);
    setFestnetzPrivat(mitarbeiter.FestnetzPrivat);
    setHomeOffice(mitarbeiter.HomeOffice);
    setMobilBusiness(mitarbeiter.MobilBusiness);
    setMobilPrivat(mitarbeiter.MobilPrivat);
    setEmail(mitarbeiter.Email);
    setAzubi(mitarbeiter.Azubi);
    const bday = new Date(mitarbeiter.Geburtstag);
    const dateStr =
      bday.getFullYear() +
      "-" +
      ("0" + (bday.getMonth() + 1)).slice(-2) +
      "-" +
      bday.getDate();
    setGeburtstag(dateStr);
    setLoading(false);
  }, [mitarbeiter]);

  const handleSave = async () => {
    if (Name == null) return;
    if (Name.length < 1) return;
    const params: main.MitarbeiterParams = {
      Name,
      Azubi,
      Email,
      FestnetzAlternativ,
      FestnetzPrivat,
      Geburtstag,
      HomeOffice,
      Gruppenwahl,
      InternTelefon1,
      InternTelefon2,
      MobilBusiness,
      MobilPrivat,
      Short,
    };
    await UpsertMitarbeiter(params, mitarbeiter?.id ?? "");
    navigate("/Mitarbeiter");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mt-5">
      <div className="grid grid-cols-2">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name</legend>
          <input
            type="text"
            className="input"
            name="Name"
            required
            disabled={loading}
            defaultValue={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Short</legend>
          <input
            type="text"
            className="input"
            name="Short"
            disabled={loading}
            defaultValue={Short}
            onChange={(e) => setShort(e.target.value)}
          />
          <p className="fieldset-label">Optional</p>
        </fieldset>
      </div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">E-Mail</legend>
        <input
          type="email"
          className="input"
          name="Email"
          disabled={loading}
          defaultValue={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="fieldset-label">Optional</p>
      </fieldset>
      <div className="grid grid-cols-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gruppenwahl</legend>
          <input
            type="text"
            className="input"
            name="Gruppenwahl"
            disabled={loading}
            defaultValue={Gruppenwahl}
            onChange={(e) => setGruppenwahl(e.target.value)}
          />
          <p className="fieldset-label">Optional</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Interne Durchwahl 1</legend>
          <input
            type="text"
            className="input"
            name="InternTelefon1"
            disabled={loading}
            defaultValue={InternTelefon1}
            onChange={(e) => setInternTelefon1(e.target.value)}
          />
          <p className="fieldset-label">Optional</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Interne Durchwahl 2</legend>
          <input
            type="text"
            className="input"
            name="InternTelefon2"
            disabled={loading}
            defaultValue={InternTelefon2}
            onChange={(e) => setInternTelefon2(e.target.value)}
          />
          <p className="fieldset-label">Optional</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Home Office</legend>
          <input
            type="text"
            className="input"
            name="HomeOffice"
            disabled={loading}
            defaultValue={HomeOffice}
            onChange={(e) => setHomeOffice(e.target.value)}
          />
          <p className="fieldset-label">Optional</p>
        </fieldset>
      </div>
      <div className="grid grid-cols-2">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Private Telefonnummer</legend>
          <input
            type="text"
            className="input"
            name="FestnetzPrivat"
            disabled={loading}
            defaultValue={FestnetzPrivat}
            onChange={(e) => setFestnetzPrivat(e.target.value)}
          />
          <p className="fieldset-label">Optional</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">
            Geschäftliche Telefonnummer
          </legend>
          <input
            type="text"
            className="input"
            name="FestnetzAlternativ"
            disabled={loading}
            defaultValue={FestnetzAlternativ}
            onChange={(e) => setFestnetzAlternativ(e.target.value)}
          />
          <p className="fieldset-label">Optional</p>
        </fieldset>
      </div>
      <div className="grid grid-cols-2">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Private Handynummer</legend>
          <input
            type="text"
            className="input"
            name="MobilPrivat"
            disabled={loading}
            defaultValue={MobilPrivat}
            onChange={(e) => setMobilPrivat(e.target.value)}
          />
          <p className="fieldset-label">Optional</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Geschäftliche Handynummer</legend>
          <input
            type="text"
            className="input"
            name="MobilBusiness"
            disabled={loading}
            defaultValue={MobilBusiness}
            onChange={(e) => setMobilBusiness(e.target.value)}
          />
          <p className="fieldset-label">Optional</p>
        </fieldset>
      </div>
      <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64">
        <legend className="fieldset-legend">
          Ist dieser Mitarbeiter ein Azubi?
        </legend>
        <label className="fieldset-label">
          <input
            type="checkbox"
            name="Azubi"
            className="toggle"
            disabled={loading}
            defaultChecked={Azubi}
            onChange={(e) => setAzubi(e.target.checked)}
          />
          Azubi
        </label>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Geburtstag</legend>
        <input
          type="date"
          className="input"
          name="Geburtstag"
          disabled={loading}
          defaultValue={Geburtstag}
          onChange={(e) => setGeburtstag(e.target.value)}
        />
        <p className="fieldset-label">Optional</p>
      </fieldset>
      <input
        disabled={loading}
        onClick={handleSave}
        type="submit"
        value={loading ? "Speichert..." : "Speichern"}
        className="btn btn-success"
      />
    </form>
  );
}
