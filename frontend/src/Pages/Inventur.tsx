import { useEffect, useState } from "react";
import {
  GetDataFromYear,
  GetEntriesFromTeam,
  GetInventurYears,
} from "../../wailsjs/go/main/App";
import type { main } from "../../wailsjs/go/models";
import BackButton from "../Components/BackButton";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function Inventur() {
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState<string[] | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [team, setTeam] = useState<string | undefined>(undefined);
  const [yearData, setYearData] = useState<main.YearData | undefined>(
    undefined
  );
  const [entries, setEntries] = useState<main.InventurEntry[] | undefined>(
    undefined
  );

  useEffect(() => {
    async function x() {
      setLoading(true);
      const years = await GetInventurYears();
      setYears(years);
      setLoading(false);
    }
    x();
  }, []);

  const handleYearClick = async (year: string) => {
    setLoading(true);
    setYear(year);
    const res = await GetDataFromYear(year);
    setYearData(res);
    setLoading(false);
  };

  const handleTeamClick = async (team: string) => {
    if (year == null) return;
    setLoading(true);
    setTeam(team);
    const res = await GetEntriesFromTeam(year, team);
    setEntries(res);
    setLoading(false);
  };

  return (
    <>
      <BackButton href="/" />
      <h1>Iventur</h1>
      {loading && <LoadingSpinner />}
      <div className="grid gap-2 mt-5 grid-cols-2">
        {years && (
          <div className="h-96 overflow-x-auto">
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th>Jahre</th>
                </tr>
              </thead>
              <tbody>
                {years.map((x) => (
                  <tr
                    className="hover:bg-base-300"
                    key={x}
                    onClick={() => handleYearClick(x)}
                  >
                    <td>{x}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {yearData && (
          <div className="h-96 overflow-x-auto">
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Mitarbeiter</th>
                  <th>Farbe</th>
                  <th>Ort</th>
                </tr>
              </thead>
              <tbody>
                {yearData.Teams.map((x, idx) => (
                  <tr
                    className="hover:bg-base-300"
                    key={idx}
                    onClick={() => handleTeamClick(x.Team.toString())}
                  >
                    <td>{x.Team}</td>
                    <td>{x.Mitarbeiter}</td>
                    <td>{x.Farbe}</td>
                    <td>{x.Ort}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {entries && (
        <div className="mt-5">
          <h2>
            Artikel von Team {team} aus {year}
          </h2>
          <div className="h-96 overflow-x-auto mt-5 mb-5">
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th>Artikelnummer</th>
                  <th>Suchbegriff</th>
                  <th>Anzahl</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((x, idx) => (
                  <tr className="hover:bg-base-300" key={idx}>
                    <td>{x.Artikelnummer}</td>
                    <td>{x.Suchbegriff}</td>
                    <td>{x.Anzahl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {yearData && (
        <div className="mt-5">
          <h2>Alle Einträge aus {year}</h2>
          <div className="h-96 overflow-x-auto mt-5 mb-5">
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th>Artikelnummer</th>
                  <th>Suchbegriff</th>
                  <th>Anzahl</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {yearData.Entries.map((x, idx) => (
                  <tr className="hover:bg-base-300" key={idx}>
                    <td>{x.Artikelnummer}</td>
                    <td>{x.Suchbegriff}</td>
                    <td>{x.Anzahl}</td>
                    <td>{x.Team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
