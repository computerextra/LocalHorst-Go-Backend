import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
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
import BackButton from "@/components/BackButton";
import {
  createAnsprechpartner,
  type CreateAnsprechpartnerParams,
} from "@/db/Lieferanten";

export default function AnsprechpartnerNeu() {
  const { lid } = useParams();
  const navigate = useNavigate();

  const formSchema = z.object({
    ID: z.string(),
    Name: z.string(),
    Telefon: z.string(),
    Mobil: z.string(),
    Mail: z.string(),
    Lieferantenid: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID: "",
      Lieferantenid: lid,
    },
  });

  const onSumit = async (values: z.infer<typeof formSchema>) => {
    const data: CreateAnsprechpartnerParams = {
      ID: "",
      Lieferantenid: { String: values.Lieferantenid, Valid: true },
      Mail: {
        String: values.Mail.length > 1 ? values.Mail : null,
        Valid: values.Mail.length > 1,
      },
      Telefon: {
        String: values.Telefon.length > 1 ? values.Telefon : null,
        Valid: values.Telefon.length > 1,
      },
      Mobil: {
        String: values.Mobil.length > 1 ? values.Mobil : null,
        Valid: values.Mobil.length > 1,
      },
      Name: values.Name,
    };

    const res = await createAnsprechpartner(data);
    if (res) {
      navigate(`/Lieferanten/${lid}`);
    }
  };

  if (lid == null) return <>Keine ID</>;

  return (
    <>
      <BackButton href={`/Lieferanten/${lid}`} />
      <h1 className="mb-4">Neuer Ansprechpartner</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input required placeholder="Max Muster" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Mail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Telefon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Mobil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobil</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button type="submit">Speichern</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
