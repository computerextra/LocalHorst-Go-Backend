import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { GetLieferant } from "../../../wailsjs/go/main/App";
import { db } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function LieferantDetails() {
  const { id } = useParams();
  const [Lieferant, setLieferant] = useState<db.Lieferant | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      if (id == null) return;
      setLoading(true);
      const lieferanten = await GetLieferant(id);
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
          <p>Webseite: {Lieferant?.Kundennummer.String}</p>
          <p>
            Webseite:{" "}
            <a
              href={Lieferant?.Webseite.String}
              target="_blank"
              className="underline text-error"
              rel="noopener noreferrer"
            >
              {Lieferant?.Webseite.String}
            </a>
          </p>
          <Link
            to={`/Lieferanten/${Lieferant?.Id}/edit`}
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
                        to={`/Lieferanten/${Lieferant.Id}/${ap.Id}`}
                        className="underline"
                      >
                        {ap.Name}
                      </Link>
                    </th>
                    <td>
                      {ap.Telefon.Valid && ap.Telefon.String.length > 1 && (
                        <a
                          href={"tel:" + ap.Telefon.String}
                          className="underline text-error"
                        >
                          {ap.Telefon.String}
                        </a>
                      )}
                    </td>
                    <td>
                      {ap.Mobil.Valid && ap.Mobil.String.length > 1 && (
                        <a
                          href={"tel:" + ap.Mobil.String}
                          className="underline text-error"
                        >
                          {ap.Mobil.String}
                        </a>
                      )}
                    </td>
                    <td>
                      {ap.Mail.Valid && ap.Mail.String.length > 1 && (
                        <a
                          className="underline text-error"
                          href={"mailto:" + ap.Mail.String}
                        >
                          {ap.Mail.String}
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link
              className="btn btn-neutral my-4"
              to={`/Lieferanten/${Lieferant?.Id}/Neu`}
            >
              Neuen Ansprechparner anlegen
            </Link>
          </div>
        </>
      )}
    </>
  );
}
