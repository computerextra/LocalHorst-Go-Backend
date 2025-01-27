import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useNavigate } from "react-router";
import { ModeToggle } from "./mode-toggle";

export function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="flex">
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
              <MenubarItem onClick={() => navigate("/Mitarbeiter/Geburtstag")}>
                Geburtstage
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger onClick={() => navigate("/Lieferanten")}>
              Lieferanten
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger onClick={() => navigate("/Sage")}>
              CE Archiv
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Sage</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => navigate("/Sage/Suche")}>
                Kundensuche
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
                Alle Einträge
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                onClick={() =>
                  navigate("/Wiki/412fc476-f341-457d-a06c-c8d27d4cc165")
                }
              >
                Signaturen
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                onClick={() =>
                  navigate("/Wiki/d320c2bf-24ca-43b8-85a3-96fd9c664944")
                }
              >
                Zeiterfassung
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                onClick={() =>
                  navigate("Wiki/89221838-3219-4a51-aecc-9bc45a05f230")
                }
              >
                Datenschutz
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
      <div className="mt-2 me-4">
        <ModeToggle />
      </div>
    </div>
  );
}
