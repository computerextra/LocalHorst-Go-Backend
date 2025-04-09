import { useState } from "react";
import { GetArchive, SearchArchive } from "../../wailsjs/go/main/App";
import type { db } from "../../wailsjs/go/models";
import BackButton from "../Components/BackButton";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function Archive() {
  const [search, setSearch] = useState<undefined | string>(undefined);
  const [results, setResults] = useState<undefined | db.PdfsModel[]>(undefined);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const handleSubmit = async () => {
    if (search == null) return;
    setLoading(true);
    setSubmitted(true);
    const res = await SearchArchive(search);
    setResults(res);
    setLoading(false);
  };

  const handleClick = async (id: string) => {
    setLoading(true);
    const res = await GetArchive(id);
    setMessage(res);
    setLoading(false);
  };

  return (
    <>
      <BackButton href="/" />
      <h1>CE Archive</h1>
      <form className="space-y-4 mt-5" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Suchbegriff</legend>
          <input
            type="text"
            className="input"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </fieldset>
        <input
          type="submit"
          className="btn btn-neutral"
          disabled={loading}
          value={loading ? "Bitte warten ..." : "Suchen"}
          onClick={handleSubmit}
        />
      </form>
      <div className="mt-12">
        {loading && <LoadingSpinner />}
        {!loading && message != null && <h2>{message}</h2>}
        {!loading && submitted && results == null && <h2>Keine Ergebnisse</h2>}
        {!loading && submitted && results != null && results.length > 0 && (
          <>
            <h2>{results.length} Ergebnisse</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Dateiname</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((x, idx) => (
                    <tr key={idx}>
                      <th>
                        <a
                          className="cursor-pointer"
                          onClick={() => handleClick(x.id.toString())}
                        >
                          {x.title}
                        </a>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
