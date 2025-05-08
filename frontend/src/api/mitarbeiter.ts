import {
  GetEinkaufsListe,
  GetGeburtstagsListe,
  GetMitarbeiter as ApiGetMitarbeiter,
  DeleteMitarbeiter as ApiDeleteMitarbeiter,
  UpsertMitarbeiter as ApiUpsertMitarbeiter,
  GetAllMitarbeiter as ApiGetAllMitarbeiter,
  GetAllMitarbeiterWithoutMail,
  UpdateEinkauf as ApiUpdateEinkauf,
  UploadImage as ApiUploadImage,
  SkipEinkauf as ApiSkipEinkauf,
  DeleteEinkauf as ApiDeleteEinkauf,
  SendAbrechnung,
} from "../../wailsjs/go/main/App";
import type { main, ent } from "../../wailsjs/go/models";

export type Einkauf = main.Einkauf;
type Geburtstagsliste = main.GeburtstagList;
export type Mitarbeiter = ent.Mitarbeiter;
export type Geburtstag = main.Geburtstag;
export type EinkaufParams = main.UpsertEinkaufParams;

export type MitarbeiterParams = main.MitarbeiterParams;

export const GetEinkaufsliste = async (): Promise<Array<Einkauf>> => {
  return await GetEinkaufsListe();
};

export const GetGeburtstagsliste = async (): Promise<Geburtstagsliste> => {
  return await GetGeburtstagsListe();
};

export const GetAllMitarbeiter = async (): Promise<Array<Mitarbeiter>> => {
  return await ApiGetAllMitarbeiter();
};

export const GetAllGlobalMitarbeiter = async (): Promise<
  Array<Mitarbeiter>
> => {
  const res = await GetAllMitarbeiterWithoutMail();
  return res;
};

export const GetMitarbeiter = async (
  id?: string
): Promise<Mitarbeiter | null> => {
  let res: Mitarbeiter | null = null;
  if (id == null) return null;
  const i = parseInt(id);
  res = await ApiGetMitarbeiter(i);
  return res;
};

export const DeleteMitarbeiter = async (id?: number): Promise<boolean> => {
  if (id == null) return false;
  return await ApiDeleteMitarbeiter(id);
};

export const UpsertMitarbeiter = async (
  params: MitarbeiterParams
): Promise<boolean> => {
  return await ApiUpsertMitarbeiter(params);
};

export const UpdateEinkauf = async (
  params: EinkaufParams,
  id: number
): Promise<boolean> => {
  return await ApiUpdateEinkauf(params, id);
};

export const UploadImage = async (id: number, nr: string): Promise<string> => {
  return await ApiUploadImage(id, nr);
};

export const SkipEinkauf = async (id: number): Promise<boolean> => {
  return await ApiSkipEinkauf(id);
};

export const DeleteEinkauf = async (id: number): Promise<boolean> => {
  return await ApiDeleteEinkauf(id);
};

type PaypalParams = {
  Name: string;
  Betrag: string;
  Mail: string;
};

export const SendPayPalLink = async (params: PaypalParams) => {
  return await SendAbrechnung(params.Name, params.Betrag, params.Mail);
};
