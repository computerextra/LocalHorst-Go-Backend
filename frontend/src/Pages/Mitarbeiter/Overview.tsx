import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GetAllMitarbeiter } from "../../../wailsjs/go/main/App";
import { db } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function Mitarbeiterübersicht() {
  const [Mitarbeiter, setMitarbeiter] = useState<
    undefined | db.GetAllMitarbeiterRow[]
  >(undefined);
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
              <tr key={mitarbeiter.ID}>
                <th>
                  <Link
                    to={"/Mitarbeiter/" + mitarbeiter.ID}
                    className="underline"
                  >
                    {mitarbeiter.Name}
                  </Link>
                </th>
                <td>
                  {mitarbeiter.Email.Valid && (
                    <a
                      className="text-error underline"
                      href={"mailto:" + mitarbeiter.Email.String}
                    >
                      {mitarbeiter.Email.String}
                    </a>
                  )}
                </td>
                <td>{mitarbeiter.Gruppenwahl.String}</td>
                <td>{mitarbeiter.Interntelefon1.String}</td>
                <td>{mitarbeiter.Interntelefon2.String}</td>
                <td>
                  {mitarbeiter.Festnetzalternativ.Valid && (
                    <a
                      className="text-error underline"
                      href={"tel:" + mitarbeiter.Festnetzalternativ.String}
                    >
                      {mitarbeiter.Festnetzalternativ.String}
                    </a>
                  )}
                </td>
                <td>
                  {mitarbeiter.Festnetzprivat.Valid && (
                    <a
                      className="text-error underline"
                      href={"tel:" + mitarbeiter.Festnetzprivat.String}
                    >
                      {mitarbeiter.Festnetzprivat.String}
                    </a>
                  )}
                </td>
                <td>{mitarbeiter.Homeoffice.String}</td>
                <td>
                  {mitarbeiter.Mobilbusiness.Valid && (
                    <a
                      className="text-error underline"
                      href={"tel:" + mitarbeiter.Mobilbusiness.String}
                    >
                      {mitarbeiter.Mobilbusiness.String}
                    </a>
                  )}
                </td>
                <td>
                  {mitarbeiter.Mobilprivat.Valid && (
                    <a
                      className="text-error underline"
                      href={"tel:" + mitarbeiter.Mobilprivat.String}
                    >
                      {mitarbeiter.Mobilprivat.String}
                    </a>
                  )}
                </td>
                <td>
                  {mitarbeiter.Azubi.Valid && mitarbeiter.Azubi.Bool ? (
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
