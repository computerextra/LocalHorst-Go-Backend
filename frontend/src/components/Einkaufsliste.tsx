import useSession from "@/hooks/useSession";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { GetEinkaufsListe } from "../../wailsjs/go/main/App";
import { Button } from "./ui/button";

export default function Einkaufsliste() {
  const session = useSession();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["einkaufsliste"],
    queryFn: GetEinkaufsListe,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h2 className="hidden print:block">An Post / Milch und Kaffee denken!</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:hidden">
        <Button variant={"outline"} asChild>
          <a
            href="https://www.edeka.de/markt-id/10001842/prospekt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edeka Blättchen
          </a>
        </Button>
        <Button variant={"outline"}>Drucken</Button>
        <Button variant={"outline"} asChild>
          <NavLink to="/">Eingabe</NavLink>
        </Button>
        <Button variant={"default"} asChild>
          <NavLink to="/">Abrechnung</NavLink>
        </Button>
      </div>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <>
            <div className="print:hidden">
              {session && session.User.Name == item.Name && (
                <Button>Bearbeiten</Button>
              )}
              {item.Name}
            </div>
            <div className="hidden print:block my-4 text-xs">
              {item.Name} <br />
              Geld: {item.Geld} <br />
              Pfand: {item.Pfand} <br />
              <pre className="font-sans text-wrap">{item.Dinge}</pre>
              <div className="grid grid-cols-3 mb-2">
                {item.Bild1Data.Valid && (
                  <img className="max-h-[150px] rounded-md" src={item.Bild1} />
                )}
                {item.Bild2Data.Valid && (
                  <img className="max-h-[150px] rounded-md" src={item.Bild2} />
                )}
                {item.Bild3Data.Valid && (
                  <img className="max-h-[150px] rounded-md" src={item.Bild3} />
                )}
              </div>
              <hr />
            </div>
          </>
        ))}
    </>
  );
}
