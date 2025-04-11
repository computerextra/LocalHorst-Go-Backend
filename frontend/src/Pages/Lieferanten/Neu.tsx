import BackButton from "../../Components/BackButton";
import LieferantenForm from "./components/LieferantenForm";

export default function NeuerLieferant() {
  return (
    <>
      <BackButton href="Lieferant" />
      <h1>Neuen Lieferanten anlegen</h1>
      <LieferantenForm />
    </>
  );
}
