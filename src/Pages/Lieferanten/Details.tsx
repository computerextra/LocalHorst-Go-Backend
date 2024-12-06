import BackButton from "@/components/BackButton";
import { DataTable } from "@/components/DataTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Ansprechpartner,
  getAllAnsprechpartnerFromLieferant,
} from "@/db/Lieferanten";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link, useParams } from "react-router";

export default function LieferantenDetails() {
  const { lid } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Lieferant", lid],
    queryFn: () => getAllAnsprechpartnerFromLieferant({ id: lid ?? "" }),
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Fehler...</>;

  const columns: ColumnDef<Ansprechpartner>[] = [
    {
      accessorKey: "Name",
      header: "Name",
      cell: ({ row }) => {
        const mail = row.original;

        return (
          <Link
            className="underline text-primary"
            to={`/Lieferanten/${lid}/${mail.ID}`}
          >
            {mail.Name}
          </Link>
        );
      },
    },
    {
      accessorKey: "Telefon.String",
      header: "Telefon",
      cell: ({ row }) => {
        const mail = row.original;
        return (
          <a
            className="underline text-primary"
            href={`tel:${mail.Telefon.String}`}
            target="_blank"
          >
            {mail.Telefon.String}
          </a>
        );
      },
    },
    {
      accessorKey: "Mobil.String",
      header: "Mobil",
      cell: ({ row }) => {
        const mail = row.original;
        return (
          <a
            className="underline text-primary"
            href={`tel:${mail.Mobil.String}`}
            target="_blank"
          >
            {mail.Mobil.String}
          </a>
        );
      },
    },
    {
      accessorKey: "Mail.String",
      header: "Mail",
      cell: ({ row }) => {
        const mail = row.original;
        return (
          <a
            className="underline text-primary"
            href={`mailto:${mail.Mail.String}`}
            target="_blank"
          >
            {mail.Mail.String}
          </a>
        );
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
                <Link to={`/Lieferanten/${lid}/${payment.ID}/Bearbeiten`}>
                  Bearbeiten
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <BackButton href="/Lieferanten" />
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>{data.Firma}</CardTitle>
            <CardDescription>
              <p>Kundennummer: {data.Kundennummer.String}</p>
              <p className="!p-0 !m-0">
                Webseite:{" "}
                <a
                  href={data.Webseite.String ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  {data.Webseite.String}
                </a>
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <p className="text-3xl font-semibold">Ansprechpartner</p>
              <Button asChild>
                <Link to={`/Lieferanten/${data.ID}/Neu`}>
                  Neuer Ansprechpartner
                </Link>
              </Button>
            </div>
            {data.Ansprechpartner && (
              <DataTable
                columns={columns}
                data={data.Ansprechpartner}
                placeholder="Nach Namen suchen"
                search="Name"
              />
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <Button asChild>
              <Link to={`/Lieferanten/${data.ID}/Bearbeiten`}>
                Lieferant Bearbeiten
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
