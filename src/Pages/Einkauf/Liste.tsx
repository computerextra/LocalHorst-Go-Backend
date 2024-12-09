import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type EinkaufListe, getEinkaufsListe } from "@/db/Einkauf";
import { useQuery } from "@tanstack/react-query";
import { Check, Cross } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";
import { useReactToPrint } from "react-to-print";

export default function EinkaufListe() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["einkaufsliste"],
    queryFn: getEinkaufsListe,
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Error...</>;

  return (
    <>
      <h1>Einkaufs Liste</h1>
      <div className="flex justify-between">
        <Button className="my-6" variant="default" asChild>
          <a
            href="https://www.edeka.de/markt-id/10001842/prospekt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edeka Blättchen
          </a>
        </Button>
        <Button className="my-6" onClick={() => reactToPrintFn()}>
          Liste Drucken
        </Button>
        <Button className="my-6" asChild>
          <Link to="/Einkauf/Eingabe">Eingeben</Link>
        </Button>
        <Button className="my-6" variant="secondary" asChild>
          <Link to="/Einkauf/Abrechnung">PayPal Abrechnung</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data && data.map((x) => <EinkaufCard key={x.ID} props={x} />)}
      </div>
      <div className="sr-only">
        <div className="my-6 ps-6" ref={contentRef}>
          <h1>An Post / Milch und Kaffee denken!</h1>
          {data && data.map((x) => <PrintMurks key={x.ID} props={x} />)}
        </div>
      </div>
    </>
  );
}

function PrintMurks({ props }: { props: EinkaufListe }) {
  return (
    <div className="my-4 text-xs">
      {props.Name.String} <br />
      Geld: {props.Geld.String} <br />
      Pfand: {props.Pfand.String} <br />
      <pre className="font-sans">{props.Dinge.String}</pre>
      <div className="grid grid-cols-3 mb-2">
        {props.Bild1date.Time &&
          new Date(props.Bild1date.Time).toLocaleDateString() ==
            new Date().toLocaleDateString() && (
            <img
              className="max-h-[150px] rounded-md"
              src={props.Bild1.String ?? ""}
            />
          )}
        {props.Bild2date.Time &&
          new Date(props.Bild2date.Time).toLocaleDateString() ==
            new Date().toLocaleDateString() && (
            <img src={props.Bild2.String ?? ""} />
          )}
        {props.Bild3date.Time &&
          new Date(props.Bild3date.Time).toLocaleDateString() ==
            new Date().toLocaleDateString() && (
            <img src={props.Bild3.String ?? ""} />
          )}
      </div>
      <hr />
    </div>
  );
}

function EinkaufCard({ props }: { props: EinkaufListe }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.Name.String}</CardTitle>
        <CardDescription>
          <div className="grid grid-cols-2 gap-4">
            <span>Geld: {props.Geld.String}</span>
            <span className="flex items-center gap-1">
              Abonniert:{" "}
              {props.Abonniert ? (
                <Check className="text-green-500" />
              ) : (
                <Cross className="rotate-45 text-primary" />
              )}
            </span>
            <span>Pfand: {props.Pfand.String}</span>
            <span className="flex items-center gap-1">
              Paypal:{" "}
              {props.Paypal ? (
                <Check className="text-green-500" />
              ) : (
                <Cross className="rotate-45 text-primary" />
              )}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="font-sans">{props.Dinge.String}</pre>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-3 gap-2">
          {props.Bild1date.Time &&
            new Date(props.Bild1date.Time).toLocaleDateString() ==
              new Date().toLocaleDateString() && (
              <img
                className="max-h-[200px] rounded-md"
                src={props.Bild1.String ?? ""}
              />
            )}
          {props.Bild2date.Time &&
            new Date(props.Bild2date.Time).toLocaleDateString() ==
              new Date().toLocaleDateString() && (
              <img src={props.Bild2.String ?? ""} />
            )}
          {props.Bild3date.Time &&
            new Date(props.Bild3date.Time).toLocaleDateString() ==
              new Date().toLocaleDateString() && (
              <img src={props.Bild3.String ?? ""} />
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
