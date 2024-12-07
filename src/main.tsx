import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./components/RootLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MitarbeiterDetail from "./Pages/Mitarbeiter/Details";
import MitarbeiterBearbeiten from "./Pages/Mitarbeiter/Berabeiten";
import MitarbeiterOverview from "./Pages/Mitarbeiter/Overview";
import InfoPage from "./Pages/Service/Info";
import Geburtstage from "./Pages/Mitarbeiter/Geburtstage";
import MitarbeiterNeu from "./Pages/Mitarbeiter/Neu";
import EinkaufListe from "./Pages/Einkauf/Liste";
import Home from "./Pages/Home";
import Abrechnung from "./Pages/Einkauf/Abrechnung";
import { Auswahl, Eingabe } from "./Pages/Einkauf/Eingabe";
import Lieferanten from "./Pages/Lieferanten/Overview";
import LieferantenDetails from "./Pages/Lieferanten/Details";
import LieferantNeu from "./Pages/Lieferanten/Neu";
import LieferantBearbeiten from "./Pages/Lieferanten/Berabeiten";
import APDetails from "./Pages/Lieferanten/Ansprechpartner/Details";
import AnsprechpartnerBearbeiten from "./Pages/Lieferanten/Ansprechpartner/Bearbeiten";
import AnsprechpartnerNeu from "./Pages/Lieferanten/Ansprechpartner/Neu";
import Wikis from "./Pages/Wiki/Overview";
import WikiDetails from "./Pages/Wiki/Details";
import NewWiki from "./Pages/Wiki/Neu";
import EditWiki from "./Pages/Wiki/Bearbeiten";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />

            <Route path="Einkauf">
              <Route index element={<EinkaufListe />} />
              <Route path="Eingabe" element={<Auswahl />} />
              <Route path="Eingabe/:mid" element={<Eingabe />} />
              <Route path="Abrechnung" element={<Abrechnung />} />
            </Route>

            <Route path="Mitarbeiter">
              <Route index element={<MitarbeiterOverview />} />
              <Route path="Geburtstag" element={<Geburtstage />} />
              <Route path="Neu" element={<MitarbeiterNeu />} />
              <Route path=":mid" element={<MitarbeiterDetail />} />
              <Route
                path=":mid/Bearbeiten"
                element={<MitarbeiterBearbeiten />}
              />
            </Route>

            <Route path="Lieferanten">
              <Route index element={<Lieferanten />} />
              <Route path="Neu" element={<LieferantNeu />} />
              <Route path=":lid" element={<LieferantenDetails />} />
              <Route path=":lid/Bearbeiten" element={<LieferantBearbeiten />} />
              <Route path=":lid/:aid" element={<APDetails />} />
              <Route
                path=":lid/:aid/Bearbeiten"
                element={<AnsprechpartnerBearbeiten />}
              />
              <Route path=":lid/Neu" element={<AnsprechpartnerNeu />} />
            </Route>

            <Route path="Sage">
              <Route index element={<>Sage</>} />
              <Route
                path="Suche"
                element={<>Sage Kunden/Lieferanten Suche</>}
              />

              <Route path="Inventur">
                <Route index element={<>Inventur Übersicht der Jahre</>} />
                <Route path=":iyear">
                  <Route index element={<>Inventur Artikel Übersicht</>} />
                  <Route path=":igroup" element={<>Inventur Gruppe</>} />
                </Route>
              </Route>
            </Route>

            <Route path="Wiki">
              <Route index element={<Wikis />} />
              <Route path="Neu" element={<NewWiki />} />
              <Route path=":wid" element={<WikiDetails />} />
              <Route path=":wid/Bearbeiten" element={<EditWiki />} />
            </Route>

            <Route path="Service">
              <Route index element={<>Hier gibts nichts zu sehen!</>} />
              <Route path="Seriennummer" element={<>Service Seriennummer</>} />
              <Route path="Info" element={<InfoPage />} />
            </Route>

            <Route path="CMS">
              <Route index element={<>CMS Übersicht</>} />

              <Route path="Abteilungen">
                <Route index element={<>Abteilungen Übersicht</>} />
                <Route path="Neu" element={<>Neue Abteilung</>} />
                <Route path=":aid" element={<>Abteilung</>} />
                <Route
                  path=":aid/Barbeiten"
                  element={<>Abteilung bearbeiten</>}
                />
              </Route>

              <Route path="Mitarbeiter">
                <Route index element={<>Mitarbeiter Übersicht</>} />
                <Route path="Neu" element={<>Neue Mitarbeiter</>} />
                <Route path=":mid" element={<>Mitarbeiter</>} />
                <Route
                  path=":mid/Barbeiten"
                  element={<>Mitarbeiter bearbeiten</>}
                />
              </Route>

              <Route path="Partner">
                <Route index element={<>Partner Übersicht</>} />
                <Route path="Neu" element={<>Neue Partner</>} />
                <Route path=":pid" element={<>Partner</>} />
                <Route
                  path=":pid/Barbeiten"
                  element={<>Partner bearbeiten</>}
                />
              </Route>

              <Route path="Angebote">
                <Route index element={<>Angebote Übersicht</>} />
                <Route path="Neu" element={<>Neue Angebote</>} />
                <Route path=":aid" element={<>Angebote</>} />
                <Route
                  path=":aid/Barbeiten"
                  element={<>Angebote bearbeiten</>}
                />
              </Route>

              <Route path="Jobs">
                <Route index element={<>Jobs Übersicht</>} />
                <Route path="Neu" element={<>Neue Jobs</>} />
                <Route path=":jid" element={<>Jobs</>} />
                <Route path=":jid/Barbeiten" element={<>Jobs bearbeiten</>} />
              </Route>
            </Route>

            <Route path="Werkstatt" element={<>Werkstatt Form Gen</>} />
          </Route>
          <Route path="*" element={<>Nicht gefunden</>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
