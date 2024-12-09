import { z } from "zod";
import { client, config } from "../config";

const Angebot = z.object({
  ID: z.string(),
  Title: z.string(),
  Subtitle: z.string(),
  DateStart: z.string(),
  DateStop: z.string(),
  Link: z.string(),
  Image: z.string(),
  Anzeigen: z.boolean(),
});
type Angebot = z.infer<typeof Angebot>;

const GetAngebotProps = z.object({ id: z.string() });
type GetAngebotProps = z.infer<typeof GetAngebotProps>;

const UpdateAngebotProps = Angebot;
type UpdateAngebotProps = z.infer<typeof UpdateAngebotProps>;

const CreateAngebotProps = z.object({
  Title: z.string(),
  Subtitle: z.string(),
  DateStart: z.string(),
  DateStop: z.string(),
  Link: z.string(),
  Image: z.string(),
  Anzeigen: z.boolean(),
});
type CreateAngebotProps = z.infer<typeof CreateAngebotProps>;

const getAngebote = async (): Promise<Angebot[] | null> => {
  const res = await client.get<Angebot[] | { error: string }>(
    `/CMS/Angebot`,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const getAngebot = async (props: GetAngebotProps): Promise<Angebot | null> => {
  const res = await client.get<Angebot | { error: string }>(
    `/CMS/Angebot/${props.id}`,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const updateAngebot = async (
  props: UpdateAngebotProps
): Promise<Angebot | null> => {
  const form = new FormData();
  form.set("ID", props.ID);
  form.set("Title", props.Title);
  form.set("Subtitle", props.Subtitle);
  form.set("DateStart", props.DateStart);
  form.set("DateStop", props.DateStop);
  form.set("Link", props.Link);
  form.set("Image", props.Image);
  form.set("Anzeigen", props.Anzeigen ? "true" : "false");
  const res = await client.post<Angebot | { error: string }>(
    `/CMS/Angebot/${props.ID}/edit`,
    form,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const createAngebot = async (
  props: CreateAngebotProps
): Promise<Angebot | null> => {
  const form = new FormData();
  form.set("Title", props.Title);
  form.set("Subtitle", props.Subtitle);
  form.set("DateStart", props.DateStart);
  form.set("DateStop", props.DateStop);
  form.set("Link", props.Link);
  form.set("Image", props.Image);
  form.set("Anzeigen", props.Anzeigen ? "true" : "false");
  const res = await client.post<Angebot | { error: string }>(
    `/CMS/Angebot/new`,
    form,
    config
  );
  if ("error" in res.data) return null;
  return res.data;
};

const deleteAngebot = async (props: GetAngebotProps): Promise<void> => {
  const form = new FormData();
  form.set("ID", props.id);
  await client.post<{ error: string }>(
    `/CMS/Angebot/${props.id}/delete`,
    form,
    config
  );
};

export {
  getAngebot,
  getAngebote,
  updateAngebot,
  createAngebot,
  deleteAngebot,
  type Angebot,
  type GetAngebotProps,
  CreateAngebotProps,
  UpdateAngebotProps,
};
