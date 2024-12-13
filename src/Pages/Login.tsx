import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login, LoginParams } from "@/db/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const form = useForm<z.infer<typeof LoginParams>>({
    resolver: zodResolver(LoginParams),
  });
  const [msg, setMsg] = useState<string | undefined>(undefined);

  const onSubmit = async (values: z.infer<typeof LoginParams>) => {
    const res = await login(values);
    if (res.startsWith("Token:")) {
      const token = res.split(" ")[1];
      if (token == null) {
        setMsg("Fehlerhaftes Token");
        return;
      }
      sessionStorage.setItem("Auth", token);
      setMsg("Erfolgreich angemeldet.");
    } else {
      setMsg(res);
    }
  };

  return (
    <>
      <h1>Anmelden</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Benutzername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benutzername</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Passwort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Anmelden</Button>
        </form>
      </Form>

      {msg && <h2>{msg}</h2>}
    </>
  );
}
