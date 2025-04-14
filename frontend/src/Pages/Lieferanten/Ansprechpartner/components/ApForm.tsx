import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UpsertAnsprechpartner } from "../../../../../wailsjs/go/main/App";
import { db, main } from "../../../../../wailsjs/go/models";

export default function AnsprechpartnerForm({
  id,
  ap,
}: {
  id: string;
  ap?: db.Anschprechpartner;
}) {
  const [Name, setName] = useState<string | undefined>(undefined);
  const [Telefon, setTelefon] = useState<string | undefined>(undefined);
  const [Mobil, setMobil] = useState<string | undefined>(undefined);
  const [Mail, setMail] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (ap == null) return;

    setName(ap.Name);
    setTelefon(ap.Telefon.Valid ? ap.Telefon.String : undefined);
    setMobil(ap.Mobil.Valid ? ap.Mobil.String : undefined);
    setMail(ap.Mail.Valid ? ap.Mail.String : undefined);
  }, [ap]);

  const handleSave = async () => {
    if (Name == null) return;
    if (Name.length < 1) return;
    setLoading(true);
    const params: main.AnsprechpartnerParams = {
      Name,
      Mail,
      Mobil,
      Telefon,
    };
    await UpsertAnsprechpartner(id, ap?.ID ?? "", params);

    navigate("/Lieferanten/" + id);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4 my-5">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Name</legend>
        <input
          type="text"
          required
          name="Name"
          className="input"
          defaultValue={Name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Telefon</legend>
        <input
          type="text"
          name="Telefon"
          className="input"
          defaultValue={Telefon}
          onChange={(e) => setTelefon(e.target.value)}
          disabled={loading}
        />
        <p className="fieldset-label">Optional</p>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Mobil</legend>
        <input
          type="text"
          name="Mobil"
          className="input"
          defaultValue={Mobil}
          onChange={(e) => setMobil(e.target.value)}
          disabled={loading}
        />
        <p className="fieldset-label">Optional</p>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Mail</legend>
        <input
          type="text"
          name="Mail"
          className="input"
          defaultValue={Mail}
          onChange={(e) => setMail(e.target.value)}
          disabled={loading}
        />
        <p className="fieldset-label">Optional</p>
      </fieldset>
      <input
        type="submit"
        onClick={handleSave}
        value={loading ? "Speichert..." : "Speichern"}
        className="btn btn-success"
      />
    </form>
  );
}
