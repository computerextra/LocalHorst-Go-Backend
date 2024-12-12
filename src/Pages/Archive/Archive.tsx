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
import {
  searchArchive,
  SearchArchiveParams,
  SearchArchiveResponse,
} from "@/db/Archive";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { z } from "zod";

const columns: ColumnDef<SearchArchiveResponse>[] = [
  {
    accessorKey: "Title",
    header: "Datei",
    cell: ({ row }) => {
      const mail = row.original;
      const filename = mail.Title.replace(".", ":");

      return (
        <Link to={`/Sage/${filename}`} target="_blank">
          {mail.Title}
        </Link>
      );
    },
  },
];

export default function Archive() {
  const [results, setResults] = useState<
    SearchArchiveResponse[] | undefined | null
  >(undefined);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof SearchArchiveParams>>({
    resolver: zodResolver(SearchArchiveParams),
  });

  const onSubmit = async (values: z.infer<typeof SearchArchiveParams>) => {
    setLoading(true);
    const res = await searchArchive(values);
    setResults(res);
    setLoading(false);
  };

  return (
    <>
      <h1 className="mb-6">CE Archiv</h1>
      <h2>Volltext Suche im Rechnungsarchiv.</h2>
      <p>
        Zum Suchen einfach den gesuchten Begriff oder eine Rechnungsnummer in
        das Suchfeld eingeben und auf "Suchen" drücken.
      </p>
      <p>
        Suchergenisse werden als Liste angezeigt. Mit einem Druck auf den Namen
        wird der Download initialisiert.
      </p>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="Suche"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suchbegriff</FormLabel>
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
              <h2>Suchergbnisse</h2>
              <h3 className="mb-3">{results.length} Ergebnisse gefunden</h3>
              <DataTable data={results} columns={columns} placeholder="" />
            </div>
          )}
          {results == null && <h2 className="mt-8">Keine Ergebnisse</h2>}
        </>
      )}
    </>
  );
}
