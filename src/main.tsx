import RootLayout from "@/components/RootLayout";
import "@/index.css";
import Abrechnung from "@/Pages/Einkauf/Abrechnung";
import { Auswahl, Eingabe } from "@/Pages/Einkauf/Eingabe";
import EinkaufListe from "@/Pages/Einkauf/Liste";
import Home from "@/Pages/Home";
import AnsprechpartnerBearbeiten from "@/Pages/Lieferanten/Ansprechpartner/Bearbeiten";
import APDetails from "@/Pages/Lieferanten/Ansprechpartner/Details";
import AnsprechpartnerNeu from "@/Pages/Lieferanten/Ansprechpartner/Neu";
import LieferantBearbeiten from "@/Pages/Lieferanten/Berabeiten";
import LieferantenDetails from "@/Pages/Lieferanten/Details";
import LieferantNeu from "@/Pages/Lieferanten/Neu";
import Lieferanten from "@/Pages/Lieferanten/Overview";
import MitarbeiterBearbeiten from "@/Pages/Mitarbeiter/Berabeiten";
import MitarbeiterDetail from "@/Pages/Mitarbeiter/Details";
import Geburtstage from "@/Pages/Mitarbeiter/Geburtstage";
import MitarbeiterNeu from "@/Pages/Mitarbeiter/Neu";
import MitarbeiterOverview from "@/Pages/Mitarbeiter/Overview";
import EditWiki from "@/Pages/Wiki/Bearbeiten";
import WikiDetails from "@/Pages/Wiki/Details";
import NewWiki from "@/Pages/Wiki/Neu";
import Wikis from "@/Pages/Wiki/Overview";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Werkstatt from "./Pages/Werkstatt";
import InventurOverview from "./Pages/Sage/Inventur/Overview";
import Jahr from "./Pages/Sage/Inventur/Jahr";
import Team from "./Pages/Sage/Inventur/Team";
import Teams from "./Pages/Sage/Inventur/Teams";
import KundenSuche from "./Pages/Sage/Kundensuche";
import Archive from "./Pages/Archive/Archive";
import NotFound from "./Pages/NotFound";
import Download from "./Pages/Archive/Download";
import Login from "./Pages/Login";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "posthog-js/react";

// Create a client
const queryClient = new QueryClient();

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      options={options}
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Routes>
              <Route element={<RootLayout />}>
                <Route index element={<Home />} />

                <Route path="Login" element={<Login />} />

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
                  <Route
                    path=":lid/Bearbeiten"
                    element={<LieferantBearbeiten />}
                  />
                  <Route path=":lid/:aid" element={<APDetails />} />
                  <Route
                    path=":lid/:aid/Bearbeiten"
                    element={<AnsprechpartnerBearbeiten />}
                  />
                  <Route path=":lid/Neu" element={<AnsprechpartnerNeu />} />
                </Route>

                <Route path="Sage">
                  <Route index element={<Archive />} />
                  <Route path=":filename" element={<Download />} />
                  <Route path="Suche" element={<KundenSuche />} />

                  <Route path="Inventur">
                    <Route index element={<InventurOverview />} />
                    <Route path=":iyear">
                      <Route index element={<Jahr />} />
                      <Route path="Teams" element={<Teams />} />
                      <Route path="Teams/:iteam" element={<Team />} />
                    </Route>
                  </Route>
                </Route>

                <Route path="Wiki">
                  <Route index element={<Wikis />} />
                  <Route path="Neu" element={<NewWiki />} />
                  <Route path=":wid" element={<WikiDetails />} />
                  <Route path=":wid/Bearbeiten" element={<EditWiki />} />
                </Route>

                <Route path="Werkstatt" element={<Werkstatt />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </PostHogProvider>
  </StrictMode>
);
