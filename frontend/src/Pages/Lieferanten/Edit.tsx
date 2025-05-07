import { useParams } from "react-router";
import LieferantenForm from "./lieferanten-form";

export default function LieferantBearbeiten() {
  const { id } = useParams();

  if (id == null) return <LieferantenForm />;

  return <LieferantenForm id={parseInt(id)} />;
}
