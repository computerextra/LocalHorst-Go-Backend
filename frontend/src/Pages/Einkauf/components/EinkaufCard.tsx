import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { CheckImage } from "../../../../wailsjs/go/main/App";
import type { db, main } from "../../../../wailsjs/go/models";
import LoadingSpinner from "../../../Components/LoadingSpinner";

export default function EinkaufCard({
  einkauf,
}: {
  einkauf: db.GetEinkaufsListeRow;
}) {
  const [bild1, setBild1] = useState<undefined | main.ImageResponse>(undefined);
  const [bild2, setBild2] = useState<undefined | main.ImageResponse>(undefined);
  const [bild3, setBild3] = useState<undefined | main.ImageResponse>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      setLoading(true);
      const res1 = await CheckImage(einkauf.Mitarbeiterid, "1");
      const res2 = await CheckImage(einkauf.Mitarbeiterid, "2");
      const res3 = await CheckImage(einkauf.Mitarbeiterid, "3");
      setBild1(res1);
      setBild2(res2);
      setBild3(res3);
      setLoading(false);
    }
    x();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <React.Fragment>
      <div className="card card-border bg-base-100 print:!hidden">
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">{einkauf.Name.String}</h2>
            <div className="card-actions justify-end">
              <NavLink
                to={`/Einkauf/${einkauf.ID_2}`}
                className="btn btn-accent"
              >
                Bearbeiten
              </NavLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span>Geld: {einkauf.Geld.String} </span>
            <span className="flex items-center gap-1">
              Abonniert:{" "}
              {einkauf.Abonniert ? (
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
            </span>
            <span>Pfand: {einkauf.Pfand.String}</span>
            <span className="flex items-center gap-1">
              Paypal:{" "}
              {einkauf.Paypal ? (
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
            </span>
          </div>
          <hr />
          <pre className="font-geist text-wrap">{einkauf.Dinge.String}</pre>
          <div className="grid grid-cols-3 gap-2">
            {bild1?.Valid && (
              <img className="max-h-[200px] rounded-md" src={bild1.Image} />
            )}
            {bild2?.Valid && (
              <img className="max-h-[200px] rounded-md" src={bild2.Image} />
            )}
            {bild3?.Valid && (
              <img className="max-h-[200px] rounded-md" src={bild3.Image} />
            )}
          </div>
        </div>
      </div>
      <div className="hidden print:block my-4 text-xs" data-theme="light">
        {einkauf.Name.String}
        <br />
        Geld: {einkauf.Geld.String}
        <br />
        Pfand: {einkauf.Pfand.String}
        <br />
        <pre className="font-geist text-wrap">{einkauf.Dinge.String}</pre>
        <div className="grid grid-cols-3 mb-2">
          {bild1?.Valid && (
            <img className="max-h-[200px] rounded-md" src={bild1.Image} />
          )}
          {bild2?.Valid && (
            <img className="max-h-[200px] rounded-md" src={bild2.Image} />
          )}
          {bild3?.Valid && (
            <img className="max-h-[200px] rounded-md" src={bild3.Image} />
          )}
        </div>
        <hr />
      </div>
    </React.Fragment>
  );
}
