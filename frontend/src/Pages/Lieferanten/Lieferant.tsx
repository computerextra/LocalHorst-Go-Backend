import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { GetLieferant } from "../../../wailsjs/go/main/App";
import { main } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function LieferantDetails() {
  const { id } = useParams();
  const [Lieferant, setLieferant] = useState<main.Lieferant | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      if (id == null) return;
      setLoading(true);
      const lieferanten = await GetLieferant(parseInt(id));
      setLieferant(lieferanten);
      setLoading(false);
    }
    x();
  }, [id]);

  return (
    <>
      <BackButton href="/Lieferanten" />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="mt-5">{Lieferant?.Firma}</h1>
          <p>Webseite: {Lieferant?.Kundennummer}</p>
          <p>
            Webseite:{" "}
            <a
              href={Lieferant?.Webseite}
              target="_blank"
              className="underline text-error"
              rel="noopener noreferrer"
            >
              {Lieferant?.Webseite}
            </a>
          </p>
          <Link
            to={`/Lieferanten/${Lieferant?.id}/edit`}
            className="btn btn-neutral my-4"
          >
            Lieferant bearbeiten
          </Link>
          <h2 className="mt-5">Ansprechparner</h2>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Telefon</th>
                  <th>Mobil</th>
                  <th>Mail</th>
                </tr>
              </thead>
              <tbody>
                {Lieferant?.Ansprechpartner?.map((ap) => (
                  <tr className="hover:bg-base-300">
                    <th>
                      <Link
                        to={`/Lieferanten/${Lieferant.id}/${ap.id}`}
                        className="underline"
                      >
                        {ap.Name}
                      </Link>
                    </th>
                    <td>
                      {ap.Telefon && ap.Telefon.length > 1 && (
                        <a
                          href={"tel:" + ap.Telefon}
                          className="underline text-error"
                        >
                          {ap.Telefon}
                        </a>
                      )}
                    </td>
                    <td>
                      {ap.Mobil && ap.Mobil.length > 1 && (
                        <a
                          href={"tel:" + ap.Mobil}
                          className="underline text-error"
                        >
                          {ap.Mobil}
                        </a>
                      )}
                    </td>
                    <td>
                      {ap.Mail && ap.Mail.length > 1 && (
                        <a
                          className="underline text-error"
                          href={"mailto:" + ap.Mail}
                        >
                          {ap.Mail}
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link
              className="btn btn-neutral my-4"
              to={`/Lieferanten/${Lieferant?.id}/Neu`}
            >
              Neuen Ansprechparner anlegen
            </Link>
          </div>
        </>
      )}
    </>
  );
}
