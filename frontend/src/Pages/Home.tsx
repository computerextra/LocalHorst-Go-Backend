import Einkaufsliste from "@/Pages/Einkauf/Einkaufsliste";
import { Separator } from "@/components/ui/separator";
import Geburtstagsliste from "./Mitarbeiter/Geburtstagsliste";

export default function Home() {
  return (
    <>
      <h1 className="text-center print:hidden">Victor</h1>
      <Separator className="my-4 print:hidden" />
      <h2 className="print:hidden">
        Einkaufsliste vom {new Date().toLocaleDateString()}
      </h2>
      <Einkaufsliste />
      <Separator className="my-4 print:hidden" />
      <div className="print:hidden">
        <h2>Geburtstagsliste</h2>
        <Geburtstagsliste />
      </div>
    </>
  );
}
