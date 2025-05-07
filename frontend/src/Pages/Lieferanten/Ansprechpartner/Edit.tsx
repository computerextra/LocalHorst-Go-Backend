import { useParams } from "react-router";
import AnsprechpartnerForm from "./ap-form";

export default function EditAp() {
  const { id, aid } = useParams();

  if (aid == null) {
    return <AnsprechpartnerForm lid={parseInt(id!)} />;
  }

  if (aid != null)
    return (
      <AnsprechpartnerForm
        id={aid ? parseInt(aid) : undefined}
        lid={parseInt(id!)}
      />
    );
}
