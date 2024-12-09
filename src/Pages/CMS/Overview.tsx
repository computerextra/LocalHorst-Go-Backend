import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCount } from "@/db/cms/Count";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

export default function CmsOverview() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Count"],
    queryFn: getCount,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Datenbank Fehler!</>;

  return (
    <>
      <h1>CMS Übersicht</h1>
      <div className="flex flex-col items-start mt-8">
        <Button asChild variant="link" className="my-2">
          <Link to="/CMS/Abteilungen">
            Abteilungen <Badge>{data?.Abteilung}</Badge>
          </Link>
        </Button>
        <Button asChild variant="link" className="my-2">
          <Link to="/CMS/Angebote">
            Angebote <Badge>{data?.Angebot}</Badge>
          </Link>
        </Button>
        <Button asChild variant="link" className="my-2">
          <Link to="/CMS/Jobs">
            Jobs <Badge>{data?.Jobs}</Badge>
          </Link>
        </Button>
        <Button asChild variant="link" className="my-2">
          <Link to="/CMS/Mitarbeiter">
            Mitarbeiter <Badge>{data?.Mitarbeiter}</Badge>
          </Link>
        </Button>
        <Button asChild variant="link" className="my-2">
          <Link to="/CMS/Partner">
            Partner <Badge>{data?.Partner}</Badge>
          </Link>
        </Button>
      </div>
    </>
  );
}
