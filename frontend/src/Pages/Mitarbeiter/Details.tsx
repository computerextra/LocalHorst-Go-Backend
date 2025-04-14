import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { GetMitarbeiter } from "../../../wailsjs/go/main/App";
import { db } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function MitarbeiterDetails() {
  const { id } = useParams();
  const [Mitarbeiter, setMitarbeiter] = useState<
    undefined | db.GetMitarbeiterRow
  >(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      if (id == null) return;
      setLoading(true);
      setMitarbeiter(await GetMitarbeiter(id));
      setLoading(false);
    }
    x();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <BackButton href="/Mitarbeiter" />
      <div className="card w-150 bg-base-100 card-xl shadow-sm mt-5">
        <div className="card-body">
          <h2 className="card-title">{Mitarbeiter?.Name}</h2>
          <div className="overflow-x-auto">
            <ul className="list bg-base-100 rounded-box shadow-md">
              {
                <li className="list-row">
                  <div></div>
                  <div>Email</div>
                  <div>
                    {Mitarbeiter?.Email.Valid && (
                      <a
                        className="text-error underline"
                        href={"mailto:" + Mitarbeiter.Email}
                      >
                        {Mitarbeiter.Email.String}
                      </a>
                    )}
                  </div>
                </li>
              }
              {
                <li className="list-row">
                  <div></div>
                  <div>Gruppenwahl</div>
                  <div>{Mitarbeiter?.Gruppenwahl.String}</div>
                </li>
              }
              <li className="list-row">
                <div></div>
                <div>Interne Durchwahl</div>
                <div>
                  {Mitarbeiter?.Interntelefon1.Valid && (
                    <p>{Mitarbeiter?.Interntelefon1.String}</p>
                  )}
                  {Mitarbeiter?.Interntelefon2.Valid && (
                    <p>{Mitarbeiter?.Interntelefon2.String}</p>
                  )}
                </div>
              </li>
              {Mitarbeiter?.Homeoffice.Valid && (
                <li className="list-row">
                  <div></div>
                  <div>Homeoffice</div>
                  <div>{Mitarbeiter.Homeoffice.String}</div>
                </li>
              )}
              {Mitarbeiter?.Festnetzalternativ.Valid && (
                <li className="list-row">
                  <div></div>
                  <div>Festnetz Geschäftlich</div>
                  <div>
                    <a
                      className="text-error underline"
                      href={"tel:%s" + Mitarbeiter.Festnetzalternativ.String}
                    >
                      {Mitarbeiter.Festnetzalternativ.String}
                    </a>
                  </div>
                </li>
              )}
              {Mitarbeiter?.Festnetzprivat.Valid && (
                <li className="list-row">
                  <div></div>
                  <div>Festnetz Privat</div>
                  <div>
                    <a
                      className="text-error underline"
                      href={"tel:%s" + Mitarbeiter.Festnetzprivat.String}
                    >
                      {Mitarbeiter.Festnetzprivat.String}
                    </a>
                  </div>
                </li>
              )}
              {Mitarbeiter?.Mobilbusiness.Valid && (
                <li className="list-row">
                  <div></div>
                  <div>Mobil Geschäftlich</div>
                  <div>
                    <a
                      className="text-error underline"
                      href={"tel:%s" + Mitarbeiter.Mobilbusiness.String}
                    >
                      {Mitarbeiter.Mobilbusiness.String}
                    </a>
                  </div>
                </li>
              )}
              {Mitarbeiter?.Mobilprivat.Valid && (
                <li className="list-row">
                  <div></div>
                  <div>Mobil Privat</div>
                  <div>
                    <a
                      className="text-error underline"
                      href={"tel:%s" + Mitarbeiter.Mobilprivat.String}
                    >
                      {Mitarbeiter.Mobilprivat.String}
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className="justify-end card-actions">
            <Link
              to={`/Mitarbeiter/${id}/Bearbeiten`}
              className="btn btn-primary"
            >
              Bearbeiten
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
