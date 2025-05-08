import { SearchArchiv } from "@/api";
import { ArchiveEntry, GetArchivEntry } from "@/api/archiv";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export default function Archiv() {
  const searchMutation = useMutation({
    mutationFn: (searchTerm: string) => SearchArchiv(searchTerm),
  });
  const downloadMutation = useMutation({
    mutationFn: (id: string) => GetArchivEntry(id),
  });

  const [searchTerm, setSearchTerm] = useState<undefined | string>(undefined);
  const [results, setResults] = useState<undefined | Array<ArchiveEntry>>(
    undefined
  );

  const onSubmit = async () => {
    if (searchTerm == null) {
      alert("Kein Suchbegriff eingegeben");
      return;
    }
    if (searchTerm.length < 3) {
      alert("Suchbegriff muss mindestens 3 Zeichen lang sein.");
      return;
    }

    const res = await searchMutation.mutateAsync(searchTerm);
    setResults(res);
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
      <form className="space-y-8 mt-12" onSubmit={(e) => e.preventDefault()}>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Suchbegriff"
            defaultValue={searchTerm}
            disabled={searchMutation.isPending}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={searchMutation.isPending}
          >
            {searchMutation.isPending ? "Sucht ..." : "Suchen"}
          </Button>
        </div>
      </form>
      {searchMutation.isError && <p>{searchMutation.error.message}</p>}

      {searchMutation.isSuccess && results && (
        <DataTable columns={columns} data={results} />
      )}
    </>
  );
}
