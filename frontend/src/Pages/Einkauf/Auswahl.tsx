import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GetAllMitarbeiter } from "../../../wailsjs/go/main/App";
import { ent } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { getUser } from "../../hooks/funcs";

export default function EinkaufAuswahl() {
  const [mitarbeiter, setMitarbeiter] = useState<ent.Mitarbeiter[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    async function x() {
      setLoading(true);
      const res = await GetAllMitarbeiter();
      setMitarbeiter(res);
      setLoading(false);
      const user = getUser();
      if (user != null) {
        navigate(`/Einkauf/${user.id}`);
      }
    }
    x();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    if (id == null) return;
    navigate(`/Einkauf/${id}`);
  };

  return (
    <>
      <BackButton href="/Einkauf" />
      <h1 className="my-5">Einkauf</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <a
            href="https://www.edeka.de/markt-id/10001842/prospekt/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Edeka Blättchen
          </a>
          <form onSubmit={(e) => e.preventDefault()} className="mt-5 space-y-4">
            <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
              <select
                className="select"
                onChange={(e) => setId(e.target.value)}
                defaultValue={""}
              >
                <option disabled value={""}>
                  Bitte wählen...
                </option>
                {mitarbeiter?.map((x) => (
                  <option value={x.id} key={x.id}>
                    {x.Name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Weiter
              </button>
            </fieldset>
          </form>
        </>
      )}
    </>
  );
}
