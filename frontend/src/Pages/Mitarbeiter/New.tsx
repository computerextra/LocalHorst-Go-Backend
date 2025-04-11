import BackButton from "../../Components/BackButton";
import MitarbeiterForm from "./components/MitarbeiterForm";

export default function NeuerMitarbeiter() {
  return (
    <>
      <BackButton href="/Mitarbeiter" />
      <h1>Neuer Mitarbeiter</h1>
      <MitarbeiterForm />
    </>
  );
}
