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
import KundenSuche from "./Pages/KundenSuche";
import ApDetails from "./Pages/Lieferanten/Ansprechpartner/Details";
import ApNew from "./Pages/Lieferanten/Ansprechpartner/New";
import LieferantBearbeiten from "./Pages/Lieferanten/Bearbeiten";
import LieferantDetails from "./Pages/Lieferanten/Lieferant";
import NeuerLieferant from "./Pages/Lieferanten/Neu";
import Lieferantenübersicht from "./Pages/Lieferanten/Overview";
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
            <Route index element={<Lieferantenübersicht />} />
            <Route path="Neu" element={<NeuerLieferant />} />
            <Route path=":id">
              <Route index element={<LieferantDetails />} />
              <Route path="edit" element={<LieferantBearbeiten />} />
              <Route path="Neu" element={<ApNew />} />
              <Route path=":lid">
                <Route index element={<ApDetails />} />
              </Route>
            </Route>
          </Route>
          <Route path="Archiv">
            <Route index element={<Archive />} />
          </Route>
          <Route path="Kunde" element={<KundenSuche />} />
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
