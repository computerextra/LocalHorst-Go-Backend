import { getUsers, type Mitarbeiter } from "@/db/Mitarbeiter";

import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Mitarbeiter() {
  const [mitarbeiter, setMitarbeiter] = useState<undefined | Mitarbeiter[]>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function x() {
      const user = await getUsers();
      setMitarbeiter(user);
      setLoading(false);
    }

    void x();
  }, []);

  if (loading) return <>Loading ... </>;

  return (
    <>
      {mitarbeiter?.map((x) => (
        <Link to={`/Mitarbeiter/${x.ID}`} key={x.ID}>
          Name: {x.ID}
        </Link>
      ))}
    </>
  );
}
