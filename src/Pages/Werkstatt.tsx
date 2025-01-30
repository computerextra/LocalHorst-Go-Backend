import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import GdataLogo from "@/Assets/Images/GDATA.png";
import MSLogo from "@/Assets/Images/MS.jpg";
import TelekomLogo from "@/Assets/Images/TELEKOM.jpg";
import GoogleLogo from "@/Assets/Images/Google__G__logo.svg.png";
import AppleLogo from "@/Assets/Images/Apple_logo_black.svg.png";
import AOMEILogo from "@/Assets/Images/LOGO2.png";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { z } from "zod";
import { getKunde } from "@/db/sage/Kunde";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { de } from "date-fns/locale";

const Selectable = z.enum([
  "GData",
  "Microsoft",
  "AOMEI",
  "Google",
  "Apple",
  "Telekom",
]);
type Selectable = z.infer<typeof Selectable>;

export default function Werkstatt() {
  const [selected, setSelected] = useState<undefined | Selectable>(undefined);

  const getSelectedForm = () => {
    switch (selected) {
      case "AOMEI":
        return <AOMEIForm />;
      case "Apple":
        return <AppleForm />;
      case "GData":
        return <GDataForm />;
      case "Google":
        return <GoogleForm />;
      case "Microsoft":
        return <MicrosoftForm />;
      case "Telekom":
        return <TelekomForm />;
    }
  };

  return (
    <>
      <h1 className="my-8">Kunden Handout für Zugangsdaten</h1>
      {selected && <h2 className="mb-8">Akutell gewählt: {selected}</h2>}
      <Select
        value={selected}
        onValueChange={(e) => {
          const res = Selectable.safeParse(e);
          if (res.success) {
            setSelected(res.data);
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bitte Auswählen" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Formulare</SelectLabel>
            <SelectItem value="Apple">Apple</SelectItem>
            <SelectItem value="Microsoft">Microsoft</SelectItem>
            <SelectItem value="Google">Google</SelectItem>
            <SelectItem value="Telekom">Telekom</SelectItem>
            <SelectItem value="AOMEI">AOMEI</SelectItem>
            <SelectItem value="GData">G Data</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Forms */}
      <div className="mt-8 max-w-[40%]">{selected && getSelectedForm()}</div>
    </>
  );
}

function GDataForm() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const Versionen = [
    "Anti-Virus",
    "MES",
    "InternetSecurity",
    "Internet Security Attached",
    "Mobile Internet Security",
    "Mobile Security",
    "Total Security",
  ];
  const formSchema = z.object({
    Benutzername: z.string(),
    Passwort: z.string(),
    Version: z.string(),
    Benutzer: z.string(),
    Lizenz: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit() {
    reactToPrintFn();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Benutzername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benutzername</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Passwort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Version"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produkt Version</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte Wählen!" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Versionen.map((x, idx) => (
                      <SelectItem key={idx} value={x}>
                        {x}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Benutzer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anzahl der Benutzer</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Lizenz"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lizenz Key</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Drucken</Button>
        </form>
      </Form>
      <div className="sr-only">
        <div className="mt-24" ref={contentRef}>
          <h1 className="text-center">
            G Data {form.getValues().Version} Zugangsdaten
          </h1>

          <img
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
            src={GdataLogo}
            alt="G Data Logo"
          />

          <div className="mt-8 text-center">
            <p>
              G Data {form.getValues().Version} für {form.getValues().Benutzer}{" "}
              Benutzer
            </p>
            <p>
              <b>Lizenzschlüssel:</b>
              <br />
              {form.getValues().Lizenz}
            </p>
            <p>
              <b>Benutzername:</b>
              <br />
              {form.getValues().Benutzername}
            </p>
            <p>
              <b>Passwort:</b>
              <br />
              {form.getValues().Passwort}
            </p>
            <div className="max-w-[40%] mx-auto mt-8">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, wenn Sie sich erneut in G Data anmelden möchten.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MicrosoftForm() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [name, setName] = useState<string | undefined>(undefined);

  const formSchema = z.object({
    Benutzername: z.string(),
    Passwort: z.string(),
    Kundennummer: z.string(),
    Email: z.string().optional(),
    Mobil: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit() {
    // Kundendaten aus Sage ziehen?
    const res = await getKunde({ Kundennummer: form.getValues().Kundennummer });
    if (res) {
      setName(`${res.Vorname} ${res.Name}`);
    }
    if (name != undefined) reactToPrintFn();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Kundennummer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kundennummer des Kunden</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Benutzername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benutzername</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Passwort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail Adresse (optional)</FormLabel>
                <FormControl>
                  <Input required={false} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Mobil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Handynummer (Optional)</FormLabel>
                <FormControl>
                  <Input required={false} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {name ? "Drucken" : "Kundeninfo aus Sage ziehen"}
          </Button>
        </form>
      </Form>
      <div className="sr-only">
        <div className="mt-24" ref={contentRef}>
          <h1 className="text-center">Microsoft Zugangsdaten</h1>

          <img
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
            src={MSLogo}
            alt="Microsoft 365 Logo"
          />

          <div className="mt-4 text-center">
            <p>
              <b>Kundennummer:</b>
              <br />
              {form.getValues().Kundennummer}
            </p>
            <p>
              <b>Name:</b>
              <br />
              {name}
            </p>
            <p>
              <b>Benutzername:</b>
              <br />
              {form.getValues().Benutzername}
            </p>
            <p>
              <b>Passwort:</b>
              <br />
              {form.getValues().Passwort}
            </p>

            {form.getValues().Email && (
              <p>
                <b>Alternative E-Mail Adresse:</b>
                <br />
                {form.getValues().Email}
              </p>
            )}
            {form.getValues().Mobil && (
              <p>
                <b>Mobilfunk:</b>
                <br />
                {form.getValues().Mobil}
              </p>
            )}
            <div className="max-w-[40%] mx-auto mt-8">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, um sich in Microsoft Office anzumelden.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AOMEIForm() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const formSchema = z.object({
    Lizenz: z.string(),
    Gerätenummer: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit() {
    reactToPrintFn();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Lizenz"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lizenznummmer</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Gerätenummer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gerätenummer</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Drucken</Button>
        </form>
      </Form>
      <div className="sr-only">
        <div className="mt-24" ref={contentRef}>
          <h1 className="text-center">
            AOMEI Backupper Pro <br />
            für 2 Computer
          </h1>

          <img
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
            src={AOMEILogo}
            alt="AOMEI Logo"
          />

          <div className="mt-12 text-center">
            <p>
              <b>Lizenzschlüssel:</b>
              <br />
              {form.getValues().Lizenz}
            </p>
            <p>
              <b>Installiert auf Gerät:</b>
              <br />
              {form.getValues().Gerätenummer}
            </p>

            <div className="max-w-[40%] mx-auto mt-12">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, wenn Sie ein weiteres Gerät anmelden möchten.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function GoogleForm() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [name, setName] = useState<string | undefined>(undefined);

  const formSchema = z.object({
    Benutzername: z.string(),
    Passwort: z.string(),
    Kundennummer: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit() {
    // Kundendaten aus Sage ziehen?
    const res = await getKunde({ Kundennummer: form.getValues().Kundennummer });
    if (res) {
      setName(`${res.Vorname} ${res.Name}`);
    }
    if (name != undefined) reactToPrintFn();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Kundennummer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kundennummer des Kunden</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Benutzername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benutzername</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Passwort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {name ? "Drucken" : "Kundeninfo aus Sage ziehen"}
          </Button>
        </form>
      </Form>
      <div className="sr-only">
        <div className="mt-24" ref={contentRef}>
          <h1 className="text-center">Google Zugangsdaten</h1>

          <img
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
            src={GoogleLogo}
            alt="Google Logo"
          />

          <div className="text-center">
            <p>Für:</p>
            <p>
              <b>Kundennummer:</b>
              <br />
              {form.getValues().Kundennummer}
            </p>
            <p>
              <b>Name:</b>
              <br />
              {name}
            </p>
            <p>
              <b>Benutzername:</b>
              <br />
              {form.getValues().Benutzername}
            </p>
            <p>
              <b>Passwort:</b>
              <br />
              {form.getValues().Passwort}
            </p>
            <div className="max-w-[40%] mx-auto mt-8">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, um sich bei Google anzumelden.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AppleForm() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [name, setName] = useState<string | undefined>(undefined);

  const formSchema = z.object({
    Benutzername: z.string(),
    Passwort: z.string(),
    Kundennummer: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit() {
    // Kundendaten aus Sage ziehen?
    const res = await getKunde({ Kundennummer: form.getValues().Kundennummer });
    if (res) {
      setName(`${res.Vorname} ${res.Name}`);
    }
    if (name != undefined) reactToPrintFn();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Kundennummer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kundennummer des Kunden</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Benutzername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benutzername</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Passwort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {name ? "Drucken" : "Kundeninfo aus Sage ziehen"}
          </Button>
        </form>
      </Form>
      <div className="sr-only">
        <div className="mt-24" ref={contentRef}>
          <h1 className="text-center">Apple ID Zugangsdaten</h1>

          <img
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
            src={AppleLogo}
            alt="Google Logo"
          />

          <div className="text-center">
            <p>Für:</p>
            <p>
              <b>Kundennummer:</b>
              <br />
              {form.getValues().Kundennummer}
            </p>
            <p>
              <b>Name:</b>
              <br />
              {name}
            </p>
            <p>
              <b>Benutzername:</b>
              <br />
              {form.getValues().Benutzername}
            </p>
            <p>
              <b>Passwort:</b>
              <br />
              {form.getValues().Passwort}
            </p>
            <div className="max-w-[40%] mx-auto mt-8">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, um sich bei Apple anzumelden.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const SicherheitsfragenTelekom = [
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
];

function TelekomForm() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [name, setName] = useState<string | undefined>(undefined);

  const formSchema = z.object({
    Benutzername: z.string(),
    Passwort: z.string(),
    Kundennummer: z.string(),
    Sicherheitsfrage: z.string(),
    Antwort: z.string(),
    Mobilfunk: z.string(),
    Geburtstag: z.date({
      required_error: "Bitte geben Sie ein gültiges Datum ein",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit() {
    // Kundendaten aus Sage ziehen?
    const res = await getKunde({ Kundennummer: form.getValues().Kundennummer });
    if (res) {
      setName(`${res.Vorname} ${res.Name}`);
    }
    if (name != undefined) reactToPrintFn();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Kundennummer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kundennummer des Kunden</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Benutzername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benutzername</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Passwort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Sicherheitsfrage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sicherheitsfrage</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte Wählen!" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SicherheitsfragenTelekom.map((x, idx) => (
                      <SelectItem key={idx} value={x}>
                        {x}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Antwort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Antwort auf Sicherheitsfrage</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Mobilfunk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobilfunk</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Geburtstag"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Geburtstag</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPPP", { locale: de })
                        ) : (
                          <span>Bitte Datum auswählen</span>
                        )}{" "}
                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={de}
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      fromYear={1920}
                      toYear={new Date().getFullYear()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {name ? "Drucken" : "Kundeninfo aus Sage ziehen"}
          </Button>
        </form>
      </Form>
      <div className="sr-only">
        <div className="mt-24" ref={contentRef}>
          <h1 className="text-center">Telekom E-Mail Zugangsdaten</h1>

          <img
            className="object-contain w-auto h-[30vh] mx-auto mt-12"
            src={TelekomLogo}
            alt="Telekom Webmail Logo"
          />

          <div className="text-center">
            <p>
              Für: <br />
              <b>Kundennummer:</b>
              <br />
              {form.getValues().Kundennummer}
              <br />
              <b>Name:</b>
              <br />
              {name}
              <br />
              <b>Benutzername:</b>
              <br />
              {form.getValues().Benutzername}
              <br /> <b>Passwort:</b>
              <br />
              {form.getValues().Passwort}
              <br />
              <b>Mobilfunk:</b>
              <br />
              {form.getValues().Mobilfunk}
              <br />
              <b>Geburtstag:</b>
              <br />
              {format(form.getValues().Geburtstag, "PPPP", { locale: de })}
              <br />
              <b>Sicherheitsfrage:</b>
              <br />
              {form.getValues().Sicherheitsfrage}
              <br />
              {form.getValues().Antwort}
            </p>
            <div className="max-w-[40%] mx-auto mt-8">
              <small className="mt-6 text-gray-500">
                Bitte heben Sie diese Zugangsdaten sorgfältig auf, sie werden
                benötigt, um sich im Telekom Webmail anzumelden.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
