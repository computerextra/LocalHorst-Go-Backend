import type { main } from "../../wailsjs/go/models";
import { SearchSage } from "../../wailsjs/go/main/App";

export type Kunde = main.Sg_Adressen;

export const SucheKunde = async (searchTerm: string): Promise<Array<Kunde>> => {
  return await SearchSage(searchTerm);
};
