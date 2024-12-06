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
import { getLieferanten, type Lieferanten } from "@/db/Lieferanten";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

const columns: ColumnDef<Lieferanten>[] = [
  {
    accessorKey: "Firma",
    header: "Firma",
    cell: ({ row }) => {
      const mail = row.original;

      return (
        <Link className="underline text-primary" to={`/Lieferanten/${mail.ID}`}>
          {mail.Firma}
        </Link>
      );
    },
  },
  {
    accessorKey: "Kundennummer.String",
    header: "Kundennummer",
  },
  {
    accessorKey: "Webseite.String",
    header: "Webseite",
    cell: ({ row }) => {
      const mail = row.original;
      return (
        <a
          className="underline text-primary"
          href={`${mail.Webseite.String}`}
          target="_blank"
        >
          {mail.Webseite.String}
        </a>
      );
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
              <Link to={`/Lieferanten/${payment.ID}/Bearbeiten`}>
                Bearbeiten
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Lieferanten() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Lieferanten"],
    queryFn: getLieferanten,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Error...</>;
  return (
    <>
      <h1 className="mb-6">Lieferanten Übersicht</h1>
      <Button asChild className="mb-6">
        <Link to="/Lieferanten/Neu">Neuer Lieferant</Link>
      </Button>
      {data && (
        <DataTable
          search="Firma"
          placeholder="Suche nach Firma"
          columns={columns}
          data={data}
        />
      )}
    </>
  );
}
