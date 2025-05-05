import { useParams } from "react-router";
import MitarbeiterForm from "./mitarbeiter-form";

export default function EditMitarbeiter() {
  const { id } = useParams();

  if (id == null) return <MitarbeiterForm />;

  return <MitarbeiterForm id={parseInt(id)} />;
}
