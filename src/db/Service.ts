import { type AxiosRequestConfig, type RawAxiosRequestHeaders } from "axios";
import { client } from "./config";
import { z } from "zod";

export const InfoArgs = z.object({
  Auftrag: z.string(),
  Mail: z.string().email(),
});

export type InfoArgs = z.infer<typeof InfoArgs>;

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
  } as RawAxiosRequestHeaders,
};

const sendInfo = async (args: InfoArgs): Promise<{ error: string } | null> => {
  const formData = new FormData();
  formData.set("Auftrag", args.Auftrag);
  formData.set("Mail", args.Mail);
  const res = await client.post<{ error: string } | null>(
    `/Service/Info/`,
    formData,
    config
  );

  return res.data;
};

export { sendInfo };
