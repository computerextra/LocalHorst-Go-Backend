import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./Layout";
import Index from "./Pages/Index";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter basename="/">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Index />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
