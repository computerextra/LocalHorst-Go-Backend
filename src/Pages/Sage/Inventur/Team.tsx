import BackButton from "@/components/BackButton";
import { DataTable } from "@/components/DataTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Entry, getEntry } from "@/db/Inventur";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router";
import { z } from "zod";

export default function Team() {
  const { iyear, iteam } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["InventurTeam", iyear, iteam],
    queryFn: () => getEntry({ Team: iteam ?? "", Year: iyear ?? "" }),
  });

  const columns: ColumnDef<z.infer<typeof Entry>>[] = [
    {
      accessorKey: "Artikelnummer",
      header: "Artikelnummer",
    },
    {
      accessorKey: "Suchbegriff",
      header: "Suchbegriff",
    },

    {
      accessorKey: "Anzahl",
      header: "Gezählt",
    },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Fehler</>;

  return (
    <>
      <BackButton href={`/Sage/Inventur/${iyear}`} />
      <h1 className="my-8">
        Team {iteam} - Inventur {iyear}
      </h1>
      {data && (
        <DataTable
          columns={columns}
          data={data}
          placeholder="Suche nach Artikelnummer"
          search="Artikelnummer"
        />
      )}
    </>
  );
}
