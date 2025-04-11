import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GetEinkaufsListe } from "../../../wailsjs/go/main/App";
import { db } from "../../../wailsjs/go/models";
import LoadingSpinner from "../../Components/LoadingSpinner";
import EinkaufCard from "./components/EinkaufCard";

export default function Einkaufsliste() {
  const [liste, setListe] = useState<undefined | db.EinkaufModel[]>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      setLoading(true);
      const res = await GetEinkaufsListe();
      setListe(res);
      setLoading(false);
    }
    x();
  }, []);

  return (
    <>
      <h1 className="print:!hidden">Einkaufsliste</h1>
      <h1 className="hidden print:block">An Post / Milch und Kaffee denken!</h1>
      <div className="flex justify-between print:!hidden">
        <a
          href="https://www.edeka.de/markt-id/10001842/prospekt/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn  my-6 btn-primary"
        >
          Edeka Blättchen
        </a>
        <button className="btn my-6 btn-primary" onClick={() => window.print()}>
          Liste Drucken
        </button>
        <Link to="/Einkauf/Auswahl" className="btn  my-6 btn-primary">
          Eingeben
        </Link>
        <Link to="/Einkauf/Abrechnung" className="btn  my-6 btn-secondary">
          PayPal Abrechnung
        </Link>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-5 mt-5 print:mb-0 print:mt-0 print:block">
          {liste?.map((einkauf) => (
            <EinkaufCard einkauf={einkauf} />
          ))}
        </div>
      )}
    </>
  );
}
