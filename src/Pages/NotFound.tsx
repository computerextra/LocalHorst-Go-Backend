import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-9xl mt-72">404</h1>
      <h2 className="mb-12">Die gesuchte Seite exisitert nicht.</h2>
      <Button asChild className="p-8 text-4xl">
        <Link to="/">Zur Startseite</Link>
      </Button>
    </div>
  );
}
