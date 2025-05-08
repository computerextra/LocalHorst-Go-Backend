import { Kunde, SucheKunde } from "@/api/kunden";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export default function Kunden() {
  const mutation = useMutation({
    mutationFn: (searchTerm: string) => SucheKunde(searchTerm),
  });

  const [searchTerm, setSearchTerm] = useState<undefined | string>(undefined);
  const [results, setResults] = useState<undefined | Array<Kunde>>(undefined);

  const onSubmit = async () => {
    if (searchTerm == null) {
      alert("Kein Suchbegriff eingegeben");
      return;
    }
    if (searchTerm.length < 3) {
      alert("Suchbegriff muss mindestens 3 Zeichen lang sein.");
      return;
    }

    const res = await mutation.mutateAsync(searchTerm);
    setResults(res);
  };

  const columns: ColumnDef<Kunde>[] = [
    {
      accessorKey: "KundNr",
      header: "Kunde / Lieferant",
      cell: ({ row }) => {
        const x = row.original;
        if (x.KundNr.Valid && x.KundNr.String.length > 0) {
          return <p>Kunde: {x.KundNr.String}</p>;
        }
        if (x.LiefNr.Valid && x.LiefNr.String.length > 0) {
          return <p>Lieferant: {x.LiefNr.String}</p>;
        }
      },
    },
    {
      accessorKey: "Suchbegriff",
      header: "Suchbegriff",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="truncate w-50">
            <p className="text-ellipsis">{x.Suchbegriff.String}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "Telefon1",
      header: "Telefon",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <ul>
            {x.Telefon1.Valid && x.Telefon1.String.length > 0 && (
              <li>
                <a href={"tel:" + x.Telefon1.String} className="underline">
                  {x.Telefon1.String}
                </a>
              </li>
            )}
            {x.Telefon2.Valid && x.Telefon2.String.length > 0 && (
              <li>
                <a href={"tel:" + x.Telefon2.String} className="underline">
                  {x.Telefon2.String}
                </a>
              </li>
            )}
          </ul>
        );
      },
    },
    {
      accessorKey: "Mobiltelefon1",
      header: "Mobil",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <ul>
            {x.Mobiltelefon1.Valid && x.Mobiltelefon1.String.length > 0 && (
              <li>
                <a href={"tel:" + x.Mobiltelefon1.String} className="underline">
                  {x.Mobiltelefon1.String}
                </a>
              </li>
            )}
            {x.Mobiltelefon2.Valid && x.Mobiltelefon2.String.length > 0 && (
              <li>
                <a href={"tel:" + x.Mobiltelefon2.String} className="underline">
                  {x.Mobiltelefon2.String}
                </a>
              </li>
            )}
          </ul>
        );
      },
    },
    {
      accessorKey: "EMail1",
      header: "Mail",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <ul>
            {x.EMail1.Valid && x.EMail1.String.length > 0 && (
              <li>
                <a href={"mailto:" + x.EMail1.String} className="underline">
                  {x.EMail1.String}
                </a>
              </li>
            )}
            {x.EMail2.Valid && x.EMail2.String.length > 0 && (
              <li>
                <a href={"mailto:" + x.EMail2.String} className="underline">
                  {x.EMail2.String}
                </a>
              </li>
            )}
          </ul>
        );
      },
    },
    {
      accessorKey: "KundUmsatz",
      header: "Umsatz",
      cell: ({ row }) => {
        const x = row.original;
        if (x.KundUmsatz.Valid)
          return <span>{x.KundUmsatz.Float64.toFixed(2)} €</span>;
        if (x.LiefUmsatz.Valid)
          return <span>{x.LiefUmsatz.Float64.toFixed(2)} €</span>;
      },
    },
  ];

  return (
    <>
      <h1 className="text-center">Kunden Suche</h1>
      <form className="space-y-8 mt-12" onSubmit={(e) => e.preventDefault()}>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Suchbegriff"
            defaultValue={searchTerm}
            disabled={mutation.isPending}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Sucht ..." : "Suchen"}
          </Button>
        </div>
      </form>
      {mutation.isError && <p>{mutation.error.message}</p>}

      {mutation.isSuccess && results && (
        <DataTable columns={columns} data={results} />
      )}
    </>
  );
}
