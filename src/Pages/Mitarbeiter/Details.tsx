import LoadingSpinner from "@/components/LoadingSpinner";
import { getUser, Mitarbeiter } from "@/db/Mitarbeiter";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function MitarbeiterDetail() {
  const { mid } = useParams();
  const [mitarbeiter, setMitarbeiter] = useState<
    undefined | null | Mitarbeiter
  >(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function x() {
      if (mid == null) return;

      const user = await getUser({ id: mid });
      setMitarbeiter(user);
      setLoading(false);
    }

    void x();
  }, [mid]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1>{mitarbeiter?.Name}</h1>
    </>
  );
}
