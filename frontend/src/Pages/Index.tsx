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
        <a className="btn btn-primary" href="/Einkauf/Eingabe">
          Einkauf Eingabe
        </a>
        <a className="btn btn-primary" href="/Einkauf">
          Einkaufs Liste
        </a>
        <a
          className="btn btn-primary"
          href="https://www.edeka.de/markt-id/10001842/prospekt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Edeka Blättchen
        </a>
        <a className="btn btn-primary" href="/Mitarbeiter">
          Mitarbeiter Übersicht
        </a>
        <a className="btn btn-primary" href="/Lieferanten">
          Lieferanten Übersicht
        </a>
        <a className="btn btn-primary" href="/Werkstatt">
          Kunden Formular Generierung
        </a>
      </div>
      <h1 className="mt-5 mb-5">Geburtstage</h1>
      <div className="mb-5">
        <GeburtstagsListe />
      </div>
    </>
  );
}
