import { Button } from "@/components/ui/button";
import { NavLink, useParams } from "react-router";

export default function DetailMitarbeiter() {
  const { id } = useParams();

  return (
    <>
      <Button asChild>
        <NavLink to={`/mitarbeiter/${id}/edit`}>Bearbeiten</NavLink>
      </Button>
      {id}
    </>
  );
}
