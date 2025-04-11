import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./Layout";
import Archive from "./Pages/Archive";
import EinkaufAbrechnung from "./Pages/Einkauf/Abrechnung";
import EinkaufAuswahl from "./Pages/Einkauf/Auswahl";
import EinkaufEingabe from "./Pages/Einkauf/Eingabe";
import Einkaufsliste from "./Pages/Einkauf/Liste";
import Geburtstag from "./Pages/Geburtstag";
import Index from "./Pages/Index";
import Inventur from "./Pages/Inventur";
import NotFound from "./Pages/NotFound";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter basename="/">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="Einkauf">
            <Route index element={<Einkaufsliste />} />
            <Route path="Auswahl" element={<EinkaufAuswahl />} />
            <Route path="Abrechnung" element={<EinkaufAbrechnung />} />
            <Route path=":id" element={<EinkaufEingabe />} />
          </Route>
          <Route path="Mitarbeiter">
            <Route index element={<>Mitarbeiter</>} />
            <Route path="Geburtstag" element={<Geburtstag />} />
            <Route path="Neu" element={<>Neuer MA</>} />
            <Route path=":id">
              <Route index element={<>Mitarbeiter Details</>} />
              <Route path="Bearbeiten" element={<>Mitarbeiter bearbeiten</>} />
            </Route>
          </Route>
          <Route path="Lieferanten">
            <Route index element={<>Lieferantenübersicht</>} />
            <Route path=":id">
              <Route index element={<>Lieferanten Details</>} />
              <Route path="edit" element={<>Lieferant bearbeiten</>} />
              <Route path=":lid" element={<>AP Details</>} />
              <Route path="Neu" element={<>Neuer AP</>} />
            </Route>
            <Route path="Neu" element={<>Neuer Lieferant</>} />
          </Route>
          <Route path="Archiv">
            <Route index element={<Archive />} />
          </Route>
          <Route path="Kunde" element={<>Kunden suche</>} />
          <Route path="Inventur" element={<Inventur />} />
          <Route path="Werkstatt">
            <Route index element={<>Werkstatt</>} />
            <Route path="Software" element={<>Form</>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
