import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GetLieferanten } from "../../../wailsjs/go/main/App";
import { db } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function Lieferantenübersicht() {
  const [Lieferanten, setLieferanten] = useState<undefined | db.Lieferant[]>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      setLoading(true);
      const dbRes = await GetLieferanten();

      setLieferanten(dbRes);
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
                      to={"/Lieferanten/" + lieferant.Id}
                      className="underline"
                    >
                      {lieferant.Firma}
                    </Link>
                  </th>
                  <td>{lieferant.Kundennummer.String}</td>
                  <td>
                    {lieferant.Webseite.Valid ? (
                      <a
                        className="underline text-error"
                        href={lieferant.Webseite.String}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {lieferant.Webseite.String}
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
                              {ap.Telefon.Valid &&
                              ap.Telefon.String.length > 1 ? (
                                <a
                                  className="underline text-error"
                                  href={"tel:" + ap.Telefon.String}
                                >
                                  {ap.Telefon.String}
                                </a>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                            <td>
                              {ap.Mobil.Valid && ap.Mobil.String.length > 1 ? (
                                <a
                                  className="underline text-error"
                                  href={"tel:" + ap.Mobil.String}
                                >
                                  {ap.Mobil.String}
                                </a>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                            <td>
                              {ap.Mail.Valid && ap.Mail.String.length > 1 ? (
                                <a
                                  className="underline text-error"
                                  href={"mailto:" + ap.Mail.String}
                                >
                                  {ap.Mail.String}
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
