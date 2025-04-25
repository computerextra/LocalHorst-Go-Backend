import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  DeleteAnsprechpartner,
  GetAnsprechpartner,
} from "../../../../wailsjs/go/main/App";
import { ent } from "../../../../wailsjs/go/models";
import BackButton from "../../../Components/BackButton";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import AnsprechpartnerForm from "./components/ApForm";

export default function ApDetails() {
  const { id, lid } = useParams();
  const [lieferant, setLieferant] = useState<undefined | ent.Ansprechpartner>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function x() {
      if (lid == null) return;
      setLoading(true);
      setLieferant(await GetAnsprechpartner(parseInt(lid)));
      setLoading(false);
    }
    x();
  }, [lid]);

  const handleDelete = async () => {
    if (lid == null) return;
    localStorage.removeItem("lieferanten");
    localStorage.removeItem("lieferanten-lastsync");
    await DeleteAnsprechpartner(parseInt(lid));
    navigate("/Lieferanten/" + id);
  };

  return (
    <>
      <BackButton href={"/Lieferanten/" + id} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>{lieferant?.Name} bearbeiten</h1>
          <AnsprechpartnerForm id={parseInt(id!)} ap={lieferant} />
          <div className="divider divider-error my-5">DANGER ZONE</div>
          <button className="btn btn-error" onClick={handleDelete}>
            Ansprechpartner Löschen
          </button>
        </>
      )}
    </>
  );
}
