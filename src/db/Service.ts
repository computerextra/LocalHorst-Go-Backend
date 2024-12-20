import axios from "axios";
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

type WarenlieferungResponse = {
  ok: string;
  error: string;
};

const generateWarenlieferung = async (): Promise<WarenlieferungResponse> => {
  const res = await client.get<WarenlieferungResponse>(
    "/Service/Warenlieferung/Generate",
    config
  );
  return res.data;
};

const sendWarenlieferung = async (): Promise<WarenlieferungResponse> => {
  const res = await client.post<WarenlieferungResponse>(
    "/Service/Warenlieferung/Send",
    {},
    config
  );
  return res.data;
};

const syncLabel = async (): Promise<WarenlieferungResponse> => {
  const res = await client.post<WarenlieferungResponse>(
    "/Service/LabelSync",
    {},
    config
  );
  return res.data;
};

const syncAusteller = async (): Promise<WarenlieferungResponse> => {
  const res = await client.post<WarenlieferungResponse>(
    "/Service/Austeller/Sync",
    {},
    config
  );
  return res.data;
};

const createAusstellerImageProps = z.object({
  Artikelnummer: z.string(),
  Url: z.string().url(),
});
type createAusstellerImageProps = z.infer<typeof createAusstellerImageProps>;

const createAusstellerImage = async (
  props: createAusstellerImageProps
): Promise<WarenlieferungResponse> => {
  const res = await axios.post<{ ok: boolean; error: string | null }>(
    "https://aussteller.computer-extra.de/php/update.php",
    {
      Artikelnummer: props.Artikelnummer,
      Link: props.Url,
    },
    config
  );
  if (!res.data.ok && res.data.error != null) {
    return { error: res.data.error, ok: "false" };
  } else {
    return { error: "false", ok: "true" };
  }
};

export {
  sendInfo,
  generateWarenlieferung,
  sendWarenlieferung,
  syncLabel,
  syncAusteller,
  createAusstellerImageProps,
  createAusstellerImage,
};
