import { z } from "zod";
import { client, config } from "../config";

const Mitarbeiter = z.object({
  ID: z.string(),
  Name: z.string(),
  Short: z.string(),
  Sex: z.string(),
  Tags: z.string(),
  Focus: z.string(),
  Abteilungid: z.string(),
  Image: z.boolean(),
});
type Mitarbeiter = z.infer<typeof Mitarbeiter>;

const GetMitarbeiterProps = z.object({ id: z.string() });
type GetMitarbeiterProps = z.infer<typeof GetMitarbeiterProps>;

const UpdateMitarbeiterProps = Mitarbeiter;
type UpdateMitarbeiterProps = z.infer<typeof UpdateMitarbeiterProps>;

const CreateMitarbeiterProps = z.object({
  Name: z.string(),
  Short: z.string(),
  Sex: z.string(),
  Tags: z.string(),
  Focus: z.string(),
  Abteilungid: z.string(),
  Image: z.boolean(),
});
type CreateMitarbeiterProps = z.infer<typeof CreateMitarbeiterProps>;

const getAllMitarbeiter = async (): Promise<Mitarbeiter[] | null> => {
  const res = await client.get<Mitarbeiter[] | { error: string }>(
    `/CMS/Mitarbeiter/`,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const getMitarbeiter = async (
  props: GetMitarbeiterProps
): Promise<Mitarbeiter | null> => {
  const res = await client.get<Mitarbeiter | { error: string }>(
    `/CMS/Mitarbeiter/${props.id}`,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const updateMitarbeiter = async (
  props: UpdateMitarbeiterProps
): Promise<Mitarbeiter | null> => {
  const form = new FormData();
  form.set("ID", props.ID);
  form.set("Name", props.Name);
  form.set("Short", props.Short);
  form.set("Sex", props.Sex);
  form.set("Tags", props.Tags);
  form.set("Focus", props.Focus);
  form.set("Abteilungid", props.Abteilungid);
  form.set("Image", props.Image ? "true" : "false");
  const res = await client.post<Mitarbeiter | { error: string }>(
    `/CMS/Mitarbeiter/${props.ID}/edit`,
    form,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const createMitarbeiter = async (
  props: CreateMitarbeiterProps
): Promise<Mitarbeiter | null> => {
  const form = new FormData();
  form.set("Name", props.Name);
  form.set("Short", props.Short);
  form.set("Sex", props.Sex);
  form.set("Tags", props.Tags);
  form.set("Focus", props.Focus);
  form.set("Abteilungid", props.Abteilungid);
  form.set("Image", props.Image ? "true" : "false");
  const res = await client.post<Mitarbeiter | { error: string }>(
    `/CMS/Mitarbeiter/new`,
    form,
    config
  );
  if ("error" in res.data) return null;
  return res.data;
};

const deleteMitarbeiter = async (props: GetMitarbeiterProps): Promise<void> => {
  const form = new FormData();
  form.set("ID", props.id);
  await client.post<{ error: string }>(
    `/CMS/Mitarbeiter/${props.id}/delete`,
    form,
    config
  );
};

export {
  getAllMitarbeiter,
  getMitarbeiter,
  updateMitarbeiter,
  createMitarbeiter,
  deleteMitarbeiter,
  type Mitarbeiter,
  type GetMitarbeiterProps,
  type CreateMitarbeiterProps,
  type UpdateMitarbeiterProps,
};
