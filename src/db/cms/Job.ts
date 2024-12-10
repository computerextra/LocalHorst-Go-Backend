import { z } from "zod";
import { client, config } from "../config";

const Job = z.object({
  ID: z.string(),
  Name: z.string(),
  Online: z.boolean(),
});
type Job = z.infer<typeof Job>;

const GetJobProps = z.object({ id: z.string() });
type GetJobProps = z.infer<typeof GetJobProps>;

const UpdateJobProps = Job;
type UpdateJobProps = z.infer<typeof UpdateJobProps>;

const CreateJobProps = z.object({
  Name: z.string(),
  Online: z.boolean(),
});
type CreateJobProps = z.infer<typeof CreateJobProps>;

const getJobs = async (): Promise<Job[] | null> => {
  const res = await client.get<Job[] | { error: string }>(`/CMS/Jobs`, config);
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const getJob = async (props: GetJobProps): Promise<Job | null> => {
  const res = await client.get<Job | { error: string }>(
    `/CMS/Jobs/${props.id}`,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const updateJob = async (props: UpdateJobProps): Promise<Job | null> => {
  const form = new FormData();
  form.set("ID", props.ID);
  form.set("Name", props.Name);
  form.set("Online", props.Online ? "true" : "false");
  const res = await client.post<Job | { error: string }>(
    `/CMS/Jobs/${props.ID}/edit`,
    form,
    config
  );
  if ("error" in res.data) {
    return null;
  }
  return res.data;
};

const createJob = async (props: CreateJobProps): Promise<Job | null> => {
  const form = new FormData();
  form.set("Name", props.Name);
  form.set("Online", props.Online ? "true" : "false");
  const res = await client.post<Job | { error: string }>(
    `/CMS/Jobs/new`,
    form,
    config
  );
  if ("error" in res.data) return null;
  return res.data;
};

const deleteJob = async (props: GetJobProps): Promise<void> => {
  const form = new FormData();
  form.set("ID", props.id);
  await client.post<{ error: string }>(
    `/CMS/Jobs/${props.id}/delete`,
    form,
    config
  );
};

export {
  getJob,
  getJobs,
  updateJob,
  createJob,
  deleteJob,
  type Job,
  type GetJobProps,
  CreateJobProps,
  UpdateJobProps,
};
