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
import { getJobs, Job } from "@/db/cms/Job";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Cross, MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "Name",
    header: "Name",
  },

  {
    accessorKey: "Online",
    header: "Angezeigt",
    cell: ({ row }) => {
      const x = row.original;
      if (x.Online) return <Check className="text-green-500" />;
      return <Cross className="rotate-45 text-primary" />;
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
              <Link to={`/CMS/Jobs/${payment.ID}`}>Bearbeiten</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function JobsOverview() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["CmsJobs"],
    queryFn: getJobs,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Datenbank Fehler!</>;
  return (
    <>
      <BackButton href="/CMS/" />
      <h1 className="mb-8">CMS - Jobs</h1>
      <Button asChild className="mb-2">
        <Link to="/CMS/Jobs/Neu">Neuen Job</Link>
      </Button>
      {data && (
        <DataTable
          columns={columns}
          data={data}
          placeholder="Suche nach Name"
          search="Name"
        />
      )}
    </>
  );
}
