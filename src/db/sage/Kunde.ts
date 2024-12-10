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

const Sg_Adressen = z.object({
  SG_Adressen_PK: z.number().int(),
  Suchbegriff: z.object({ String: z.string(), Valid: z.boolean() }),
  KundNr: z.object({ String: z.string(), Valid: z.boolean() }),
  LiefNr: z.object({ String: z.string(), Valid: z.boolean() }),
  Homepage: z.object({ String: z.string(), Valid: z.boolean() }),
  Telefon1: z.object({ String: z.string(), Valid: z.boolean() }),
  Telefon2: z.object({ String: z.string(), Valid: z.boolean() }),
  Mobiltelefon1: z.object({ String: z.string(), Valid: z.boolean() }),
  Mobiltelefon2: z.object({ String: z.string(), Valid: z.boolean() }),
  EMail1: z.object({ String: z.string(), Valid: z.boolean() }),
  EMail2: z.object({ String: z.string(), Valid: z.boolean() }),
  KundUmsatz: z.object({ Valid: z.boolean(), Float64: z.number() }),
  LiefUmsatz: z.object({ Valid: z.boolean(), Float64: z.number() }),
});
type Sg_Adressen = z.infer<typeof Sg_Adressen>;

const SearchParams = z.object({
  Search: z.string(),
});
type SearchParams = z.infer<typeof SearchParams>;

const searchKunde = async (params: SearchParams): Promise<Sg_Adressen[]> => {
  const form = new FormData();
  form.set("Search", params.Search);
  const res = await client.post<Sg_Adressen[]>("/Sage/Search", form, config);
  return res.data;
};

const searchKundeReverse = async (
  params: SearchParams
): Promise<Sg_Adressen[]> => {
  const form = new FormData();
  form.set("Search", params.Search);
  const res = await client.post<Sg_Adressen[]>(
    "/Sage/ReverseSearch",
    form,
    config
  );
  return res.data;
};

export {
  getKunde,
  searchKunde,
  searchKundeReverse,
  type Kunde,
  SearchParams,
  type Sg_Adressen,
};
