import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { themeChange } from "theme-change";
import { Firma, Internet } from "../wailsjs/go/main/App";
import { Themes } from "./themes";

export default function Layout() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <main className="bg-base-100 text-base-content min-h-[100vh] print:min-h-min print:bg-neutral print:text-neutral-content antialiased">
      <div className="shadow-sm navbar bg.bas-100 print:!hidden">
        <div className="flex-1">
          <Link to="/" className="text-xl btn btn-ghost">
            Viktor App
          </Link>
        </div>
        <div className="flex-none">
          <NavLinks />
        </div>
      </div>
      <div className="container mx-auto mt-5 print:block print:mt-0 print:w-full">
        <Outlet />
      </div>
    </main>
  );
}

function ThemeSwitcher() {
  return (
    <details className="dropdown">
      <summary>Theme</summary>
      <ul className="z-50 p-2 rounded-t-none bg-base-100 ">
        <div className="overflow-y-auto max-h-44">
          {Themes.map((theme) => (
            <li key={theme.name}>
              <a
                className="gap-3 px-2"
                data-set-theme={theme.name}
                data-act-class="ACTIVECLASS"
              >
                <div
                  className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm"
                  data-theme={theme.name}
                >
                  <div className="rounded-full bg-base-content size-1"></div>
                  <div className="rounded-full bg-primary size-1"></div>
                  <div className="rounded-full bg-secondary size-1"></div>
                  <div className="rounded-full bg-accent size-1"></div>
                </div>
                <div className="w-32 truncate">{theme.title}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="invisible w-3 h-3 shrink-0"
                >
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                </svg>
              </a>
            </li>
          ))}
        </div>
      </ul>
    </details>
  );
}

function NavLinks() {
  const [firma, setFirma] = useState<boolean>();
  const [internet, setInternet] = useState<boolean>();

  useEffect(() => {
    async function x() {
      const firm = await Firma();
      if (firm) {
        setFirma(true);
      } else {
        setFirma(false);
      }
      const inten = await Internet();
      if (inten) {
        setInternet(true);
      } else {
        setInternet(false);
      }
    }
    x();
  }, []);
  return (
    <ul className="px-1 menu menu-horizontal">
      <li>
        <ThemeSwitcher />
      </li>
      {internet && (
        <li>
          <details className="dropdown">
            <summary>Einkauf</summary>
            <ul className="p-2 rounded-t-none bg-base-100">
              <li>
                <Link to="Einkauf/Eingabe">Eingabe</Link>
              </li>
              <li>
                <Link to="Einkauf">Liste</Link>
              </li>
              <li>
                <Link to="Einkauf/Abrechnung">Abrechnung</Link>
              </li>
            </ul>
          </details>
        </li>
      )}
      {internet && (
        <li>
          <details className="dropdown">
            <summary>Mitarbeiter</summary>
            <ul className="p-2 rounded-t-none bg-base-100">
              <li>
                <Link to="Mitarbeiter">Übersicht</Link>
              </li>
              <li>
                <Link to="Mitarbeiter/Geburtstag">Geburtstage</Link>
              </li>
            </ul>
          </details>
        </li>
      )}
      {internet && (
        <li>
          <Link to="Lieferanten">Lieferanten</Link>
        </li>
      )}
      {firma && (
        <li>
          <Link to="Archiv">CE Archiv</Link>
        </li>
      )}
      {firma && (
        <li>
          <Link to="Kunde">Kundensuche</Link>
        </li>
      )}
      {firma && (
        <li>
          <Link to="Inventur">Inventur</Link>
        </li>
      )}
      <li>
        <Link to="Werkstatt">Werkstatt</Link>
      </li>
    </ul>
  );
}
