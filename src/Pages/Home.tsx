import { Button } from "@/components/ui/button";
import Geburtstage from "./Mitarbeiter/Geburtstage";
import { Link } from "react-router";
import {
  HoverCardContent,
  HoverCardTrigger,
  HoverCard,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ViteImage from "@/Assets/Images/VITE.png";
import TailwindImage from "@/Assets/Images/TAILWIND.png";
import TanstackImage from "@/Assets/Images/TANSTACK.png";
import GoImage from "@/Assets/Images/GO.png";
import MuxImage from "@/Assets/Images/MUX.png";
import SQLCImage from "@/Assets/Images/SQLC.png";
import ReactImage from "@/Assets/Images/REACT.png";

export default function Home() {
  return (
    <>
      <h1>VICTOR</h1>
      <p className="py-0 !mb-0 text-sm text-gray-600">
        Hallo und Willkommen auf "VICTOR", der Web Plattform von Computer Extra.
      </p>
      <p className="py-0 !my-0 text-sm text-gray-600">Namensgebung:</p>
      <div className="py-0 !my-0 text-sm text-gray-600">
        <ul>
          <li>
            <b className="font-mono">V</b> - Vite
          </li>
          <li>
            <b className="font-mono">I</b> - Interface (für UI-Komponenten wie
            chadcn/ui)
          </li>
          <li>
            <b className="font-mono">C</b> - CSS (Tailwind CSS)
          </li>
          <li>
            <b className="font-mono">T</b> - TanStack Query
          </li>
          <li>
            <b className="font-mono">O</b> - Orchestrierung (Go, Gorilla Mux &
            SQLC)
          </li>
          <li>
            <b className="font-mono">R</b> - React
          </li>
        </ul>
      </div>
      <p className="py-0 !my-0 text-sm text-gray-600">
        Diese Web App bietet viele Features darunter: Eine Einkaufsliste für das
        morgendliche Frühstück, eine Mitarbeiter Übersicht mit Telefonnummern
        und Mail Adressen, eine Kunden und Lieferanten Suche, die direkt an SAGE
        angeschloßen ist, einen Ersatz für CE Archiv, ein Wiki zum erläutern von
        Funktionen innerhalb der Web App und des Unternehmens, einen Generator
        für "Kunden Handouts" bezüglich Zugangsdaten von Online Konten und
        vieles mehr.
      </p>
      <p className="pb-0 !mb-0 !mt-0 text-sm text-gray-600">
        Diese Web App nutzt folgende Technologien:
      </p>
      <div className="grid grid-cols-8 gap-8 mb-8">
        {/* Vite */}
        <HoverCard>
          <HoverCardTrigger>
            <img
              className="max-h-[200px] h-[200px] object-contain"
              src={ViteImage}
              alt="Vite Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={ViteImage} />
                <AvatarFallback>VJ</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Vite</h4>
                <p className="text-sm">
                  Vite (französisches Wort für "schnell", ausgesprochen [/vit/],
                  wie "veet") ist eine neue Art von Frontend-Build-Tool, das die
                  Erfahrung bei der Frontend-Entwicklung erheblich verbessert.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* ChadCN */}
        <HoverCard>
          <HoverCardTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="w-[200px] h-[200px]"
            >
              <rect width="256" height="256" fill="none"></rect>
              <line
                x1="208"
                y1="128"
                x2="128"
                y2="208"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              ></line>
              <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              ></line>
            </svg>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>CH</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">chadcn/ui</h4>
                <p className="text-sm">
                  Wunderschön gestaltete Komponenten, die Sie kopieren und in
                  Ihre Apps einfügen können. Erstellt mit Tailwind CSS. Open
                  Source.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* Tailwind CSS */}
        <HoverCard>
          <HoverCardTrigger>
            <img
              className="max-h-[200px] h-[200px] object-contain"
              src={TailwindImage}
              alt="TailwindCSS Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={TailwindImage} />
                <AvatarFallback>TW</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Tailwind CSS</h4>
                <p className="text-sm">
                  Tailwind CSS ist ein Open-Source-CSS-Framework. Im Gegensatz
                  zu anderen Frameworks, wie Bootstrap, bietet es keine Reihe
                  vordefinierter Klassen für Elemente wie Schaltflächen oder
                  Tabellen. Stattdessen erstellt es eine Liste
                  „utility“-CSS-Klassen, mit denen jedes Element durch Mischen
                  und Anpassen gestaltet werden kann.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* TanStack Query */}
        <HoverCard>
          <HoverCardTrigger>
            <img
              className="max-h-[200px] h-[200px] object-contain"
              src={TanstackImage}
              alt="Tanstack Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={TanstackImage} />
                <AvatarFallback>TS</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">TanStack Query</h4>
                <p className="text-sm">
                  Leistungsstarkes asynchrones Statusmanagement für TS/JS,
                  React, Solid, Vue, Svelte und Angular
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* GO Lang */}
        <HoverCard>
          <HoverCardTrigger>
            <img
              className="max-h-[200px] h-[200px] object-cover"
              src={GoImage}
              alt="Go Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={GoImage} />
                <AvatarFallback>GO</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Go</h4>
                <p className="text-sm">
                  Go (auch Golang) ist eine kompilierbare Programmiersprache,
                  die Nebenläufigkeit und automatische Speicherbereinigung
                  unterstützt. Entwickelt wurde Go von Mitarbeitern des
                  Unternehmens Google Inc.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* Gorilla */}
        <HoverCard>
          <HoverCardTrigger>
            <img
              className="max-h-[200px] h-[200px] object-contain"
              src={MuxImage}
              alt="Gorilla Mux Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={MuxImage} />
                <AvatarFallback>GM</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Gorilla Mux</h4>
                <p className="text-sm">
                  implementiert einen Anforderungsrouter und -dispatcher zum
                  Zuordnen eingehender Anforderungen zu den jeweiligen Handlern.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* SQLC */}
        <HoverCard>
          <HoverCardTrigger>
            <img
              className="max-h-[200px]  h-[200px] object-contain"
              src={SQLCImage}
              alt="SQLC Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={SQLCImage} />
                <AvatarFallback>SQ</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">SQLC</h4>
                <p className="text-sm">Generiert typsicheren Code aus SQL</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* React */}
        <HoverCard>
          <HoverCardTrigger>
            <img
              className="max-h-[200px] h-[200px] object-cover"
              src={ReactImage}
              alt="React Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={ReactImage} />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">React</h4>
                <p className="text-sm">
                  React ist eine JavaScript-Programmbibliothek zur Erstellung
                  von webbasierten Benutzeroberflächen.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <h2 className="mb-5">Quicklinks</h2>
      <div className="grid grid-cols-4 gap-8 my-8">
        <Button asChild>
          <Link to="/Einkauf/Eingabe">Einkauf Eingabe</Link>
        </Button>
        <Button asChild>
          <Link to="/Einkauf">Einkaufs Liste</Link>
        </Button>
        <Button asChild>
          <a
            href="https://www.edeka.de/markt-id/10001842/prospekt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edeka Blättchen
          </a>
        </Button>
        <Button asChild>
          <Link to="/Mitarbeiter">Mitarbeiter Übersicht</Link>
        </Button>
        <Button asChild>
          <Link to="/Lieferanten">Lieferanten Übersicht</Link>
        </Button>
        <Button asChild>
          <Link to="/Wiki">Wiki</Link>
        </Button>
        <Button asChild>
          <Link to="/Sage/Suche">Sage Suche</Link>
        </Button>
        <Button asChild>
          <Link to="/Werkstatt">Kunden Formular Generierung</Link>
        </Button>
      </div>
      <h2>Letzte Wiki Einträge</h2>
      <div className="grid grid-cols-4 gap-8 my-8"></div>
      <Geburtstage />
    </>
  );
}
