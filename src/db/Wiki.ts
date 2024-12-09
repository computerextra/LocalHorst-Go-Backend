import { z } from "zod";
import { client, config } from "./config";

const Wiki = z.object({
  ID: z.string(),
  Name: z.string(),
  Inhalt: z.string(),
  CreatedAt: z.string(), // Eigentlich Date, aber durch JSON wirds ein String
});
export type Wiki = z.infer<typeof Wiki>;

const CreateWikiProps = Wiki;
export type CreateWikiProps = z.infer<typeof CreateWikiProps>;

const UpdateWikiProps = Wiki;
export type UpdateWikiProps = z.infer<typeof UpdateWikiProps>;

const getWikis = async (): Promise<Wiki[]> => {
  const res = await client.get<Wiki[]>("/Wiki", config);
  return res.data;
};

const getWiki = async ({ id }: { id: string }): Promise<Wiki | null> => {
  const res = await client.get<Wiki>(`/Wiki/${id}`, config);
  if (res && res.data) return res.data;
  return null;
};

const updateWiki = async (args: UpdateWikiProps): Promise<Wiki> => {
  const form = new FormData();
  form.set("ID", args.ID);
  form.set("Name", args.Name);
  form.set("Inhalt", args.Inhalt);

  const res = await client.post(`/Wiki/${args.ID}/edit`, form, config);
  return res.data;
};

const createWiki = async (args: CreateWikiProps): Promise<Wiki> => {
  const form = new FormData();
  form.set("Name", args.Name);
  form.set("Inhalt", args.Inhalt);
  const res = await client.post("/Wiki/new", form, config);
  return res.data;
};

const deleteWiki = async ({ id }: { id: string }): Promise<void> => {
  const form = new FormData();
  form.set("ID", id);
  await client.post(`Wiki/${id}/delete`, form, config);
};

export { getWiki, getWikis, updateWiki, createWiki, deleteWiki };
