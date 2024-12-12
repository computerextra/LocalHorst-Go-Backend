import { z } from "zod";
import { client, config } from "./config";

const SearchArchiveParams = z.object({
  Suche: z.string(),
});
type SearchArchiveParams = z.infer<typeof SearchArchiveParams>;

const SearchArchiveResponse = z.object({
  ID: z.string(),
  Title: z.string(),
});
type SearchArchiveResponse = z.infer<typeof SearchArchiveResponse>;

const searchArchive = async (
  params: SearchArchiveParams
): Promise<SearchArchiveResponse[] | null> => {
  const form = new FormData();
  form.set("Search", params.Suche);
  const res = await client.post<SearchArchiveResponse[] | { error: string }>(
    "/Archive",
    form,
    config
  );

  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const getPdf = async ({ title }: { title: string }): Promise<string> => {
  const res = await client.get<string>("/Archive/" + title, config);
  return res.data;
};

export { searchArchive, getPdf, SearchArchiveParams, SearchArchiveResponse };
