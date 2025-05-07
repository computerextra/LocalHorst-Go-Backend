import {
  GetLieferanten as ApiGetLieferanten,
  GetLieferant as ApiGetLieferant,
  UpsertLieferant as ApiUpsertLieferant,
  DeleteLieferant as ApiDeleteLieferant,
  GetAnsprechpartner as ApiGetAnsprechpartner,
  UpsertAnsprechpartner as ApiUpsertAnsprechpartner,
  DeleteAnsprechpartner as ApiDeleteAnsprechpartner,
} from "../../wailsjs/go/main/App";
import { ent, main } from "../../wailsjs/go/models";

export type Lieferant = main.Lieferant;
export type Ansprechpartner = ent.Ansprechpartner;
export type LieferantenParams = main.LieferantenParams;
export type AnsprechpartnerParams = main.AnsprechpartnerParams;

export const GetLieferanten = async (): Promise<Array<Lieferant>> => {
  return await ApiGetLieferanten();
};

export const GetLieferant = async (id?: string): Promise<Lieferant | null> => {
  if (id == null) return null;
  return await ApiGetLieferant(parseInt(id));
};

export const UpsertLieferant = async (
  params: LieferantenParams
): Promise<boolean> => {
  return await ApiUpsertLieferant(params);
};

export const DeleteLieferant = async (id?: number): Promise<boolean> => {
  if (id == null) return false;
  return await ApiDeleteLieferant(id);
};

export const GetAnsprechpartner = async (
  id?: string
): Promise<Ansprechpartner | null> => {
  if (id == null) return null;
  return await ApiGetAnsprechpartner(parseInt(id));
};

export const UpsertAnsprechpartner = async (
  params: AnsprechpartnerParams
): Promise<boolean> => {
  return await ApiUpsertAnsprechpartner(params);
};

export const DeleteAnsprechpartner = async (id?: number) => {
  if (id == null) return false;
  return await ApiDeleteAnsprechpartner(id);
};
