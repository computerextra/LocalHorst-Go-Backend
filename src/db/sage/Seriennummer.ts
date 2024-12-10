import { z } from "zod";
import { client, config } from "../config";

const GetSeriennummerProps = z.object({
  Artikelnummer: z.string(),
});
type GetSeriennummerProps = z.infer<typeof GetSeriennummerProps>;

const getSeriennummer = async (
  props: GetSeriennummerProps
): Promise<string> => {
  const form = new FormData();
  form.set("Artikelnummer", props.Artikelnummer);
  const res = await client.post<string>("/Service/Seriennummer", form, config);

  return res.data;
};

export { getSeriennummer, GetSeriennummerProps };
