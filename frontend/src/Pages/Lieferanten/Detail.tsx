import { GetLieferant } from "@/api";
import { Ansprechpartner } from "@/api/lieferanten";
import BackButton from "@/components/BackButton";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Link, NavLink, useParams } from "react-router";

export default function LieferantDetail() {
  const { id } = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["lieferant", id],
    queryFn: () => GetLieferant(id),
    enabled: !!id,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  const columns: ColumnDef<Ansprechpartner>[] = [
    {
      accessorKey: "Name",
      header: "Name",
      cell: ({ row }) => {
        const y = row.original;

        return (
          <NavLink
            to={`/lieferanten/${id}/${y.id}`}
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

  return (
    <>
      <BackButton href="/lieferanten" />
      <Card>
        <CardHeader>
          <CardTitle>{data?.Firma}</CardTitle>
          <CardDescription>Kundennummer: {data?.Kundennummer}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            Webseite:{" "}
            <a
              href={data?.Webseite}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary"
            >
              {data?.Webseite}
            </a>
          </div>
          <h2>Ansprechpartner</h2>
          <Button asChild className="mb-5 mt-2">
            <Link to={`/lieferanten/${id}/new`}>
              Neuen Ansprechpartner anlegen
            </Link>
          </Button>
          {data?.Ansprechpartner && (
            <DataTable columns={columns} data={data?.Ansprechpartner} />
          )}
        </CardContent>
        <CardFooter>
          <Button asChild>
            <NavLink to={`/lieferanten/${id}/edit`}>Bearbeiten</NavLink>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
