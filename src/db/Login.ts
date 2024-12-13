import { z } from "zod";
import { client, config } from "./config";

const LoginParams = z.object({
  Benutzername: z.string(),
  Passwort: z.string(),
});
type LoginParams = z.infer<typeof LoginParams>;

const login = async (params: LoginParams): Promise<string> => {
  const form = new FormData();
  form.set("programName", params.Benutzername);
  form.set("programPassword", params.Passwort);
  const res = await client.post<string>("/authenticate", form, config);

  return res.data;
};

export { login, LoginParams };
