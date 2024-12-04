import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InfoArgs, sendInfo } from "@/db/Service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const [message, setMessage] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof InfoArgs>>({
    resolver: zodResolver(InfoArgs),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof InfoArgs>) => {
    const res = await sendInfo(values);
    if (res?.error == "false") setMessage("Mail versendet");
    else {
      setMessage(res?.error);
      form.reset({
        Auftrag: "",
        Mail: "",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Mail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Mail" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Auftrag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Auftrag</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Auftrag" {...field} />
                </FormControl>
                <FormDescription>Nummer AU/LI/RE</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Senden</Button>
        </form>
      </Form>

      <p>{message}</p>
    </>
  );
}
