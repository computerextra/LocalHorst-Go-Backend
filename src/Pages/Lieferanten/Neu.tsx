import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "react-day-picker/dist/style.css";
import { createLieferant, type CreateLieferantParams } from "@/db/Lieferanten";
import BackButton from "@/components/BackButton";

const CreateLieferantParams = z.object({
  ID: z.string(),
  Firma: z.string(),
  Kundennummer: z.string(),
  Webseite: z.string(),
});

export default function LieferantNeu() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof CreateLieferantParams>>({
    resolver: zodResolver(CreateLieferantParams),
    defaultValues: {
      ID: "",
      Kundennummer: "",
      Webseite: "",
    },
  });

  const onSumit = async (values: z.infer<typeof CreateLieferantParams>) => {
    const params: CreateLieferantParams = {
      Firma: values.Firma,
      ID: "",
      Kundennummer: {
        String: values.Kundennummer.length > 1 ? values.Kundennummer : null,
        Valid: values.Kundennummer.length > 1 ? true : false,
      },
      Webseite: {
        String: values.Webseite.length > 1 ? values.Webseite : null,
        Valid: values.Webseite.length > 1 ? true : false,
      },
    };
    const res = await createLieferant(params);
    if (res) {
      navigate("/Lieferanten");
    }
  };

  return (
    <>
      <BackButton href="/Lieferanten" />
      <h1 className="mb-4">Neuen Lieferanten anlegen</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Firma"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firma</FormLabel>
                <FormControl>
                  <Input required placeholder="Muster GmbH" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Kundennummer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kundennummer</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Webseite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Webseite</FormLabel>
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
  );
}
