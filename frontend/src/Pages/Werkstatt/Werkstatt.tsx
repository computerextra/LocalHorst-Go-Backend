import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { z } from "zod";
import AomeiForm from "./aomei-form";
import AppleForm from "./apple-form";
import GdataForm from "./gdata-form";
import GoogleForm from "./google-form";
import MicrosoftForm from "./mirosoft-form";
import TelekomForm from "./telekom-form";

const Available = z.enum([
  "AOMEI",
  "Apple",
  "GData",
  "Google",
  "Microsoft",
  "Telekom",
]);

export default function Werkstatt() {
  const [selected, setSelected] = useState<
    z.infer<typeof Available> | undefined
  >(undefined);

  return (
    <>
      <h1 className="text-center print:hidden mb-5">
        Kunden Handout für Zugangsdaten
      </h1>
      <div className="print:hidden">
        <Select
          defaultValue={selected}
          onValueChange={(e) => {
            const res = Available.parse(e);
            setSelected(res);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Bitte wählen..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Anwendungen</SelectLabel>
              {Object.keys(Available.enum).map((x) => (
                <SelectItem value={x} key={x}>
                  {x}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="print:hidden my-4" />
      <WerkstattForm selected={selected} />
    </>
  );
}

function WerkstattForm({ selected }: { selected?: z.infer<typeof Available> }) {
  switch (selected) {
    case "AOMEI":
      return <AomeiForm />;
    case "Apple":
      return <AppleForm />;
    case "GData":
      return <GdataForm />;
    case "Google":
      return <GoogleForm />;
    case "Microsoft":
      return <MicrosoftForm />;
    case "Telekom":
      return <TelekomForm />;
  }
}
