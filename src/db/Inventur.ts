import { z } from "zod";
import { client, config } from "./config";

const getYears = async (): Promise<string[]> => {
  const res = await client.get<string[]>("/Inventur/Years", config);
  return res.data;
};

const GetEntriesProps = z.object({
  Year: z.string(),
});
type GetEntriesProps = z.infer<typeof GetEntriesProps>;

const AllFile = z.object({
  Artikelnummer: z.string(),
  Suchbegriff: z.string(),
  Anzahl: z.number().int(),
  Team: z.string(),
});
type AllFile = z.infer<typeof AllFile>;

const getEntries = async (props: GetEntriesProps): Promise<AllFile[]> => {
  const form = new FormData();
  form.set("Year", props.Year);
  const res = await client.post<AllFile[]>("/Inventur/All", form, config);
  return res.data;
};

const TeamFile = z.object({
  Team: z.number().int(),
  Mitarbeiter: z.string(),
  Farbe: z.string(),
  Ort: z.string(),
});
type TeamFile = z.infer<typeof TeamFile>;

const GetTeamsProps = z.object({
  Year: z.string(),
});
type GetTeamsProps = z.infer<typeof GetTeamsProps>;

const getTeams = async (props: GetTeamsProps): Promise<TeamFile[]> => {
  const form = new FormData();
  form.set("Year", props.Year);
  const res = await client.post<TeamFile[]>("/Inventur/Teams", form, config);
  return res.data;
};

const Entry = z.object({
  Artikelnummer: z.string(),
  Suchbegriff: z.string(),
  Anzahl: z.number().int(),
});
type Entry = z.infer<typeof Entry>;

const GetEntryProps = z.object({
  Year: z.string(),
  Team: z.string(),
});
type GetEntryProps = z.infer<typeof GetEntryProps>;

const getEntry = async (props: GetEntryProps): Promise<Entry[]> => {
  const form = new FormData();
  form.set("Year", props.Year);
  form.set("Team", props.Team);
  const res = await client.post<Entry[]>("/Inventur/Entry", form, config);
  return res.data;
};

export {
  getYears,
  getEntries,
  getTeams,
  getEntry,
  GetEntriesProps,
  GetTeamsProps,
  GetEntryProps,
  Entry,
  AllFile,
  TeamFile,
};
