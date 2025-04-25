import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { GetMitarbeiter } from "../../../wailsjs/go/main/App";
import { ent } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function MitarbeiterDetails() {
  const { id } = useParams();
  const [Mitarbeiter, setMitarbeiter] = useState<undefined | ent.Mitarbeiter>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      if (id == null) return;
      setLoading(true);
      setMitarbeiter(await GetMitarbeiter(parseInt(id)));
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
                    {Mitarbeiter?.Email && (
                      <a
                        className="text-error underline"
                        href={"mailto:" + Mitarbeiter.Email}
                      >
                        {Mitarbeiter.Email}
                      </a>
                    )}
                  </div>
                </li>
              }
              {
                <li className="list-row">
                  <div></div>
                  <div>Gruppenwahl</div>
                  <div>{Mitarbeiter?.Gruppenwahl}</div>
                </li>
              }
              <li className="list-row">
                <div></div>
                <div>Interne Durchwahl</div>
                <div>
                  {Mitarbeiter?.InternTelefon1 &&
                    Mitarbeiter?.InternTelefon1.length > 0 && (
                      <p>{Mitarbeiter?.InternTelefon1}</p>
                    )}
                  {Mitarbeiter?.InternTelefon2 &&
                    Mitarbeiter?.InternTelefon2.length > 0 && (
                      <p>{Mitarbeiter?.InternTelefon2}</p>
                    )}
                </div>
              </li>
              {Mitarbeiter?.HomeOffice && Mitarbeiter.HomeOffice.length > 0 && (
                <li className="list-row">
                  <div></div>
                  <div>Homeoffice</div>
                  <div>{Mitarbeiter.HomeOffice}</div>
                </li>
              )}
              {Mitarbeiter?.FestnetzAlternativ &&
                Mitarbeiter.FestnetzAlternativ.length > 0 && (
                  <li className="list-row">
                    <div></div>
                    <div>Festnetz Geschäftlich</div>
                    <div>
                      <a
                        className="text-error underline"
                        href={"tel:%s" + Mitarbeiter.FestnetzAlternativ}
                      >
                        {Mitarbeiter.FestnetzAlternativ}
                      </a>
                    </div>
                  </li>
                )}
              {Mitarbeiter?.FestnetzPrivat &&
                Mitarbeiter.FestnetzPrivat.length > 0 && (
                  <li className="list-row">
                    <div></div>
                    <div>Festnetz Privat</div>
                    <div>
                      <a
                        className="text-error underline"
                        href={"tel:%s" + Mitarbeiter.FestnetzPrivat}
                      >
                        {Mitarbeiter.FestnetzPrivat}
                      </a>
                    </div>
                  </li>
                )}
              {Mitarbeiter?.MobilBusiness &&
                Mitarbeiter.MobilBusiness.length > 0 && (
                  <li className="list-row">
                    <div></div>
                    <div>Mobil Geschäftlich</div>
                    <div>
                      <a
                        className="text-error underline"
                        href={"tel:%s" + Mitarbeiter.MobilBusiness}
                      >
                        {Mitarbeiter.MobilBusiness}
                      </a>
                    </div>
                  </li>
                )}
              {Mitarbeiter?.MobilPrivat &&
                Mitarbeiter.MobilPrivat.length > 0 && (
                  <li className="list-row">
                    <div></div>
                    <div>Mobil Privat</div>
                    <div>
                      <a
                        className="text-error underline"
                        href={"tel:%s" + Mitarbeiter.MobilPrivat}
                      >
                        {Mitarbeiter.MobilPrivat}
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
