import { useState } from "react";
import { SearchSage } from "../../wailsjs/go/main/App";
import { main } from "../../wailsjs/go/models";
import BackButton from "../Components/BackButton";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function KundenSuche() {
  const [results, setResults] = useState<undefined | main.Sg_Adressen[]>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<undefined | string>(undefined);

  const search = async () => {
    if (searchTerm == null) return;
    if (searchTerm.length < 1) return;

    setLoading(true);
    const res = await SearchSage(searchTerm);
    if (res == null) setResults([]);
    else setResults(res);
    setLoading(false);
  };

  return (
    <>
      <BackButton href="/" />
      <h1>Sage Kundensuche</h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mt-5">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Suchbegriff</legend>

          <input
            type="text"
            className="input"
            name="search"
            disabled={loading}
            defaultValue={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <p className="fieldset-label">
            Suche nach Kundennummer, Name oder Telefonnummer
          </p>
        </fieldset>
        <input
          type="submit"
          className="btn btn-neutral"
          onClick={search}
          disabled={loading}
          value={loading ? "Sucht..." : "Suchen"}
        />
      </form>
      {loading && <LoadingSpinner />}
      {!loading && results?.length == 0 && <h2>Keine Ergebnisse!</h2>}
      {!loading && results && results.length > 0 && (
        <>
          <h2>{results?.length} Ergebisse</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Lieferant / Kunde</th>
                  <th>Suchbegriff</th>
                  <th>Kundennummer</th>
                  <th>Telefon 1</th>
                  <th>Telefon 2</th>
                  <th>Mobil 1</th>
                  <th>Mobil 2</th>
                  <th>Email 1</th>
                  <th>Email 2</th>
                  <th>Umsatz</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res) => (
                  <tr
                    className={
                      res.LiefNr.Valid && res.LiefNr.String.length > 0
                        ? "bg-base-200"
                        : ""
                    }
                  >
                    <th>
                      {res.KundNr.Valid && res.KundNr.String.length > 0 && (
                        <span className="text-success">Kunde</span>
                      )}
                      {res.LiefNr.Valid && res.LiefNr.String.length > 0 && (
                        <span className="text-info">Lieferant</span>
                      )}
                    </th>
                    <th>{res.Suchbegriff.String}</th>
                    <td>
                      {res.KundNr.Valid && res.KundNr.String}
                      {res.LiefNr.Valid && res.LiefNr.String}
                    </td>
                    <td>
                      {res.Telefon1.Valid ? (
                        <a
                          href={"tel:" + res.Telefon1.String}
                          className="underline text-error"
                        >
                          {res.Telefon1.String}
                        </a>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      {res.Telefon2.Valid ? (
                        <a
                          href={"tel:" + res.Telefon2.String}
                          className="underline text-error"
                        >
                          {res.Telefon2.String}
                        </a>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      {res.Mobiltelefon1.Valid ? (
                        <a
                          href={"tel:" + res.Mobiltelefon1.String}
                          className="underline text-error"
                        >
                          {res.Mobiltelefon1.String}
                        </a>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      {res.Mobiltelefon2.Valid ? (
                        <a
                          href={"tel:" + res.Mobiltelefon2.String}
                          className="underline text-error"
                        >
                          {res.Mobiltelefon2.String}
                        </a>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      {res.EMail1.Valid ? (
                        <a href={"mailto:" + res.EMail1.String}>
                          {res.EMail1.String}
                        </a>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      {res.EMail2.Valid ? (
                        <a href={"mailto:" + res.EMail2.String}>
                          {res.EMail2.String}
                        </a>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      {res.KundNr.Valid && res.KundUmsatz.Valid && (
                        <>{res.KundUmsatz.Float64.toFixed(2)} €</>
                      )}
                      {res.LiefNr.Valid && res.LiefUmsatz.Valid && (
                        <>{res.LiefUmsatz.Float64.toFixed(2)} €</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
