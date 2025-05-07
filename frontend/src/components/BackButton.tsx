import { Link } from "react-router";
import { Button } from "./ui/button";

export default function BackButton({ href = "/" }: { href?: string }) {
  return (
    <Button asChild className="mb-5">
      <Link to={href}>Zurück</Link>
    </Button>
  );
}
