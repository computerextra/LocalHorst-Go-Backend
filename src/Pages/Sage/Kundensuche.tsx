import { DataTable } from "@/components/DataTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  searchKunde,
  searchKundeReverse,
  SearchParams,
  Sg_Adressen,
} from "@/db/sage/Kunde";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const columns: ColumnDef<Sg_Adressen>[] = [
  {
    accessorKey: "KundNr.String",
    header: "Kundennummer",
  },
  {
    accessorKey: "LiefNr.String",
    header: "Lieferantennummer",
  },
  {
    accessorKey: "Suchbegriff.String",
    header: "Suchbegriff",
  },
  {
    accessorKey: "Telefon1.String",
    header: "Telefon1",
    cell: ({ row }) => {
      const x = row.original;

      return (
        <a className="underline text-primary" href={`tel:${x.Telefon1.String}`}>
          {x.Telefon1.String}
        </a>
      );
    },
  },
  {
    accessorKey: "Telefon2.String",
    header: "Telefon2",
    cell: ({ row }) => {
      const x = row.original;

      return (
        <a className="underline text-primary" href={`tel:${x.Telefon2.String}`}>
          {x.Telefon2.String}
        </a>
      );
    },
  },
  {
    accessorKey: "Mobiltelefon1.String",
    header: "Mobiltelefon1",
    cell: ({ row }) => {
      const x = row.original;

      return (
        <a
          className="underline text-primary"
          href={`tel:${x.Mobiltelefon1.String}`}
        >
          {x.Mobiltelefon1.String}
        </a>
      );
    },
  },
  {
    accessorKey: "Mobiltelefon2.String",
    header: "Mobiltelefon2",
    cell: ({ row }) => {
      const x = row.original;

      return (
        <a
          className="underline text-primary"
          href={`tel:${x.Mobiltelefon2.String}`}
        >
          {x.Mobiltelefon2.String}
        </a>
      );
    },
  },
  {
    accessorKey: "EMail1.String",
    header: "EMail1",
    cell: ({ row }) => {
      const x = row.original;

      return (
        <a
          className="underline text-primary"
          href={`mailto:${x.EMail1.String}`}
        >
          {x.EMail1.String}
        </a>
      );
    },
  },
  {
    accessorKey: "EMail2.String",
    header: "EMail2",
    cell: ({ row }) => {
      const x = row.original;

      return (
        <a
          className="underline text-primary"
          href={`mailto:${x.EMail2.String}`}
        >
          {x.EMail2.String}
        </a>
      );
    },
  },
  {
    accessorKey: "KundUmsatz.Float64",
    header: "Umsatz (Kunde)",
    cell: ({ row }) => {
      const x = row.original;

      return <p>{x.KundUmsatz.Float64.toFixed(2)}€</p>;
    },
  },
];

export default function KundenSuche() {
  const form = useForm<z.infer<typeof SearchParams>>({
    resolver: zodResolver(SearchParams),
  });
  const [reversed, setReversed] = useState(false);
  const [results, setResults] = useState<undefined | Sg_Adressen[]>(undefined);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof SearchParams>) => {
    setLoading(true);
    let res: Sg_Adressen[] = [];
    if (reversed) {
      res = await searchKundeReverse(values);
    } else {
      res = await searchKunde(values);
    }

    setResults(res);
    setLoading(false);
  };

  return (
    <>
      <h1 className="my-8">
        Sage {reversed ? "Rückwärtssuche" : "Kundensuche"}
      </h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center space-x-2">
            <Switch
              id="airplane-mode"
              checked={reversed}
              onCheckedChange={() => setReversed((prev) => !prev)}
            />
            <Label htmlFor="airplane-mode">Rückwärtssuche</Label>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-8 space-y-8"
            >
              <FormField
                control={form.control}
                name="Search"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{reversed ? "Telefonnummer" : "Name"}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Suchen</Button>
            </form>
          </Form>
          {results && (
            <div className="mt-8">
              <h2>Suchergebnisse</h2>
              <DataTable
                data={results}
                placeholder="Nach Namen Suchen"
                columns={columns}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
