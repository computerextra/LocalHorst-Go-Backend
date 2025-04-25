import { useEffect, useState } from "react";
import {
  GetDataFromYear,
  GetEntriesFromTeam,
  GetInventurYears,
} from "../../wailsjs/go/main/App";
import type { ent } from "../../wailsjs/go/models";
import BackButton from "../Components/BackButton";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function Inventur() {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState<ent.Inventur | undefined>(undefined);
  const [team, setTeam] = useState<number | undefined>(undefined);
  const [years, setYears] = useState<ent.Inventur[] | undefined>(undefined);
  const [teams, setTeams] = useState<ent.Team[] | undefined>(undefined);
  const [entries, setEntries] = useState<ent.Artikel[] | undefined>(undefined);

  useEffect(() => {
    async function x() {
      setLoading(true);
      const localYears = localStorage.getItem("years");
      if (localYears != null) {
        setYears(JSON.parse(localYears));
      } else {
        const years = await GetInventurYears();
        localStorage.setItem("years", JSON.stringify(years));
        setYears(years);
      }
      setLoading(false);
    }
    x();
  }, []);

  const handleYearClick = async (year: ent.Inventur) => {
    setLoading(true);
    setYear(year);
    setTeam(undefined);
    setEntries(undefined);

    if (year == null) return;

    const localData = localStorage.getItem(`${year}-team`);
    if (localData != null) {
      setTeams(JSON.parse(localData));
    } else {
      const res = await GetDataFromYear(year.Jahr!);
      localStorage.setItem(`${year}-team`, JSON.stringify(res));
      setTeams(res);
    }

    setLoading(false);
  };

  const handleTeamClick = async (team: number) => {
    if (year == null) return;
    setLoading(true);
    setTeam(team);

    const localData = localStorage.getItem(`${team}-data`);
    if (localData != null) {
      setEntries(JSON.parse(localData));
    } else {
      const res = await GetEntriesFromTeam(team);
      setEntries(res);
      localStorage.setItem(`${team}-data`, JSON.stringify(res));
    }

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
                    key={x.id}
                    onClick={() => handleYearClick(x)}
                  >
                    <td>{x.Jahr}</td>
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
                    key={x.id}
                    onClick={() => handleTeamClick(x.id!)}
                  >
                    <td>{x.id}</td>
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
            Artikel von Team {team} aus {year?.Jahr}
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
                  <tr className="hover:bg-base-300" key={x.id}>
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
    </>
  );
}
