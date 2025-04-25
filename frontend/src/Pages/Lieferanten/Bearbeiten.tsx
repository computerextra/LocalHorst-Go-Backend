import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DeleteLieferant, GetLieferant } from "../../../wailsjs/go/main/App";
import { ent } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";
import LieferantenForm from "./components/LieferantenForm";

export default function LieferantBearbeiten() {
  const { id } = useParams();
  const [lieferant, setLieferant] = useState<undefined | ent.Lieferant>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function x() {
      if (id == null) return;
      setLoading(true);
      setLieferant(await GetLieferant(parseInt(id)));
      setLoading(false);
    }
    x();
  }, [id]);

  const handleDelete = async () => {
    if (id == null) return;
    localStorage.removeItem("lieferanten");
    localStorage.removeItem("lieferanten-lastsync");
    const res = await DeleteLieferant(parseInt(id));
    if (res) {
      navigate("/Lieferanten");
    } else {
      alert("Fehler beim Löschen des Lieferanten");
    }
  };

  return (
    <>
      <BackButton href={`/Lieferanten/${id}`} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>Lieferant {lieferant?.Firma} bearbeiten</h1>
          <LieferantenForm lieferant={lieferant} />
          <div className="divider divider-error my-5">DANGER ZONE</div>
          <button className="btn btn-error" onClick={handleDelete}>
            Lieferant löschen
          </button>
        </>
      )}
    </>
  );
}
