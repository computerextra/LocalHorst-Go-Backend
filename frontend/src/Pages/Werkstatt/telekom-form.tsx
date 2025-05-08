import { FindeKunde, type HandoutKunde } from "@/api/kunden";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { z } from "zod";

const Fragen = z.enum([
  "Wie lautet der Beruf Ihres Großvaters?",
  "Wo haben Sie Ihren Partner kennengelernt?",
  "Wie lautet der Name Ihrer Grundschule?",
  "Wie lautet Ihre Lieblingsfigur aus der Geschichte?",
  "Wie lautet der Name Ihrer Grundschule?",
  "Was ist Ihr Lieblingshobby?",
  "Wie lautet der Geburtsname Ihrer Mutter?",
  "Welche ist Ihre Lieblingsmannschaft?",
  "Was war Ihr erstes Auto?",
  "Wie hieß der beste Freund aus Ihrer Kindheit?",
  "Wie heißt oder hieß Ihr erstes Haustier?",
  "Wie ist der Name Ihres Lieblingslehrers?",
  "Wie hieß der Titel Ihres ersten Musik-Albums?",
  "Was war Ihr erstes Faschingskostüm?",
  "Wie hieß Ihr erstes Buch?",
  "Wie hieß Ihr erstes Plüschtier?",
  "Wo waren Sie bei Ihrem ersten Kuss?",
  "Was war Ihr schönstes Weihnachtsgeschenk?",
  "Wie heißt die Antwort auf die Frage aller Fragen?",
]);

export default function TelekomForm() {
  const mutation = useMutation({
    mutationFn: (kundennummer: string) => FindeKunde(kundennummer),
    onSuccess: (data) => setKundendaten(data),
  });

  const [Benutzername, setBenutzername] = useState<string | undefined>(
    undefined
  );
  const [Passwort, setPasswort] = useState<string | undefined>(undefined);
  const [Kundennummer, setKundennummer] = useState<string | undefined>(
    undefined
  );

  const [Mobil, setMobil] = useState<string | undefined>(undefined);
  const [Antwort, setAntwort] = useState<string | undefined>(undefined);
  const [Geburtstag, setGeburtstag] = useState<Date | undefined>(undefined);
  const [Sicherheitsfrage, setSicherheitsfrage] = useState<
    z.infer<typeof Fragen>
  >("Wie heißt die Antwort auf die Frage aller Fragen?");

  const [Kundendaten, setKundendaten] = useState<undefined | HandoutKunde>();

  useEffect(() => {
    if (Kundennummer == null || Kundennummer.length < 7) return;
    mutation.mutate(Kundennummer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Kundennummer]);

  return (
    <>
      <div className="print:hidden">
        <form onSubmit={window.print} className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Benutzername">Benutzername</Label>
            <Input
              required
              type="text"
              id="Benutzername"
              placeholder="Benutzername"
              defaultValue={Benutzername}
              onChange={(e) => setBenutzername(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Passwort">Passwort</Label>
            <Input
              required
              type="text"
              id="Passwort"
              placeholder="Passwort"
              defaultValue={Passwort}
              onChange={(e) => setPasswort(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Mobil">Mobil</Label>
            <Input
              required
              type="text"
              id="Mobil"
              placeholder="Mobil"
              defaultValue={Mobil}
              onChange={(e) => setMobil(e.target.value)}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Geburtstag">Geburtstag</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="Geburtstag"
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !Geburtstag && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {Geburtstag ? (
                    format(Geburtstag, "PPP", { locale: de })
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <DayPicker
                  locale={de}
                  captionLayout={"dropdown"}
                  mode="single"
                  selected={Geburtstag}
                  onSelect={setGeburtstag}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Sicherheitsfrage">Sicherheitsfrage</Label>
            <Select
              defaultValue={Sicherheitsfrage}
              onValueChange={(e) => {
                const res = Fragen.parse(e);
                setSicherheitsfrage(res);
              }}
            >
              <SelectTrigger id="Sicherheitsfrage">
                <SelectValue placeholder="Bitte wählen..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Anwendungen</SelectLabel>
                  {Object.keys(Fragen.enum).map((x) => (
                    <SelectItem value={x} key={x}>
                      {x}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Passwort">Antwort</Label>
            <Input
              required
              type="text"
              id="Antwort"
              placeholder="Antwort"
              defaultValue={Antwort}
              onChange={(e) => setAntwort(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Kundennummer">Kundennummer</Label>
            <Input
              required
              type="text"
              id="Kundennummer"
              placeholder="Kundennummer"
              defaultValue={Kundennummer}
              onChange={(e) => setKundennummer(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Kundendaten">Kundendaten</Label>
            <Input
              required
              type="text"
              id="Kundendaten"
              disabled
              placeholder="Kundendaten"
              value={
                Kundendaten && `${Kundendaten.Vorname} ${Kundendaten.Name}`
              }
            />
          </div>

          <Button type="submit">Drucken</Button>
        </form>
      </div>
      <div className="hidden print:block" data-theme="light">
        <div className="mt-24">
          <h1 className="text-center">Telekom E-Mail Zugangsdaten</h1>
          <img
            src="/images/telekom.jpg"
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
          />
          <div className="text-center">
            <p id="print-p1">
              Für: <br />
              {Kundennummer} - {Kundendaten?.Vorname} {Kundendaten?.Name} <br />
              <b>Benutzername:</b>
              <br />
              {Benutzername} <br />
              <b>Passwort:</b>
              <br />
              {Passwort} <br />
              <b>Mobilfunk:</b>
              <br />
              {Mobil} <br />
              <b>Geburtstag:</b>
              <br />
              {new Date(Geburtstag!).toLocaleDateString("de-DE")} <br />
              <b>Sicherheitsfrage:</b>
              <br />
              {Sicherheitsfrage} <br />
              <b>Antwort:</b> {Antwort}
            </p>
            <div className="max-w-[40%] mx-auto mt-4">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, wenn Sie sich erneut bei Telekom anmelden möchten.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
