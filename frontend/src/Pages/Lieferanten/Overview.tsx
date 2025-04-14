import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GetLieferanten } from "../../../wailsjs/go/main/App";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Ansprechpartner, Lieferant } from "./types";

export default function Lieferantenübersicht() {
  const [Lieferanten, setLieferanten] = useState<undefined | Lieferant[]>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      setLoading(true);
      const lieferanten: Lieferant[] = [];
      const dbRes = await GetLieferanten();
      dbRes.map((r) => {
        const found = lieferanten.find((x) => x.id == r.ID);
        if (found == undefined) {
          const ap: Ansprechpartner = {
            id: r.ID_2.String,
            lieferantenId: r.ID,
            Name: r.Name.String,
            Mail: r.Mail.Valid ? r.Mail.String : undefined,
            Mobil: r.Mobil.Valid ? r.Mobil.String : undefined,
            Telefon: r.Telefon.Valid ? r.Telefon.String : undefined,
          };
          lieferanten.push({
            Ansprechpartner: [ap],
            Firma: r.Firma,
            id: r.ID,
            Kundennummer: r.Kundennummer.Valid
              ? r.Kundennummer.String
              : undefined,
            Webseite: r.Webseite.Valid ? r.Webseite.String : undefined,
          });
        } else {
          if (r.ID_2.Valid && r.Name.Valid) {
            found.Ansprechpartner.push({
              id: r.ID_2.String,
              lieferantenId: r.ID,
              Name: r.Name.String,
              Mail: r.Mail.Valid ? r.Mail.String : undefined,
              Mobil: r.Mobil.Valid ? r.Mobil.String : undefined,
              Telefon: r.Telefon.Valid ? r.Telefon.String : undefined,
            });
          }
        }
      });

      setLieferanten(lieferanten);
      setLoading(false);
    }
    x();
  }, []);

  return (
    <>
      <BackButton href="/" />
      <h1>Lieferantenübersicht</h1>
      <Link to="/Lieferanten/Neu" className="btn btn-neutral my-4">
        Neuen Lieferanten anlegen
      </Link>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto mt-5">
          <table className="table">
            <thead>
              <tr>
                <th>Firma</th>
                <th>Kundennummer</th>
                <th>Webseite</th>
                <th>Ansprechpartner</th>
              </tr>
            </thead>
            <tbody>
              {Lieferanten?.map((lieferant) => (
                <tr>
                  <th>
                    <Link
                      to={"/Lieferanten/" + lieferant.id}
                      className="underline"
                    >
                      {lieferant.Firma}
                    </Link>
                  </th>
                  <td>{lieferant.Kundennummer}</td>
                  <td>
                    {lieferant.Webseite ? (
                      <a
                        className="underline text-error"
                        href={lieferant.Webseite}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {lieferant.Webseite}
                      </a>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>
                    <table className="table text-xs">
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {lieferant.Ansprechpartner?.map((ap) => (
                          <tr>
                            <th>{ap.Name}</th>
                            <td>
                              {ap.Telefon && ap.Telefon.length > 1 ? (
                                <a
                                  className="underline text-error"
                                  href={"tel:" + ap.Telefon}
                                >
                                  {ap.Telefon}
                                </a>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                            <td>
                              {ap.Mobil && ap.Mobil.length > 1 ? (
                                <a
                                  className="underline text-error"
                                  href={"tel:" + ap.Mobil}
                                >
                                  {ap.Mobil}
                                </a>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                            <td>
                              {ap.Mail && ap.Mail.length > 1 ? (
                                <a
                                  className="underline text-error"
                                  href={"mailto:" + ap.Mail}
                                >
                                  {ap.Mail}
                                </a>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Firma</th>
                <th>Kundennummer</th>
                <th>Webseite</th>
                <th>Ansprechpartner</th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </>
  );
}
