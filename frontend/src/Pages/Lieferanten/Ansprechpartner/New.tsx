import { useParams } from "react-router";
import AnsprechpartnerForm from "./ap-form";

export default function NeuerAp() {
  const { id } = useParams();

  return <AnsprechpartnerForm lid={parseInt(id!)} />;
}
