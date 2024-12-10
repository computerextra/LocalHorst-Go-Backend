import BackButton from "@/components/BackButton";
import { DataTable } from "@/components/DataTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getTeams, TeamFile } from "@/db/Inventur";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Link, useParams } from "react-router";
import { z } from "zod";

export default function Teams() {
  const { iyear } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Teams", iyear],
    queryFn: () => getTeams({ Year: iyear ?? "" }),
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Fehler</>;

  const columns: ColumnDef<z.infer<typeof TeamFile>>[] = [
    {
      accessorKey: "Team",
      header: "Team",
      cell: ({ row }) => {
        const x = row.original;

        return (
          <Link
            className="underline text-primary"
            to={`/Sage/Inventur/${iyear}/Teams/${x.Team}`}
          >
            {x.Team}
          </Link>
        );
      },
    },
    {
      accessorKey: "Mitarbeiter",
      header: "Mitarbeiter",
    },

    {
      accessorKey: "Ort",
      header: "Ort",
    },
    {
      accessorKey: "Farbe",
      header: "Farbe",
    },
  ];

  return (
    <>
      <BackButton href={`/Sage/Inventur/${iyear}`} />
      <h1 className="my-8">Teams - Inventur {iyear}</h1>
      {data && (
        <DataTable
          data={data}
          columns={columns}
          placeholder="Suche nach Team"
          search="Team"
        />
      )}
    </>
  );
}
