import BackButton from "@/components/BackButton";
import { DataTable } from "@/components/DataTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { AllFile, getEntries } from "@/db/Inventur";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Link, useParams } from "react-router";
import { z } from "zod";

export default function Jahr() {
  const { iyear } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["InventurJahr", iyear],
    queryFn: () => getEntries({ Year: iyear ?? "" }),
  });

  const columns: ColumnDef<z.infer<typeof AllFile>>[] = [
    {
      accessorKey: "Artikelnummer",
      header: "Artikelnummer",
    },
    {
      accessorKey: "Suchbegriff",
      header: "Suchbegriff",
    },
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
      accessorKey: "Anzahl",
      header: "Gezählt",
    },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Fehler...</>;

  return (
    <>
      <BackButton href={`/Sage/Inventur/`} />
      <h1 className="mt-8">Inventur Jahr {iyear}</h1>
      <Button asChild>
        <Link className="my-8" to={`/Sage/Inventur/${iyear}/Teams`}>
          Team Übersicht
        </Link>
      </Button>
      {data && (
        <DataTable
          data={data}
          columns={columns}
          search="Artikelnummer"
          placeholder="Suche nach Artikelnummer"
        />
      )}
    </>
  );
}
