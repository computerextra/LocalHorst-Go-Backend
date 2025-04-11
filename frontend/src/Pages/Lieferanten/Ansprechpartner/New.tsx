import { useParams } from "react-router";
import BackButton from "../../../Components/BackButton";
import AnsprechpartnerForm from "./components/ApForm";

export default function ApNew() {
  const { id } = useParams();
  return (
    <>
      <BackButton href={"/Lieferanten/" + id} />
      <h1>Neuen Ansprechpartner anlegen</h1>
      <AnsprechpartnerForm id={id!} />
    </>
  );
}
