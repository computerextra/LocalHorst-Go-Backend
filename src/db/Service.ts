import { client, config } from "./config";
import { z } from "zod";

export const InfoArgs = z.object({
  Auftrag: z.string(),
  Mail: z.string().email(),
});

export type InfoArgs = z.infer<typeof InfoArgs>;

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
