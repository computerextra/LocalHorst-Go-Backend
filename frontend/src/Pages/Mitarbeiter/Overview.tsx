import { GetAllMitarbeiter } from "@/api";
import type { Mitarbeiter } from "@/api/mitarbeiter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Cross } from "lucide-react";
import { NavLink } from "react-router";
import { DataTable } from "../../components/data-table";

const columns: ColumnDef<Mitarbeiter>[] = [
  {
    accessorKey: "Name",
    header: "Name",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <NavLink
          to={"/mitarbeiter/" + x.id}
          className={"underline text-primary"}
        >
          {x.Name}
        </NavLink>
      );
    },
  },
  {
    accessorKey: "Email",
    header: "Email",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <a className="underline" href={"mailto:" + x.Email}>
          {x.Email}
        </a>
      );
    },
  },
  {
    accessorKey: "Gruppenwahl",
    header: "Gruppenwahl",
  },
  {
    accessorKey: "InternTelefon1",
    header: "Interne Durchwahl",
    cell: ({ row }) => {
      const x = row.original;

      return (
        <>
          {x.InternTelefon1 && <p>DW1: {x.InternTelefon1}</p>}
          {x.InternTelefon2 && <p>DW2: {x.InternTelefon2}</p>}
        </>
      );
    },
  },
  {
    accessorKey: "FestnetzPrivat",
    header: "Festnetz",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="grid grid-cols-2">
          {x.FestnetzPrivat && (
            <>
              <div>Privat:</div>
              <div>
                <a className="underline" href={"tel:" + x.FestnetzPrivat}>
                  {x.FestnetzPrivat}
                </a>
              </div>
            </>
          )}
          {x.FestnetzAlternativ && (
            <>
              <div>Geschäftlich:</div>
              <div>
                <a className="underline" href={"tel:" + x.FestnetzAlternativ}>
                  {x.FestnetzAlternativ}
                </a>
              </div>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "HomeOffice",
    header: "Homeoffice",
  },
  {
    accessorKey: "MobilBusiness",
    header: "Mobil",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="grid grid-cols-2">
          {x.MobilPrivat && (
            <>
              <div>Privat:</div>
              <div>
                <a className="underline" href={"tel:" + x.MobilPrivat}>
                  {x.MobilPrivat}
                </a>
              </div>
            </>
          )}
          {x.MobilBusiness && (
            <>
              <div>Geschäftlich:</div>
              <div>
                <a className="underline" href={"tel:" + x.MobilBusiness}>
                  {x.MobilBusiness}
                </a>
              </div>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "Azubi",
    header: "Azubi",
    cell: ({ row }) => {
      const x = row.original;
      if (x.Azubi) {
        return <Check className="w-6 h-6 text-primary" />;
      } else {
        return <Cross className="w-6 h-6 text-destructive rotate-45" />;
      }
    },
  },
];

export default function MitarbeiterOverview() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["allemitarbeiter"],
    queryFn: GetAllMitarbeiter,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h1 className="text-center">Mitarbeiter Overview</h1>
      <Button asChild className="mb-4">
        <NavLink to="/mitarbeiter/new">Neuen Mitarbeiter anlegen</NavLink>
      </Button>
      <DataTable columns={columns} data={data} />
    </>
  );
}
