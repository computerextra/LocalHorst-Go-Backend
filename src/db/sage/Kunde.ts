import { z } from "zod";
import { client, config } from "../config";

const Kunde = z.object({
  Name: z.string(),
  Vorname: z.string(),
});
type Kunde = z.infer<typeof Kunde>;

const getKunde = async (props: {
  Kundennummer: string;
}): Promise<Kunde | null> => {
  const form = new FormData();
  form.set("id", props.Kundennummer);
  const res = await client.post<Kunde | { error: string }>(
    "/Sage/Kunde",
    form,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

export { getKunde, type Kunde };
