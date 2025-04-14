import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UpsertLieferant } from "../../../../wailsjs/go/main/App";
import { main } from "../../../../wailsjs/go/models";
import { Lieferant } from "../types";

export default function LieferantenForm({
  lieferant,
}: {
  lieferant?: Lieferant;
}) {
  const [Firma, setFirma] = useState<string | undefined>(undefined);
  const [Kundennummer, setKundennummer] = useState<string | undefined>(
    undefined
  );
  const [Website, setWebsite] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (lieferant == null) return;
    setLoading(true);
    setFirma(lieferant.Firma);
    setKundennummer(lieferant.Kundennummer);
    setWebsite(lieferant.Webseite);
    setLoading(false);
  }, [lieferant]);

  const onSave = async () => {
    if (Firma == null) return;
    if (Firma.length < 1) return;
    const params: main.LieferantenParams = {
      Firma,
      Kundennummer,
      Webseite: Website,
    };
    const res = await UpsertLieferant(params, lieferant?.id ?? "");
    if (res) {
      navigate("/Lieferanten");
    } else {
      alert("Server Fehler beim Speichern des Lieferanten");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4 my-5">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Firma</legend>
        <input
          type="text"
          required
          name="Firma"
          className="input"
          disabled={loading}
          defaultValue={Firma}
          onChange={(e) => setFirma(e.target.value)}
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Kundennummer</legend>
        <input
          type="text"
          name="Kundennummer"
          className="input"
          disabled={loading}
          defaultValue={Kundennummer}
          onChange={(e) => setKundennummer(e.target.value)}
        />
        <p className="fieldset-label">Optional</p>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Webseite</legend>
        <input
          type="text"
          name="Webseite"
          className="input"
          disabled={loading}
          defaultValue={Website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <p className="fieldset-label">Optional</p>
      </fieldset>
      <input
        type="submit"
        value={loading ? "Speichert..." : "Speichern"}
        className="btn btn-success"
        onClick={onSave}
      />
    </form>
  );
}
