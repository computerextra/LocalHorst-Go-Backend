import { Link } from "react-router";
import GeburtstagsListe from "../Components/Geburtstagsliste";

export default function Index() {
  return (
    <>
      <h1>Victor App</h1>
      <p className="py-0 !mb-0">
        Hallo und Willkommen auf "VICTOR", der Plattform von Computer Extra.
      </p>
      <p className="py-0">
        Diese App bietet viele Features darunter: Eine Einkaufsliste für das
        morgendliche Frühstück, eine Mitarbeiter Übersicht mit Telefonnummern
        und Mail Adressen, eine Kunden und Lieferanten Suche, die direkt an SAGE
        angeschloßen ist, einen Ersatz für CE Archiv, einen Generator für
        "Kunden Handouts" bezüglich Zugangsdaten von Online Konten und vieles
        mehr.
      </p>
      <h2 className="mb-5">Quicklinks</h2>
      <div className="grid grid-cols-3 gap-8 my-8">
        <Link className="btn btn-primary" to="/Einkauf/Auswahl">
          Einkauf Eingabe
        </Link>
        <Link className="btn btn-primary" to="/Einkauf">
          Einkaufs Liste
        </Link>
        <a
          className="btn btn-primary"
          href="https://www.edeka.de/markt-id/10001842/prospekt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Edeka Blättchen
        </a>
        <Link className="btn btn-primary" to="/Mitarbeiter">
          Mitarbeiter Übersicht
        </Link>
        <Link className="btn btn-primary" to="/Lieferanten">
          Lieferanten Übersicht
        </Link>
        <Link className="btn btn-primary" to="/Werkstatt">
          Kunden Formular Generierung
        </Link>
      </div>
      <h1 className="mt-5 mb-5">Geburtstage</h1>
      <div className="mb-5">
        <GeburtstagsListe />
      </div>
    </>
  );
}
