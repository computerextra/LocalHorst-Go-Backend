import { z } from "zod";
import { client, config } from "../config";

const Abteilung = z.object({
  ID: z.string(),
  Name: z.string(),
});
type Abteilung = z.infer<typeof Abteilung>;

const GetAbteilungProps = z.object({ id: z.string() });
type GetAbteilungProps = z.infer<typeof GetAbteilungProps>;

const UpdateAbteilungProps = z.object({
  ID: z.string(),
  Name: z.string(),
});
type UpdateAbteilungProps = z.infer<typeof UpdateAbteilungProps>;

const CreateAbteilungProps = z.object({ Name: z.string() });
type CreateAbteilungProps = z.infer<typeof CreateAbteilungProps>;

const getAbteilungen = async (): Promise<Abteilung[] | null> => {
  const res = await client.get<Abteilung[] | { error: string }>(
    `/CMS/Abteilung/`,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const getAbteilung = async (
  props: GetAbteilungProps
): Promise<Abteilung | null> => {
  const res = await client.get<Abteilung | { error: string }>(
    `/CMS/Abteilung/${props.id}`,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const updateAbteilung = async (
  props: UpdateAbteilungProps
): Promise<Abteilung | null> => {
  const form = new FormData();
  form.set("Name", props.Name);
  form.set("ID", props.ID);
  const res = await client.post<Abteilung | { error: string }>(
    `/CMS/Abteilung/${props.ID}/edit`,
    form,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const createAbteilung = async (
  props: CreateAbteilungProps
): Promise<Abteilung | null> => {
  const form = new FormData();
  form.set("Name", props.Name);
  const res = await client.post<Abteilung | { error: string }>(
    `/CMS/Abteilung/new`,
    form,
    config
  );
  if ("error" in res.data) return null;
  return res.data;
};

const deleteAbteilung = async (
  props: GetAbteilungProps
): Promise<Abteilung | null> => {
  const form = new FormData();
  form.set("ID", props.id);
  const res = await client.post<Abteilung | { error: string }>(
    `/CMS/Abteilung/${props.id}/delete`,
    form,
    config
  );
  if ("error" in res.data) return null;
  return res.data;
};

export {
  getAbteilung,
  getAbteilungen,
  updateAbteilung,
  createAbteilung,
  deleteAbteilung,
  type Abteilung,
  type GetAbteilungProps,
  type CreateAbteilungProps,
  type UpdateAbteilungProps,
};
