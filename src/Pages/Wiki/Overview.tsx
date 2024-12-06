import { DataTable } from "@/components/DataTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getWikis, Wiki } from "@/db/Wiki";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

const columns: ColumnDef<Wiki>[] = [
  {
    accessorKey: "Name",
    header: "Name",
    cell: ({ row }) => {
      const mail = row.original;
      return (
        <Link className="underline" to={`/Wiki/${mail.ID}`}>
          {mail.Name}
        </Link>
      );
    },
  },
  {
    accessorKey: "CreatedAt",
    header: "Vom",
    cell: ({ row }) => {
      const mail = row.original;
      return <p>{new Date(mail.CreatedAt).toLocaleDateString()}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link to={`/Wiki/${payment.ID}/Bearbeiten`}>Bearbeiten</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Wikis() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Wikis"],
    queryFn: getWikis,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Server Fehler!</>;

  return (
    <>
      <h1>Wiki Übersicht</h1>
      <Button asChild className="my-4">
        <Link to="/Wiki/Neu">Neuen Wiki Eintrag erstellen</Link>
      </Button>
      {data && (
        <DataTable
          data={data}
          columns={columns}
          placeholder="Nach Namen Suchen"
          search="Name"
        />
      )}
    </>
  );
}
