import { useEffect, useState } from "react";
import { GetAllMitarbeiter } from "../../wailsjs/go/main/App";
import type { db } from "../../wailsjs/go/models";
import LoadingSpinner from "./LoadingSpinner";

export default function GeburtstagsListe() {
  const [heute, setHeute] = useState<db.Mitarbeiter[]>();
  const [zukunft, setZukunft] = useState<db.Mitarbeiter[]>();
  const [vergangen, setVergangen] = useState<db.Mitarbeiter[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      setLoading(true);
      const ma = await GetAllMitarbeiter();

      const heute: db.Mitarbeiter[] = [];
      const zukunft: db.Mitarbeiter[] = [];
      const vergangen: db.Mitarbeiter[] = [];

      const today = new Date();

      ma.map((i) => {
        if (i.Geburtstag.Valid) {
          const bday = new Date(i.Geburtstag.Time);
          const temp = new Date(
            bday.setFullYear(
              new Date().getFullYear(),
              bday.getMonth(),
              bday.getDate()
            )
          );
          const diff = Math.trunc(
            //   @ts-expect-error Das geht!
            Math.round(today - temp) / (1000 * 60 * 60 * 24)
          );

          if (diff < 0) {
            zukunft.push(i);
          } else if (diff > 0) {
            vergangen.push(i);
          } else {
            heute.push(i);
          }

          vergangen.sort((a, b) => {
            const ba = new Date(a.Geburtstag.Time);
            const aDay = ba.setFullYear(
              new Date().getFullYear(),
              ba.getMonth(),
              ba.getDate()
            );
            const bb = new Date(b.Geburtstag.Time);
            const bDay = bb.setFullYear(
              new Date().getFullYear(),
              bb.getMonth(),
              bb.getDate()
            );
            const diff = Math.trunc(
              Math.round(aDay - bDay) / (1000 * 60 * 60 * 24)
            );
            if (diff < 0) {
              return -1;
            } else if (diff > 0) {
              return 1;
            } else {
              return 0;
            }
          });
          zukunft.sort((a, b) => {
            const ba = new Date(a.Geburtstag.Time);
            const aDay = ba.setFullYear(
              new Date().getFullYear(),
              ba.getMonth(),
              ba.getDate()
            );
            const bb = new Date(b.Geburtstag.Time);
            const bDay = bb.setFullYear(
              new Date().getFullYear(),
              bb.getMonth(),
              bb.getDate()
            );
            const diff = Math.trunc(
              Math.round(aDay - bDay) / (1000 * 60 * 60 * 24)
            );
            if (diff < 0) {
              return -1;
            } else if (diff > 0) {
              return 1;
            } else {
              return 0;
            }
          });
          heute.sort((a, b) => {
            const ba = new Date(a.Geburtstag.Time);
            const aDay = ba.setFullYear(
              new Date().getFullYear(),
              ba.getMonth(),
              ba.getDate()
            );
            const bb = new Date(b.Geburtstag.Time);
            const bDay = bb.setFullYear(
              new Date().getFullYear(),
              bb.getMonth(),
              bb.getDate()
            );
            const diff = Math.trunc(
              Math.round(aDay - bDay) / (1000 * 60 * 60 * 24)
            );
            if (diff < 0) {
              return -1;
            } else if (diff > 0) {
              return 1;
            } else {
              return 0;
            }
          });
        }
      });

      setHeute(heute);
      setZukunft(zukunft);
      setVergangen(vergangen);
      setLoading(false);
    }
    x();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {heute &&
        heute.length > 0 &&
        heute.map((x) => (
          <div
            role="alert"
            className="w-full alert alert-error alert-soft"
            key={x.Id}
          >
            <span>
              Heute gibt es ein Geburtstagskind! | Heute hat <b>{x.Name}</b>{" "}
              Geburtstag
            </span>
          </div>
        ))}
      {vergangen && vergangen.length > 0 && (
        <>
          <h2>Vergangene</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Geburtstag</th>
                </tr>
              </thead>
              <tbody>
                {vergangen.map((user) => {
                  const bday = new Date(user.Geburtstag.Time);
                  const temp = new Date(
                    bday.setFullYear(
                      new Date().getFullYear(),
                      bday.getMonth(),
                      bday.getDate()
                    )
                  );
                  return (
                    <tr key={user.Id}>
                      <th>{user.Name}</th>
                      <td>
                        {temp.toLocaleDateString("de-DE", {
                          weekday: "short",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {zukunft && zukunft.length > 0 && (
        <>
          <h2>Zuküftige</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Geburtstag</th>
                </tr>
              </thead>
              <tbody>
                {zukunft.map((user) => {
                  const bday = new Date(user.Geburtstag.Time);
                  const temp = new Date(
                    bday.setFullYear(
                      new Date().getFullYear(),
                      bday.getMonth(),
                      bday.getDate()
                    )
                  );
                  return (
                    <tr key={user.Id}>
                      <th>{user.Name}</th>
                      <td>
                        {temp.toLocaleDateString("de-DE", {
                          weekday: "short",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
