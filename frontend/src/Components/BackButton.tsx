import { Link } from "react-router";

export default function BackButton({ href }: { href: string }) {
  return (
    <Link to={href} className="btn btn-secondary mb-2 print:hidden">
      Zurück
    </Link>
  );
}
