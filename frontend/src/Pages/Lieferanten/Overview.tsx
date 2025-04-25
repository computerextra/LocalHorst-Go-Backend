import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GetLieferanten } from "../../../wailsjs/go/main/App";
import { main } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function Lieferantenübersicht() {
  const [Lieferanten, setLieferanten] = useState<undefined | main.Lieferant[]>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      setLoading(true);

      let dbRes: main.Lieferant[] = [];

      const today = new Date();
      const localData = localStorage.getItem("lieferanten");
      const lastUpdate = localStorage.getItem("lieferanten-lastsync");
      if (localData != null && lastUpdate != null) {
        const date = new Date(JSON.parse(lastUpdate));
        const diff = Math.trunc(
          //   @ts-expect-error Das geht!
          Math.round(today - date) / (1000 * 60 * 60 * 24)
        );
        if (diff < 30) {
          dbRes = JSON.parse(localData);
        } else {
          dbRes = await GetLieferanten();
          localStorage.setItem("lieferanten", JSON.stringify(dbRes));
          localStorage.setItem(
            "lieferanten-lastsync",
            JSON.stringify(new Date())
          );
        }
      } else {
        dbRes = await GetLieferanten();
        localStorage.setItem("lieferanten", JSON.stringify(dbRes));
        localStorage.setItem(
          "lieferanten-lastsync",
          JSON.stringify(new Date())
        );
      }

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
                <tr key={lieferant.id}>
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
                    {lieferant.Webseite && lieferant.Webseite.length > 0 ? (
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
                          <tr key={ap.id}>
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
