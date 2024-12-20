import { DataTable } from "@/components/DataTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getUsers } from "@/db/Mitarbeiter";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type Birthday = {
  id: string;
  Name: string;
  Geburtstag: Date;
};

const columns: ColumnDef<Birthday>[] = [
  {
    accessorKey: "Name",
    header: "Mitarbeiter",
  },
  {
    accessorKey: "Geburtstag",
    header: "Geburtstag",
    cell: ({ row }) => {
      const x = row.original;
      const date = new Date(x.Geburtstag).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
      });
      return <p>{date}</p>;
    },
  },
];

export default function Geburtstage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const [vergangen, setVergangen] = useState<Birthday[] | undefined>(undefined);
  const [zukunft, setZukunft] = useState<Birthday[] | undefined>(undefined);
  const [heute, setHeute] = useState<Birthday[] | undefined>(undefined);
  const [morgen, setMorgen] = useState<Birthday[] | undefined>(undefined);

  useEffect(() => {
    if (data == null) return;
    const vergangen: Birthday[] = [];
    const zukunft: Birthday[] = [];
    const heute: Birthday[] = [];
    const morgen: Birthday[] = [];
    const actualDate = new Date();
    const today = new Date(new Date(actualDate).toDateString());

    data.forEach((x) => {
      // @ts-expect-error Sollte Date sein, ist aber string...
      if (x.Geburtstag.Time != "0001-01-01T00:00:00Z") {
        const bday = new Date(
          today.getFullYear() +
            "-" +
            // @ts-expect-error Cast als string, weil es ist ein string, sollte aber ein Date sein...
            (new Date(x.Geburtstag.Time).getMonth() + 1) +
            "-" +
            // @ts-expect-error Cast als string, weil es ist ein string, sollte aber ein Date sein...
            new Date(x.Geburtstag.Time).getDate()
        );
        const user: Birthday = {
          Name: x.Name,
          Geburtstag: bday,
          id: x.ID,
        };
        // @ts-expect-error Dates wollen sich nicht berechnen lassen, geht aber trotzdem!
        const diff = Math.round((bday - today) / (1000 * 60 * 60 * 24));

        if (diff == 0) {
          heute.push(user);
        } else if (diff == 1) {
          morgen.push(user);
        }

        if (bday > today) {
          zukunft.push(user);
        } else if (bday < today) {
          vergangen.push(user);
        }
      }
    });

    // Sortiere Arrays nach Geburtstag
    vergangen.sort((a, b) => (a.Geburtstag > b.Geburtstag ? 1 : -1));
    zukunft.sort((a, b) => (a.Geburtstag > b.Geburtstag ? 1 : -1));
    heute.sort((a, b) => (a.Geburtstag > b.Geburtstag ? 1 : -1));
    morgen.sort((a, b) => (a.Geburtstag > b.Geburtstag ? 1 : -1));

    setVergangen(vergangen);
    setZukunft(zukunft);
    setHeute(heute);
    setMorgen(morgen);
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Error...</>;

  return (
    <>
      <h1 className="mb-6">Geburtstags Liste</h1>
      {heute?.map((user) => (
        <div className="my-6" key={user.id}>
          <Alert variant="destructive">
            <AlertTitle className="text-2xl">
              Heute gibt es ein Geburtstagskind!
            </AlertTitle>
            <AlertDescription>
              Heute hat {user.Name} Geburtstag
            </AlertDescription>
          </Alert>
        </div>
      ))}

      {morgen?.map((user) => (
        <div className="my-6" key={user.id}>
          <Alert variant="destructive">
            <AlertTitle className="text-2xl">
              Morgen gibt es ein Geburtstagskind!
            </AlertTitle>
            <AlertDescription>
              Morgen hat {user.Name} Geburtstag
            </AlertDescription>
          </Alert>
        </div>
      ))}

      <h2 className="mt-6">Vergangene Geburtstage</h2>
      {vergangen && (
        <DataTable
          search="Name"
          placeholder="Suche nach Namen"
          columns={columns}
          data={vergangen}
        />
      )}

      <h2 className="mt-6">Zukünftige Geburtstage</h2>
      {zukunft && (
        <DataTable
          search="Name"
          placeholder="Suche nach Namen"
          columns={columns}
          data={zukunft}
        />
      )}
    </>
  );
}
