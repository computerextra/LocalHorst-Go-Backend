import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  DeleteMitarbeiter,
  GetMitarbeiter,
} from "../../../wailsjs/go/main/App";
import { ent } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";
import MitarbeiterForm from "./components/MitarbeiterForm";

export default function MitarbeiterBearbeiter() {
  const { id } = useParams();
  const [mitarbeiter, setMitarbeiter] = useState<ent.Mitarbeiter | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function x() {
      if (id == null) return;
      setLoading(true);
      setMitarbeiter(await GetMitarbeiter(parseInt(id)));
      setLoading(false);
    }
    x();
  }, [id]);

  const handleDelete = async () => {
    await DeleteMitarbeiter(parseInt(id!));
    localStorage.removeItem("geburtstage");
    localStorage.removeItem("geburtstag-lastsync");
    navigate("/Mitarbeiter");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <BackButton href={"/Mitarbeiter/" + id} />
      <h1>{mitarbeiter?.Name} bearbeiten</h1>
      <MitarbeiterForm mitarbeiter={mitarbeiter} />
      <div className="divider divider-error my-5">DANGER ZONE</div>
      <button className="btn btn-error mb-5" onClick={handleDelete}>
        Mitarbeiter Löschen
      </button>
    </>
  );
}
