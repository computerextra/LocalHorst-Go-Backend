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

const AngebotRes = z.object({
  ID: z.string(),
  Title: z.string(),
  Subtitle: z.object({ String: z.string(), Valid: z.boolean() }),
  DateStart: z.string(),
  DateStop: z.string(),
  Link: z.string(),
  Image: z.string(),
  Anzeigen: z.object({ Bool: z.boolean(), Valid: z.boolean() }),
});
type AngebotRes = z.infer<typeof AngebotRes>;

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
  const res = await client.get<AngebotRes[] | { error: string }>(
    `/CMS/Angebot`,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  const ret: Angebot[] = [];
  res.data.forEach((x) => {
    ret.push({
      Anzeigen: x.Anzeigen.Valid ? x.Anzeigen.Bool : false,
      DateStart: x.DateStart,
      DateStop: x.DateStop,
      ID: x.ID,
      Image: x.Image,
      Link: x.Link,
      Subtitle: x.Subtitle.Valid ? x.Subtitle.String : "",
      Title: x.Title,
    });
  });
  return ret;
};

const getAngebot = async (props: GetAngebotProps): Promise<Angebot | null> => {
  const res = await client.get<AngebotRes | { error: string }>(
    `/CMS/Angebot/${props.id}`,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  console.log(res.data.Subtitle);
  const x: Angebot = {
    Anzeigen: res.data.Anzeigen.Valid ? res.data.Anzeigen.Bool : false,
    DateStart: res.data.DateStart,
    DateStop: res.data.DateStop,
    ID: res.data.ID,
    Image: res.data.Image,
    Link: res.data.Link,
    Subtitle: res.data.Subtitle.Valid ? res.data.Subtitle.String : "",
    Title: res.data.Title,
  };
  return x;
};

const updateAngebot = async (props: UpdateAngebotProps): Promise<boolean> => {
  const form = new FormData();
  form.set("ID", props.ID);
  form.set("Title", props.Title);
  form.set("Subtitle", props.Subtitle);
  form.set("DateStart", props.DateStart);
  form.set("DateStop", props.DateStop);
  form.set("Link", props.Link);
  form.set("Image", props.Image);
  form.set("Anzeigen", props.Anzeigen ? "true" : "false");
  const res = await client.post<AngebotRes | { error: string }>(
    `/CMS/Angebot/${props.ID}/edit`,
    form,
    config
  );
  if ("error" in res.data) {
    return false;
  }
  return true;
};

const createAngebot = async (props: CreateAngebotProps): Promise<boolean> => {
  const form = new FormData();
  form.set("Title", props.Title);
  form.set("Subtitle", props.Subtitle);
  form.set("DateStart", props.DateStart);
  form.set("DateStop", props.DateStop);
  form.set("Link", props.Link);
  form.set("Image", props.Image);
  form.set("Anzeigen", props.Anzeigen ? "true" : "false");
  const res = await client.post<AngebotRes | { error: string }>(
    `/CMS/Angebot/new`,
    form,
    config
  );
  if ("error" in res.data) return false;

  return true;
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
