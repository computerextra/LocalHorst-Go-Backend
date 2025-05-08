import { main } from "../../wailsjs/go/models";
import { SearchArchive, GetArchive } from "../../wailsjs/go/main/App";

export type ArchiveEntry = main.Archive;

export const SearchArchiv = async (
  searchTerm: string
): Promise<Array<ArchiveEntry>> => {
  return await SearchArchive(searchTerm);
};

export const GetArchivEntry = async (id: string): Promise<string> => {
  return await GetArchive(id);
};
