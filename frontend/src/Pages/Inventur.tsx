import { useEffect, useState } from "react";
import {
  GetDataFromYear,
  GetEntriesFromTeam,
  GetInventurYears,
} from "../../wailsjs/go/main/App";
import type { db } from "../../wailsjs/go/models";
import BackButton from "../Components/BackButton";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function Inventur() {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [team, setTeam] = useState<number | undefined>(undefined);
  const [years, setYears] = useState<string[] | undefined>(undefined);
  const [teams, setTeams] = useState<db.Team[] | undefined>(undefined);
  const [entries, setEntries] = useState<db.Artikel[] | undefined>(undefined);

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
    setTeam(undefined);
    setEntries(undefined);
    const res = await GetDataFromYear(year);
    setTeams(res);
    setLoading(false);
  };

  const handleTeamClick = async (team: number) => {
    if (year == null) return;
    setLoading(true);
    setTeam(team);
    const res = await GetEntriesFromTeam(team);
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
        {teams && (
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
                {teams.map((x) => (
                  <tr
                    className="hover:bg-base-300"
                    key={x.Id}
                    onClick={() => handleTeamClick(x.Id)}
                  >
                    <td>{x.Id}</td>
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
                </tr>
              </thead>
              <tbody>
                {entries.map((x) => (
                  <tr className="hover:bg-base-300" key={x.Id}>
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
      {teams && (
        <div className="mt-5">
          <h2>Alle Artikel aus {year}</h2>
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
                {teams.map((team) => (
                  <>
                    {team.Artikel?.map((item) => (
                      <tr
                        className="hover:bg-base-300"
                        key={item.Id}
                        onClick={() => handleTeamClick(team.Id)}
                      >
                        <td>{item.Artikelnummer}</td>
                        <td>{item.Suchbegriff}</td>
                        <td>{item.Anzahl}</td>
                        <td>{team.Id}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
