import Einkaufsliste from "@/components/Einkaufsliste";
import Geburtstagsliste from "@/components/Geburtstagsliste";
import { Separator } from "@/components/ui/separator";

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
