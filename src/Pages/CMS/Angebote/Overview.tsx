import BackButton from "@/components/BackButton";
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
import { Angebot, getAngebote } from "@/db/cms/Angebot";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

const columns: ColumnDef<Angebot>[] = [
  {
    accessorKey: "Title",
    header: "Title",
  },
  {
    accessorKey: "Subtitle.String",
    header: "Subtitle",
  },
  {
    accessorKey: "Link",
    header: "Link",
  },
  {
    accessorKey: "Image",
    header: "Image",
  },
  {
    accessorKey: "DateStart",
    header: "Gültig Von",
    cell: ({ row }) => {
      const x = row.original;

      return (
        <p>
          {new Date(x.DateStart).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "DateStop",
    header: "Gültig Bis",
    cell: ({ row }) => {
      const x = row.original;

      return (
        <p>
          {new Date(x.DateStop).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
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
              <Link to={`/CMS/Angebote/${payment.ID}`}>Bearbeiten</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function AngebotOverview() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["CmsAngebote"],
    queryFn: getAngebote,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Datenbank Fehler!</>;
  return (
    <>
      <BackButton href="/CMS/" />
      <h1 className="mb-8">CMS - Angebote</h1>
      <Button asChild className="mb-2">
        <Link to="/CMS/Angebote/Neu">Neues Angebot</Link>
      </Button>
      {data && (
        <DataTable
          columns={columns}
          data={data}
          placeholder="Suche nach Name"
          search="Title"
        />
      )}
    </>
  );
}
