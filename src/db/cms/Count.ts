import { z } from "zod";
import { getAbteilungen } from "./Abteilung";
import { getAngebote } from "./Angebot";
import { getJobs } from "./Job";
import { getAllMitarbeiter } from "./Mitarbeiter";
import { getAllPartner } from "./Partner";

const Counts = z.object({
  Abteilung: z.number(),
  Angebot: z.number(),
  Jobs: z.number(),
  Mitarbeiter: z.number(),
  Partner: z.number(),
});
type Counts = z.infer<typeof Counts>;

const getCount = async (): Promise<Counts | null> => {
  const Abteilung = await getAbteilungen();
  const Angebote = await getAngebote();
  const Jobs = await getJobs();
  const Mitarbeiter = await getAllMitarbeiter();
  const Partner = await getAllPartner();

  const Count: Counts = {
    Abteilung: Abteilung?.length ?? 0,
    Angebot: Angebote?.length ?? 0,
    Jobs: Jobs?.length ?? 0,
    Mitarbeiter: Mitarbeiter?.length ?? 0,
    Partner: Partner?.length ?? 0,
  };

  return Count;
};

export { getCount, type Counts };
