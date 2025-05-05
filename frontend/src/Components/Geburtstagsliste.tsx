import { DataTable } from "@/Pages/Mitarbeiter/data-table";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle } from "lucide-react";
import { GetGeburtstagsListe } from "../../wailsjs/go/main/App";
import { main } from "../../wailsjs/go/models";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const columns: ColumnDef<main.Geburtstag>[] = [
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
];

export default function Geburtstagsliste() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["geburtstagsliste"],
    queryFn: GetGeburtstagsListe,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
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
          <h2 className="my-4">Verganene Geburtstage</h2>
          <DataTable columns={columns} data={data.Vergangen} />
        </>
      )}
      {data.Zukunft && (
        <>
          <h2 className="my-4">Zukünftige Geburtstage</h2>
          <DataTable columns={columns} data={data.Zukunft} />
        </>
      )}
    </>
  );
}
