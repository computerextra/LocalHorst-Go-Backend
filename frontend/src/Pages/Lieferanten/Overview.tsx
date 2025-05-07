import { GetLieferanten } from "@/api";
import type { Ansprechpartner, Lieferant } from "@/api/lieferanten";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { NavLink } from "react-router";

const columns: ColumnDef<Lieferant>[] = [
  {
    accessorKey: "Firma",
    header: "Firma",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <NavLink
          to={"/lieferanten/" + x.id}
          className={"underline text-primary"}
        >
          {x.Firma}
        </NavLink>
      );
    },
  },
  {
    accessorKey: "Kundennummer",
    header: "Kundennummer",
  },
  {
    accessorKey: "Webseite",
    header: "Webseite",
    cell: ({ row }) => {
      const x = row.original;
      return (
        <div className="truncate w-50">
          <a
            href={x.Webseite}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-ellipsis"
          >
            {x.Webseite}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "Ansprechpartner",
    header: "Ansprechpartner",
    cell: ({ row }) => {
      const x = row.original;

      const cols: ColumnDef<Ansprechpartner>[] = [
        {
          accessorKey: "Name",
          header: "Name",
          cell: ({ row }) => {
            const y = row.original;

            return (
              <NavLink
                to={`/lieferanten/${x.id}/${y.id}`}
                className={"underline text-primary"}
              >
                {y.Name}
              </NavLink>
            );
          },
        },
        {
          accessorKey: "Telefon",
          header: "Telefon",
          cell: ({ row }) => {
            const y = row.original;
            return (
              <div className="grid grid-cols-1">
                {y.Telefon && y.Telefon.length > 0 && (
                  <a className="underline" href={"tel:" + y.Telefon}>
                    {y.Telefon}
                  </a>
                )}
                {y.Mobil && y.Mobil.length > 0 && (
                  <a className="underline" href={"tel:" + y.Mobil}>
                    {y.Mobil}
                  </a>
                )}
              </div>
            );
          },
        },
        {
          accessorKey: "Mail",
          header: "Mail",
          cell: ({ row }) => {
            const y = row.original;
            return (
              <>
                {y.Mail && y.Mail.length > 0 ? (
                  <a className="underline" href={"mailto:" + y.Mail}>
                    {y.Mail}
                  </a>
                ) : (
                  <span>-</span>
                )}
              </>
            );
          },
        },
      ];
      return <DataTable columns={cols} data={x.Ansprechpartner} />;
    },
  },
];

export default function Overview() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["lieferanten"],
    queryFn: () => GetLieferanten(),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h1 className="text-center">Lieferanten Overview</h1>
      <Button asChild className="mb-4">
        <NavLink to="/lieferanten/new">Neuen Lieferanten anlegen</NavLink>
      </Button>
      {data && data.length > 0 && <DataTable columns={columns} data={data} />}
    </>
  );
}
