import { GetGeburtstagsliste } from "@/api";
import type { Geburtstag } from "@/api/mitarbeiter";
import { DataTable } from "@/components/data-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle } from "lucide-react";

const columns: ColumnDef<Geburtstag>[] = [
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "Geburtstag",
    header: "Geburtstag",
    cell: ({ row }) => {
      return new Date(row.getValue("Geburtstag")).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  {
    accessorKey: "Diff",
    header: "Diff",
    cell: ({ row }) => {
      const x = row.original;
      const diff = new Date(x.Geburtstag).getTime() - new Date().getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const d = days > 0 ? days : days;
      return days > 0
        ? `in ${d} Tage${d == 1 ? "" : "n"}`
        : `Vor ${d * -1} Tage${d == 1 ? "" : "n"}`;
    },
  },
];

export default function Geburtstagsliste() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["geburtstagsliste"],
    queryFn: GetGeburtstagsliste,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="mb-5">
      {data.Heute?.length > 0 &&
        data.Heute.map((x) => (
          <Alert variant="destructive" className="my-4" key={x.Name}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{x.Name}</AlertTitle>
            <AlertDescription>Hat Heute Geburtstag!</AlertDescription>
          </Alert>
        ))}
      {data.Vergangen && (
        <>
          <h2 className="my-4">Vergangene Geburtstage</h2>
          <DataTable columns={columns} data={data.Vergangen} />
        </>
      )}
      {data.Zukunft && (
        <>
          <h2 className="my-4">Zukünftige Geburtstage</h2>
          <DataTable columns={columns} data={data.Zukunft} />
        </>
      )}
    </div>
  );
}
