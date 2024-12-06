import BackButton from "@/components/BackButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAnsprechpartner, getLieferant } from "@/db/Lieferanten";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

export default function APDetails() {
  const { lid, aid } = useParams();

  const {
    data: Lieferant,
    isLoading: LieferantLoading,
    isError: LieferantError,
  } = useQuery({
    queryKey: ["Lieferant", lid],
    queryFn: () => getLieferant({ id: lid ?? "" }),
  });
  const {
    data: Ansprechpartner,
    isLoading: ApLoading,
    isError: ApError,
  } = useQuery({
    queryKey: ["Ansprechpartner", aid],
    queryFn: () => getAnsprechpartner({ id: aid ?? "" }),
  });

  if (LieferantLoading || ApLoading) return <LoadingSpinner />;
  if (LieferantError || ApError) return <>Fehler...</>;

  return (
    <>
      <BackButton href={"/Lieferanten/" + lid} />

      <Card>
        <CardHeader>
          <CardTitle>
            {Ansprechpartner?.Name} - {Lieferant?.Firma}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Mail:{" "}
            <a
              className="underline text-primary"
              href={"mailto:" + Ansprechpartner?.Mail.String}
            >
              {Ansprechpartner?.Mail.String}
            </a>
          </p>
          {Ansprechpartner?.Telefon.Valid && (
            <p>
              Telefon:{" "}
              <a
                className="underline text-primary"
                href={"tel:" + Ansprechpartner?.Telefon.String}
              >
                {Ansprechpartner?.Telefon.String}
              </a>
            </p>
          )}
          {Ansprechpartner?.Mobil.Valid && (
            <p>
              Mobil:{" "}
              <a
                className="underline text-primary"
                href={"tel:" + Ansprechpartner?.Mobil.String}
              >
                {Ansprechpartner?.Mobil.String}
              </a>
            </p>
          )}
        </CardContent>
        <CardFooter className="justify-between">
          <Button asChild>
            <Link to={`/Lieferanten/${lid}/${aid}/Bearbeiten`}>
              Ansprechpartner Bearbeiten
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
