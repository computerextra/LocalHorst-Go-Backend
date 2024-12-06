import LoadingSpinner from "@/components/LoadingSpinner";
import { getUsers, Mitarbeiter } from "@/db/Mitarbeiter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, Cross, MoreHorizontal } from "lucide-react";

const columns: ColumnDef<Mitarbeiter>[] = [
  {
    accessorKey: "Name",
    header: "Name",
    cell: ({ row }) => {
      const mail = row.original;

      return (
        <Link className="underline" to={`/Mitarbeiter/${mail.ID}`}>
          {mail.Name}
        </Link>
      );
    },
  },
  {
    accessorKey: "Email.String",
    header: "Email",
    cell: ({ row }) => {
      const mail = row.original;
      return (
        <a
          className="underline text-primary"
          href={`mailto:${mail.Email.String}`}
        >
          {mail.Email.String}
        </a>
      );
    },
  },
  {
    accessorKey: "Gruppenwahl.String",
    header: "Gruppe",
  },
  {
    accessorKey: "Interntelefon1.String",
    header: "Interntelefon1",
  },
  {
    accessorKey: "Interntelefon2.String",
    header: "Interntelefon2",
  },
  {
    accessorKey: "Festnetzalternativ.String",
    header: "Festnetzalternativ",
    cell: ({ row }) => {
      const mail = row.original;
      return (
        <a
          className="underline text-primary"
          href={`tel:${mail.Festnetzalternativ.String}`}
        >
          {mail.Festnetzalternativ.String}
        </a>
      );
    },
  },
  {
    accessorKey: "Festnetzprivat.String",
    header: "Festnetzprivat",
    cell: ({ row }) => {
      const mail = row.original;
      return (
        <a
          className="underline text-primary"
          href={`tel:${mail.Festnetzprivat.String}`}
        >
          {mail.Festnetzprivat.String}
        </a>
      );
    },
  },
  {
    accessorKey: "Homeoffice.String",
    header: "Homeoffice",
  },
  {
    accessorKey: "Mobilbusiness.String",
    header: "Mobilbusiness",
    cell: ({ row }) => {
      const mail = row.original;
      return (
        <a
          className="underline text-primary"
          href={`tel:${mail.Mobilbusiness.String}`}
        >
          {mail.Mobilbusiness.String}
        </a>
      );
    },
  },
  {
    accessorKey: "Mobilprivat.String",
    header: "Mobilprivat",
    cell: ({ row }) => {
      const mail = row.original;
      return (
        <a
          className="underline text-primary"
          href={`tel:${mail.Mobilprivat.String}`}
        >
          {mail.Mobilprivat.String}
        </a>
      );
    },
  },
  {
    accessorKey: "Azubi.String",
    header: "Azubi",
    cell: ({ row }) => {
      const mail = row.original;
      if (mail.Azubi.Bool) {
        return <Check className="text-green-500" />;
      } else {
        return <Cross className="rotate-45 text-primary" />;
      }
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
              <Link to={`/Mitarbeiter/${payment.ID}/Bearbeiten`}>
                Bearbeiten
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function MitarbeiterOverview() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Error...</>;

  return (
    <>
      <h1 className="mb-6">Mitarbeiter</h1>
      <Button asChild className="mb-6">
        <Link to="/Mitarbeiter/Neu">Neuer Mitarbeiter</Link>
      </Button>
      {data && (
        <DataTable
          search="Name"
          placeholder="Suche nach Namen"
          columns={columns}
          data={data}
        />
      )}
    </>
  );
}
