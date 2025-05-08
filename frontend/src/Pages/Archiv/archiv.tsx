import { SearchArchiv } from "@/api";
import { ArchiveEntry, GetArchivEntry } from "@/api/archiv";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  searchTerm: z.string().min(3),
});

export default function Archiv() {
  const searchMutation = useMutation({
    mutationFn: (searchTerm: string) => SearchArchiv(searchTerm),
    onSuccess: (data) => {
      setResults(data);
    },
    onError: (err) => {
      alert(err);
    },
  });
  const downloadMutation = useMutation({
    mutationFn: (id: string) => GetArchivEntry(id),
  });

  const [results, setResults] = useState<undefined | Array<ArchiveEntry>>(
    undefined
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await searchMutation.mutateAsync(values.searchTerm);
  };

  const handleDownload = async (id: string) => {
    const res = await downloadMutation.mutateAsync(id);
    alert(res);
  };

  const columns: ColumnDef<ArchiveEntry>[] = [
    {
      accessorKey: "Title",
      header: "Datei",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <Button
            variant={"link"}
            onClick={async () => await handleDownload(x.Id.toString())}
          >
            {x.Title}
          </Button>
        );
      },
    },
    {
      accessorKey: "Body",
      header: "Inhalt",
      cell: ({ row }) => {
        const x = row.original;
        return (
          <div className="truncate w-200">
            <p className="text-ellipsis">{x.Body}</p>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <h1 className="text-center">CE Archiv</h1>
      <Form {...form}>
        <form
          className="space-y-8 mt-12 mb-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex w-full items-center space-x-2">
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Suchbegriff" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={searchMutation.isPending}>
              {searchMutation.isPending ? "Sucht ..." : "Suchen"}
            </Button>
          </div>
        </form>
      </Form>
      {searchMutation.isError && <p>{searchMutation.error.message}</p>}

      {searchMutation.isSuccess && results && (
        <DataTable columns={columns} data={results} />
      )}
    </>
  );
}
