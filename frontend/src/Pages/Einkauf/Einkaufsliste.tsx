import { GetEinkaufsliste } from "@/api";
import { Einkauf } from "@/api/mitarbeiter";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Cross } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { DataTable } from "../../components/data-table";
import { Button } from "../../components/ui/button";

export default function Einkaufsliste() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["einkaufsliste"],
    queryFn: GetEinkaufsliste,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const columns: ColumnDef<Einkauf>[] = [
    {
      accessorKey: "Name",
      header: "Name",
    },
    {
      accessorKey: "Paypal",
      header: "Paypal",
      cell: ({ row }) => {
        const x = row.original;
        if (x.Paypal) {
          return <Check className="w-6 h-6 text-primary" />;
        } else {
          return <Cross className="w-6 h-6 text-destructive rotate-45" />;
        }
      },
    },
    {
      accessorKey: "Abonniert",
      header: "Abo",
      cell: ({ row }) => {
        const x = row.original;
        if (x.Abonniert) {
          return <Check className="w-6 h-6 text-primary" />;
        } else {
          return <Cross className="w-6 h-6 text-destructive rotate-45" />;
        }
      },
    },
    {
      accessorKey: "Geld",
      header: "Geld",
      cell: ({ row }) => {
        const x = row.original;
        return <p>{x.Geld && x.Geld.length > 0 ? `${x.Geld} €` : "-"}</p>;
      },
    },
    {
      accessorKey: "Pfand",
      header: "Pfand",
      cell: ({ row }) => {
        const x = row.original;
        return <p>{x.Pfand && x.Pfand.length > 0 ? `${x.Pfand} €` : "-"}</p>;
      },
    },
    {
      accessorKey: "Dinge",
      header: "Dinge",
      cell: ({ row }) => {
        const x = row.original;
        return <pre className="font-sans text-wrap">{x.Dinge}</pre>;
      },
    },
    {
      accessorKey: "Bild1",
      header: "Bilder",
      cell: ({ row }) => {
        const x = row.original;
        const bilder: Array<string> = [];
        if (x.Bild1Data.Valid) {
          bilder.push(x.Bild1Data.Image);
        }
        if (x.Bild2Data.Valid) {
          bilder.push(x.Bild2Data.Image);
        }
        if (x.Bild3Data.Valid) {
          bilder.push(x.Bild3Data.Image);
        }

        return (
          <div
            className={cn(
              "grid",
              bilder.length == 2
                ? "grid-cols-2"
                : bilder.length == 3
                ? "grid-cols-3"
                : "grid-cols-1"
            )}
          >
            {bilder.map((x, idx) => (
              <img key={idx} className="max-h-[50px] rounded-md" src={x} />
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <h2 className="hidden print:block">An Post / Milch und Kaffee denken!</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:hidden">
        <Button variant={"outline"} asChild>
          <a
            href="https://www.edeka.de/markt-id/10001842/prospekt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edeka Blättchen
          </a>
        </Button>
        <Button variant={"outline"} onClick={window.print}>
          Drucken
        </Button>
        <Button variant={"outline"} asChild>
          <NavLink to="/einkauf/eingabe">Eingabe</NavLink>
        </Button>
        <Button variant={"default"} asChild>
          <NavLink to="/einkauf/rechnung">Abrechnung</NavLink>
        </Button>
      </div>
      {data && (
        <div className="print:hidden mt-5">
          <DataTable columns={columns} data={data} />
        </div>
      )}
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <React.Fragment key={item.id}>
            <div className="hidden print:block my-4 text-xs">
              {item.Name} <br />
              Geld: {item.Geld} <br />
              Pfand: {item.Pfand} <br />
              <pre className="font-sans text-wrap">{item.Dinge}</pre>
              <div className="grid grid-cols-3 mb-2">
                {item.Bild1Data.Valid && (
                  <img
                    className="max-h-[150px] rounded-md"
                    src={item.Bild1Data.Image}
                  />
                )}
                {item.Bild2Data.Valid && (
                  <img
                    className="max-h-[150px] rounded-md"
                    src={item.Bild2Data.Image}
                  />
                )}
                {item.Bild3Data.Valid && (
                  <img
                    className="max-h-[150px] rounded-md"
                    src={item.Bild3Data.Image}
                  />
                )}
              </div>
              <hr />
            </div>
          </React.Fragment>
        ))}
    </>
  );
}
