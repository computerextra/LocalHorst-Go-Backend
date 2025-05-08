import type { main } from "../../wailsjs/go/models";
import { SearchSage, GetKunde } from "../../wailsjs/go/main/App";

export type Kunde = main.Sg_Adressen;
export type HandoutKunde = main.User;

export const SucheKunde = async (searchTerm: string): Promise<Array<Kunde>> => {
  return await SearchSage(searchTerm);
};

export const FindeKunde = async (
  Kundennummer: string
): Promise<HandoutKunde> => {
  return await GetKunde(Kundennummer);
};
