import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./Layout";
import Liste from "./Pages/Einkauf/Liste";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import DetailMitarbeiter from "./Pages/Mitarbeiter/Detail";
import EditMitarbeiter from "./Pages/Mitarbeiter/Edit";
import GeburtstagMitarbeiter from "./Pages/Mitarbeiter/Geburtstag";
import NewMitarbeiter from "./Pages/Mitarbeiter/New";
import MitarbeiterOverview from "./Pages/Mitarbeiter/Overview";
import Register from "./Pages/Register";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter basename="/">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="einkauf">
              <Route index element={<Liste />} />
              <Route path="rechnung" element={<>Rechnung</>} />
              <Route path="eingabe" element={<>Eingabe</>} />
            </Route>
            <Route path="mitarbeiter">
              <Route index element={<MitarbeiterOverview />} />
              <Route path="new" element={<NewMitarbeiter />} />
              <Route path="geburtstag" element={<GeburtstagMitarbeiter />} />
              <Route path=":id" element={<DetailMitarbeiter />} />
              <Route path=":id/edit" element={<EditMitarbeiter />} />
            </Route>
            <Route path="lieferanten">
              <Route index element={<>Lieferanten Übersicht</>} />
              <Route path="new" element={<>Neuer Lieferant</>} />
              <Route path=":id">
                <Route index element={<>Lieferant Detail</>} />
                <Route path="edit" element={<>Lieferant Edit</>} />
                <Route path="ap">
                  <Route index element={<>Ansprechpartner Übersicht</>} />
                  <Route path="new" element={<>Neuer Ansprechpartner</>} />
                  <Route path=":aid" element={<>Ansprechpartner Detail</>} />
                  <Route
                    path=":aid/edit"
                    element={<>Ansprechpartner bearbeiten</>}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="archiv" element={<>Archiv</>} />
            <Route path="suche" element={<>Kundensuche</>} />
            <Route path="inventur" element={<>Inventur</>} />
            <Route path="werkstatt" element={<>Werkstatt</>} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
