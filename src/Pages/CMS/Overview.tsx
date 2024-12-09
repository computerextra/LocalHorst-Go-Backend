import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CmsOverview() {
  return (
    <>
      <h1>CMS Übersicht</h1>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <Button asChild>
          <Link to="/">Abteilungen</Link>
        </Button>
        <Button asChild>
          <Link to="/">Angebote</Link>
        </Button>
        <Button asChild>
          <Link to="/">Jobs</Link>
        </Button>
        <Button asChild>
          <Link to="/">Mitarbeiter</Link>
        </Button>
        <Button asChild>
          <Link to="/">Partner</Link>
        </Button>
      </div>
    </>
  );
}
