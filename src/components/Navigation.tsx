import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useNavigate } from "react-router";

export function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mt-2">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger onClick={() => navigate("/")}>
            Startseite
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Einkauf</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => navigate("/Einkauf/Eingabe")}>
              Eingabe
            </MenubarItem>
            <MenubarItem onClick={() => navigate("/Einkauf")}>
              Liste
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => navigate("/Einkauf/Abrechnung")}>
              Abrechnung
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Mitarbeiter</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => navigate("/Mitarbeiter")}>
              Übersicht
            </MenubarItem>
            <MenubarItem onClick={() => navigate("/Mitarbeiter/Telefon")}>
              Telefonliste
            </MenubarItem>
            <MenubarItem onClick={() => navigate("/Mitarbeiter/Geburtstag")}>
              Geburtstage
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Sage</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => navigate("/Sage")}>
              CE Archiv
            </MenubarItem>
            <MenubarItem onClick={() => navigate("/Sage/Kunden")}>
              Kundensuche
            </MenubarItem>
            <MenubarItem onClick={() => navigate("/Sage/Lieferanten")}>
              Lieferanten
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => navigate("/Sage/Inventur")}>
              Inventur
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Wiki</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => navigate("/Wiki")}>
              Übersicht
            </MenubarItem>
            <MenubarSeparator />
            {/* TODO: Dynamisch erzeugen! */}
            <MenubarItem onClick={() => navigate("/Wiki/Signaturen")}>
              Signaturen
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => navigate("/Wiki/Zeiterfassung")}>
              Zeiterfassung
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => navigate("/Wiki/Datenschutz")}>
              Datenschutz
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Service</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => navigate("/Service/Seriennummer")}>
              Seriennummer
            </MenubarItem>
            <MenubarItem onClick={() => navigate("/Service/Info")}>
              Info an Kunde
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>CMS</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => navigate("/CMS")}>
              Übersicht
            </MenubarItem>
            <MenubarItem onClick={() => navigate("/CMS/Abteilungen")}>
              Abteilungen
            </MenubarItem>
            <MenubarItem onClick={() => navigate("/CMS/Mitarbeiter")}>
              Mitarbeiter
            </MenubarItem>
            <MenubarItem onClick={() => navigate("/CMS/Partner")}>
              Partner
            </MenubarItem>
            <MenubarItem onClick={() => navigate("/CMS/Angebote")}>
              Angebote
            </MenubarItem>
            <MenubarItem onClick={() => navigate("/CMS/Jobs")}>
              Jobs
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={() => navigate("/Werkstatt")}>
            Werkstatt
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
