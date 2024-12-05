import { type AxiosRequestConfig, type RawAxiosRequestHeaders } from "axios";
import { client } from "./config";
import { z } from "zod";

export const SqlNullString = z.object({
  Valid: z.boolean(),
  String: z.string().nullable(),
});

export const SqlNullDateTime = z.object({
  Valid: z.boolean(),
  Time: z.date().nullable(),
});

export const SqlNullBool = z.object({
  Valid: z.boolean(),
  Bool: z.boolean().nullable(),
});

const GetEinkaufArgs = z.object({ id: z.string() });

export type GetEinkaufArgs = z.infer<typeof GetEinkaufArgs>;

export const UpdateEinkaufArgs = z.object({
  id: z.string(),
  mitarbeiterId: z.string(),
  Bild1: z.string().optional(),
  Bild2: z.string().optional(),
  Bild3: z.string().optional(),
  Dinge: z.string().optional(),
  Geld: z.string().optional(),
  Paypal: z.boolean(),
  Abonniert: z.boolean(),
  Pfand: z.string().optional(),
});
export type UpdateEinkaufArgs = z.infer<typeof UpdateEinkaufArgs>;

const SkipEinkaufArgs = z.object({ id: z.string() });
export type SkipEinkaufArgs = z.infer<typeof SkipEinkaufArgs>;

const DeleteEinkaufArgs = z.object({ id: z.string() });
export type DeleteEinkaufArgs = z.infer<typeof DeleteEinkaufArgs>;

const EinkaufListe = z.object({
  ID: z.string(),
  Paypal: z.boolean(),
  Abonniert: z.boolean(),
  Geld: SqlNullString,
  Pfand: SqlNullString,
  Dinge: SqlNullString,
  Bild1: SqlNullString,
  Bild2: SqlNullString,
  Bild3: SqlNullString,
  Bild1date: SqlNullDateTime,
  Bild2date: SqlNullDateTime,
  Bild3date: SqlNullDateTime,
  Name: SqlNullString,
  Email: SqlNullString,
});
export type EinkaufListe = z.infer<typeof EinkaufListe>;

const Einkauf = z.object({
  Abgeschickt: SqlNullDateTime,
  Abonniert: z.boolean(),
  Bild1: SqlNullString,
  Bild1date: SqlNullDateTime,
  Bild2: SqlNullString,
  Bild2date: SqlNullDateTime,
  Bild3: SqlNullString,
  Bild3date: SqlNullDateTime,
  Dinge: SqlNullString,
  Geld: SqlNullString,
  ID: z.string(),
  Mitarbeiterid: z.string(),
  Paypal: z.boolean(),
  Pfand: SqlNullString,
});
export type Einkauf = z.infer<typeof Einkauf>;

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
  } as RawAxiosRequestHeaders,
};

// 127.0.0.1:8000/api/Einkauf/cltplzdp80000zlfc0rae9dnt

const getEinkauf = async (args: GetEinkaufArgs): Promise<Einkauf | null> => {
  const res = await client.get<Einkauf | { error: string }>(
    `/Einkauf/${args.id}`,
    config
  );

  if ("error" in res.data) {
    return null;
  }

  return res.data;
};

const getEinkaufsListe = async (): Promise<EinkaufListe[]> => {
  const res = await client.get<EinkaufListe[]>("/Einkauf", config);

  return res.data;
};

const updateEinkauf = async (args: FormData, id: string): Promise<Einkauf> => {
  const res = await client.post<Einkauf>(`/Einkauf/${id}`, args, config);

  return res.data;
};

const skipEinkauf = async (args: SkipEinkaufArgs): Promise<void> => {
  await client.post(`/Einkauf/skip`, args, config);
};

const deleteEinkauf = async (args: DeleteEinkaufArgs): Promise<void> => {
  await client.delete(`/Einkauf/${args.id}`, config);
};

const sendPayPalMail = async (args: FormData): Promise<{ error: string }> => {
  const res = await client.post<{ error: string }>(
    "/Einkauf/Mail",
    args,
    config
  );
  return res.data;
};

export {
  getEinkauf,
  getEinkaufsListe,
  updateEinkauf,
  skipEinkauf,
  deleteEinkauf,
  sendPayPalMail,
};
