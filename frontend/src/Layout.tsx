import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="container mx-auto">
        <div className="print:hidden">
          <Navbar />
        </div>
        <div className="mt-5">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}
