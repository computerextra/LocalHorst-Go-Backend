import { type AxiosRequestConfig, type RawAxiosRequestHeaders } from "axios";
import { client } from "./config";
import { z } from "zod";
import { SqlNullString } from "./sqlTypes";

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
  } as RawAxiosRequestHeaders,
};

const Lieferanten = z.object({
  ID: z.string(),
  Firma: z.string(),
  Kundennummer: SqlNullString,
  Webseite: SqlNullString,
});
export type Lieferanten = z.infer<typeof Lieferanten>;

const Ansprechpartner = z.object({
  ID: z.string(),
  Name: z.string(),
  Telefon: SqlNullString,
  Mobil: SqlNullString,
  Mail: SqlNullString,
  Lieferantenid: SqlNullString,
});
export type Ansprechpartner = z.infer<typeof Ansprechpartner>;

const CreateAnsprechpartnerParams = Ansprechpartner;
export type CreateAnsprechpartnerParams = z.infer<
  typeof CreateAnsprechpartnerParams
>;

const CreateLieferantParams = Lieferanten;
export type CreateLieferantParams = z.infer<typeof CreateLieferantParams>;

const UpdateAnsprechpartnerParams = Ansprechpartner;
export type UpdateAnsprechpartnerParams = z.infer<
  typeof CreateAnsprechpartnerParams
>;

const UpdateLieferantParams = Lieferanten;
export type UpdateLieferantParams = z.infer<typeof UpdateLieferantParams>;

const getLieferant = async (args: {
  id: string;
}): Promise<Lieferanten | null> => {
  const res = await client.get<Lieferanten | null>(
    `/Lieferant/${args.id}`,
    config
  );

  return res.data;
};

const getLieferanten = async (): Promise<Lieferanten[]> => {
  const res = await client.get<Lieferanten[]>("/Lieferant", config);
  return res.data;
};

const createLieferant = async (
  args: CreateLieferantParams
): Promise<Lieferanten> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    } as RawAxiosRequestHeaders,
  };
  const form = new FormData();
  form.set("Firma", args.Firma);
  form.set("Kundennummer", args.Kundennummer.String ?? "");
  form.set("Webseite", args.Webseite.String ?? "");

  const res = await client.post<Lieferanten>("/Lieferant/new", form, config);
  return res.data;
};

const updateLieferant = async (
  args: UpdateLieferantParams
): Promise<Lieferanten> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    } as RawAxiosRequestHeaders,
  };
  const form = new FormData();
  form.set("ID", args.ID);
  form.set("Firma", args.Firma);
  form.set("Kundennummer", args.Kundennummer.String ?? "");
  form.set("Webseite", args.Webseite.String ?? "");
  const res = await client.post<Lieferanten>(
    `/Lieferant/${args.ID}/edit`,
    form,
    config
  );
  return res.data;
};

const deleteLieferant = async (args: { id: string }): Promise<void> => {
  return await client.post(`/Lieferant/${args.id}/delete`, {}, config);
};

const getAnsprechpartner = async (args: {
  id: string;
}): Promise<Ansprechpartner | null> => {
  const res = await client.get<Ansprechpartner | null>(
    `/Ansprechpartner/${args.id}`,
    config
  );

  return res.data;
};

const getAllAnsprechpartnerFromLieferant = async (args: {
  id: string;
}): Promise<(Lieferanten & { Ansprechpartner: Ansprechpartner[] }) | null> => {
  const res2 = await client.get<Lieferanten>(`/Lieferant/${args.id}`, config);
  const res = await client.get<Ansprechpartner[]>(
    `/Lieferant/${args.id}/Ansprechpartner`,
    config
  );

  let lieferant: Lieferanten | null = null;

  if (res2.data) {
    lieferant = {
      Firma: res2.data.Firma,
      ID: res2.data.ID,
      Kundennummer: res2.data.Kundennummer,
      Webseite: res2.data.Webseite,
    };
  }

  const aps: Ansprechpartner[] = [];
  if (res.data) {
    if (res2.data)
      res.data.forEach((x) => {
        aps.push({
          ID: x.ID,
          Lieferantenid: x.Lieferantenid,
          Mail: x.Mail,
          Mobil: x.Mobil,
          Name: x.Name,
          Telefon: x.Telefon,
        });
      });
  }

  if (lieferant)
    return {
      ...lieferant,
      Ansprechpartner: aps,
    };

  return null;
};

const createAnsprechpartner = async (
  args: CreateAnsprechpartnerParams
): Promise<Ansprechpartner> => {
  const form = new FormData();
  form.set("Lieferantenid", args.Lieferantenid.String ?? "");
  form.set("Mail", args.Mail.String ?? "");
  form.set("Mobil", args.Mobil.String ?? "");
  form.set("Name", args.Name);
  form.set("Telefon", args.Telefon.String ?? "");
  const res = await client.post<Ansprechpartner>(
    "/Ansprechpartner/new",
    form,
    config
  );
  return res.data;
};

const updateAnsprechpartner = async (
  args: UpdateAnsprechpartnerParams
): Promise<Ansprechpartner> => {
  const form = new FormData();
  form.set("ID", args.ID);
  form.set("Lieferantenid", args.Lieferantenid.String ?? "");
  form.set("Mail", args.Mail.String ?? "");
  form.set("Mobil", args.Mobil.String ?? "");
  form.set("Name", args.Name);
  form.set("Telefon", args.Telefon.String ?? "");
  const res = await client.post<Ansprechpartner>(
    `/Ansprechpartner/${args.ID}/edit`,
    form,
    config
  );
  return res.data;
};

const deleteAnsprechpartner = async (args: { id: string }): Promise<void> => {
  return await client.post(`/Ansprechpartner/${args.id}/delete`, {}, config);
};

export {
  getLieferant,
  getLieferanten,
  createLieferant,
  updateLieferant,
  deleteLieferant,
  getAnsprechpartner,
  getAllAnsprechpartnerFromLieferant,
  createAnsprechpartner,
  updateAnsprechpartner,
  deleteAnsprechpartner,
};
