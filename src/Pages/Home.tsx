import { Button } from "@/components/ui/button";
import Geburtstage from "./Mitarbeiter/Geburtstage";
import { Link } from "react-router";
import {
  HoverCardContent,
  HoverCardTrigger,
  HoverCard,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.codeinside.eu%2Fassets%2Fmd-images%2F2023-02-11%2Fvitejs.png&f=1&nofb=1&ipt=a2bcbc26c2ec6739c16dd2c021d732696ba4a5d2e01294cd8cffc9a25ff06656&ipo=images"
              alt="Vite Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.codeinside.eu%2Fassets%2Fmd-images%2F2023-02-11%2Fvitejs.png&f=1&nofb=1&ipt=a2bcbc26c2ec6739c16dd2c021d732696ba4a5d2e01294cd8cffc9a25ff06656&ipo=images" />
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              ></line>
              <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
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
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fd%2Fd5%2FTailwind_CSS_Logo.svg%2F1024px-Tailwind_CSS_Logo.svg.png%3F20230715030042&f=1&nofb=1&ipt=60ff6f8d94a2aaf617d09fa6ea6b35a8b4ae4d49700ad61169f48d53f3760c32&ipo=images"
              alt="TailwindCSS Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fd%2Fd5%2FTailwind_CSS_Logo.svg%2F1024px-Tailwind_CSS_Logo.svg.png%3F20230715030042&f=1&nofb=1&ipt=60ff6f8d94a2aaf617d09fa6ea6b35a8b4ae4d49700ad61169f48d53f3760c32&ipo=images" />
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

        {/* TansStack Query */}
        <HoverCard>
          <HoverCardTrigger>
            <img
              className="max-h-[200px] h-[200px] object-contain"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.5yiv9Vk8-ElZeuOiwTP36gAAAA%26pid%3DApi&f=1&ipt=2b6ae3a80190aea8cbabab70d07c5618ed8d7bd22ec45cbb178285af071f7886&ipo=images"
              alt="Tanstack Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.5yiv9Vk8-ElZeuOiwTP36gAAAA%26pid%3DApi&f=1&ipt=2b6ae3a80190aea8cbabab70d07c5618ed8d7bd22ec45cbb178285af071f7886&ipo=images" />
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
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdz2cdn1.dzone.com%2Fstorage%2Ftemp%2F12562442-golang-development-servics.png&f=1&nofb=1&ipt=3b04fad57eddbe4bfb8565c174850e80e3c791bb74b3b900a1dd40e64551fd4e&ipo=images"
              alt="Go Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdz2cdn1.dzone.com%2Fstorage%2Ftemp%2F12562442-golang-development-servics.png&f=1&nofb=1&ipt=3b04fad57eddbe4bfb8565c174850e80e3c791bb74b3b900a1dd40e64551fd4e&ipo=images" />
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
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.cv0eA8UMNYzk_GPLroJTMQAAAA%26pid%3DApi&f=1&ipt=d60e271187fbe6e236b5d163f5b6169fc2b4bb85f011657094b422c7756ee99e&ipo=images"
              alt="Gorilla Mux Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.cv0eA8UMNYzk_GPLroJTMQAAAA%26pid%3DApi&f=1&ipt=d60e271187fbe6e236b5d163f5b6169fc2b4bb85f011657094b422c7756ee99e&ipo=images" />
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
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.M3uPfGiBdf5MYR9mn3S6VAAAAA%26pid%3DApi&f=1&ipt=f92d8ea584dcde27b83143a4b0e6e44721f4290886b8e38318abf45fa5996c91&ipo=images"
              alt="SQLC Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.M3uPfGiBdf5MYR9mn3S6VAAAAA%26pid%3DApi&f=1&ipt=f92d8ea584dcde27b83143a4b0e6e44721f4290886b8e38318abf45fa5996c91&ipo=images" />
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
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foneteamsolutions.in%2Fblogoneteam%2Fwp-content%2Fuploads%2F2020%2F05%2FREACT-JS-KOCHI.png&f=1&nofb=1&ipt=d1a6df0b8c6c820891fe8a3c9a05b5a92c74cd784ba8b9cc1e6ac7645f0a719a&ipo=images"
              alt="React Bild"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foneteamsolutions.in%2Fblogoneteam%2Fwp-content%2Fuploads%2F2020%2F05%2FREACT-JS-KOCHI.png&f=1&nofb=1&ipt=d1a6df0b8c6c820891fe8a3c9a05b5a92c74cd784ba8b9cc1e6ac7645f0a719a&ipo=images" />
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
