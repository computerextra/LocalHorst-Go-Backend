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
import { getAbteilungen } from "@/db/cms/Abteilung";
import { getAllMitarbeiter, Mitarbeiter } from "@/db/cms/Mitarbeiter";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Cross, MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

export default function MitarbeiterOverview() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["CmsMitarbeiter"],
    queryFn: getAllMitarbeiter,
  });
  const {
    data: Abteilungen,
    isLoading: AbteilungLoading,
    isError: AbteilungError,
  } = useQuery({
    queryKey: ["Abteilungen"],
    queryFn: getAbteilungen,
  });

  if (isLoading || AbteilungLoading) return <LoadingSpinner />;
  if (isError || AbteilungError) return <>Datenbank Fehler!</>;

  const columns: ColumnDef<Mitarbeiter>[] = [
    {
      accessorKey: "Name",
      header: "Name",
    },
    {
      accessorKey: "Short",
      header: "Short",
    },
    {
      accessorKey: "Sex",
      header: "Sex",
      cell: ({ row }) => {
        const x = row.original;
        return <p>{x.Sex == "m" ? "Männlich" : "Weiblich"}</p>;
      },
    },
    {
      accessorKey: "Image",
      header: "Image",
      cell: ({ row }) => {
        const x = row.original;
        if (x.Image) return <Check className="text-green-500" />;
        return <Cross className="rotate-45 text-primary" />;
      },
    },
    {
      accessorKey: "Focus",
      header: "Focus",
    },
    {
      accessorKey: "Tags",
      header: "Tags",
    },
    {
      id: "Abteilung",
      header: "Abteilung",
      cell: ({ row }) => {
        const x = row.original;
        const Abteilung = Abteilungen?.find((y) => y.ID == x.Abteilungid);
        if (Abteilung) {
          return <p>{Abteilung.Name}</p>;
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
                <Link to={`/CMS/Mitarbeiter/${payment.ID}`}>Bearbeiten</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <BackButton href="/CMS/" />
      <h1 className="mb-8">CMS - Mitarbeiter</h1>
      <Button asChild className="mb-2">
        <Link to="/CMS/Mitarbeiter/Neu">Neuen Mitarbeiter</Link>
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
