import LoadingSpinner from "@/components/LoadingSpinner";
import { getYears } from "@/db/Inventur";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

export default function InventurOverview() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["InventurYears"],
    queryFn: getYears,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Fehler...</>;

  return (
    <>
      <h1 className="mt-8">Inventur Übersicht</h1>
      <h2 className="mb-8">Übersicht der Jahre</h2>
      <ul>
        {data?.map((x) => (
          <li key={x}>
            <Link className="underline text-primary" to={`/Sage/Inventur/${x}`}>
              {x}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
