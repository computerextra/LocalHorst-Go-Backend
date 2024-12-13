import { AuthPage } from "@/components/AuthPage";
import BackButton from "@/components/BackButton";
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
import { createAbteilung, CreateAbteilungProps } from "@/db/cms/Abteilung";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

export default function AbteilungNew() {
  const form = useForm<z.infer<typeof CreateAbteilungProps>>({
    resolver: zodResolver(CreateAbteilungProps),
  });
  const navigate = useNavigate();
  const [msg, setMsg] = useState<undefined | string>(undefined);

  const onSubmit = async (values: z.infer<typeof CreateAbteilungProps>) => {
    const res = await createAbteilung(values);
    if (res) {
      navigate("/CMS/Abteilungen");
    } else {
      setMsg("Fehler!");
    }
  };
  return (
    <AuthPage>
      <>
        <BackButton href="/CMS/Abteilungen" />
        <h1 className="mt-8">Neue Abteilung anglegen</h1>

        {msg && <h2 className="text-primary">{msg}</h2>}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Speichern</Button>
          </form>
        </Form>
      </>
    </AuthPage>
  );
}
