import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GetAllMitarbeiter } from "../../../wailsjs/go/main/App";
import { ent } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function Mitarbeiterübersicht() {
  const [Mitarbeiter, setMitarbeiter] = useState<undefined | ent.Mitarbeiter[]>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      setLoading(true);
      setMitarbeiter(await GetAllMitarbeiter());
      setLoading(false);
    }
    x();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <BackButton href="/" />
      <h1>Mitarbeiter</h1>
      <Link to="/Mitarbeiter/Neu" className="btn btn-primary my-5">
        Neuer Mitarbeiter
      </Link>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gruppe</th>
              <th>Interne Durchwahl 1</th>
              <th>Interne Durchwahl 2</th>
              <th>Festnetz Alternativ</th>
              <th>Festnetz Privat</th>
              <th>Homeoffice</th>
              <th>Mobil Business</th>
              <th>Mobil Privat</th>
              <th>Azubi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Mitarbeiter?.map((mitarbeiter) => (
              <tr key={mitarbeiter.id}>
                <th>
                  <Link
                    to={"/Mitarbeiter/" + mitarbeiter.id}
                    className="underline"
                  >
                    {mitarbeiter.Name}
                  </Link>
                </th>
                <td>
                  {mitarbeiter.Email && (
                    <a
                      className="text-error underline"
                      href={"mailto:" + mitarbeiter.Email}
                    >
                      {mitarbeiter.Email}
                    </a>
                  )}
                </td>
                <td>{mitarbeiter.Gruppenwahl}</td>
                <td>{mitarbeiter.InternTelefon1}</td>
                <td>{mitarbeiter.InternTelefon2}</td>
                <td>
                  {mitarbeiter.FestnetzAlternativ && (
                    <a
                      className="text-error underline"
                      href={"tel:" + mitarbeiter.FestnetzAlternativ}
                    >
                      {mitarbeiter.FestnetzAlternativ}
                    </a>
                  )}
                </td>
                <td>
                  {mitarbeiter.FestnetzPrivat && (
                    <a
                      className="text-error underline"
                      href={"tel:" + mitarbeiter.FestnetzPrivat}
                    >
                      {mitarbeiter.FestnetzPrivat}
                    </a>
                  )}
                </td>
                <td>{mitarbeiter.HomeOffice}</td>
                <td>
                  {mitarbeiter.MobilBusiness && (
                    <a
                      className="text-error underline"
                      href={"tel:" + mitarbeiter.MobilBusiness}
                    >
                      {mitarbeiter.MobilBusiness}
                    </a>
                  )}
                </td>
                <td>
                  {mitarbeiter.MobilPrivat && (
                    <a
                      className="text-error underline"
                      href={"tel:" + mitarbeiter.MobilPrivat}
                    >
                      {mitarbeiter.MobilPrivat}
                    </a>
                  )}
                </td>
                <td>
                  {mitarbeiter.Azubi ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check text-success"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-cross rotate-45 text-error"
                    >
                      <path d="M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"></path>
                    </svg>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
