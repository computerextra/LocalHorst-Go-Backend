import { z } from "zod";
import { client, config } from "../config";

const Partner = z.object({
  ID: z.string(),
  Name: z.string(),
  Image: z.string(),
  Link: z.string(),
});
type Partner = z.infer<typeof Partner>;

const GetPartnerProps = z.object({ id: z.string() });
type GetPartnerProps = z.infer<typeof GetPartnerProps>;

const UpdatePartnerProps = Partner;
type UpdatePartnerProps = z.infer<typeof UpdatePartnerProps>;

const CreatePartnerProps = z.object({
  Name: z.string(),
  Image: z.string(),
  Link: z.string(),
});
type CreatePartnerProps = z.infer<typeof CreatePartnerProps>;

const getAllPartner = async (): Promise<Partner[] | null> => {
  const res = await client.get<Partner[] | { error: string }>(
    `/CMS/Partner`,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const getPartner = async (props: GetPartnerProps): Promise<Partner | null> => {
  const res = await client.get<Partner | { error: string }>(
    `/CMS/Partner/${props.id}`,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const updatePartner = async (
  props: UpdatePartnerProps
): Promise<Partner | null> => {
  const form = new FormData();
  form.set("ID", props.ID);
  form.set("Name", props.Name);
  form.set("Image", props.Image);
  form.set("Link", props.Link);
  const res = await client.post<Partner | { error: string }>(
    `/CMS/Partner/${props.ID}/edit`,
    form,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const createPartner = async (
  props: CreatePartnerProps
): Promise<Partner | null> => {
  const form = new FormData();
  form.set("Name", props.Name);
  form.set("Name", props.Name);
  form.set("Image", props.Image);
  form.set("Link", props.Link);
  const res = await client.post<Partner | { error: string }>(
    `/CMS/Partner/new`,
    form,
    config
  );
  if ("error" in res.data) return null;
  return res.data;
};

const deleteMitarbeiter = async (props: GetPartnerProps): Promise<void> => {
  const form = new FormData();
  form.set("ID", props.id);
  await client.post<{ error: string }>(
    `/CMS/Partner/${props.id}/delete`,
    form,
    config
  );
};

export {
  getAllPartner,
  getPartner,
  updatePartner,
  createPartner,
  deleteMitarbeiter,
  type Partner,
  type GetPartnerProps,
  type CreatePartnerProps,
  type UpdatePartnerProps,
};
