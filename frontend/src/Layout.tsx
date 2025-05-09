import { Suspense } from "react";
import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="container mx-auto">
        <div className="print:hidden">
          <Suspense fallback="Bin Laden...">
            <Navbar />
          </Suspense>
        </div>
        <div className="my-5">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}
