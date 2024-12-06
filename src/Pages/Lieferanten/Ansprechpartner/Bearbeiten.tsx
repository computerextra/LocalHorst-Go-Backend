import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";
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
  Ansprechpartner,
  deleteAnsprechpartner,
  getAnsprechpartner,
  updateAnsprechpartner,
  type UpdateAnsprechpartnerParams,
} from "@/db/Lieferanten";

export default function AnsprechpartnerBearbeiten() {
  const { lid, aid } = useParams();
  const navigate = useNavigate();
  const [ap, setAp] = useState<undefined | null | Ansprechpartner>(undefined);
  const [loading, setLoading] = useState(true);

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
      ID: aid ?? "",
      Name: ap?.Name,
      Telefon: ap?.Telefon.String ?? "",
      Mobil: ap?.Mobil.String ?? "",
      Mail: ap?.Mail.String ?? "",
      Lieferantenid: lid,
    },
  });

  useEffect(() => {
    async function x() {
      if (aid == null) return;
      const Lieferant = await getAnsprechpartner({ id: aid });
      setAp(Lieferant);
      if (Lieferant != null) {
        form.reset({
          ID: Lieferant.ID,
          Lieferantenid: Lieferant.Lieferantenid.String ?? aid,
          Mail: Lieferant.Mail.String ?? "",
          Mobil: Lieferant.Mobil.String ?? "",
          Name: Lieferant.Name,
          Telefon: Lieferant.Telefon.String ?? "",
        });
      }
      setLoading(false);
    }

    void x();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lid]);

  const onSumit = async (values: z.infer<typeof formSchema>) => {
    const data: UpdateAnsprechpartnerParams = {
      ID: values.ID,
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

    const res = await updateAnsprechpartner(data);
    if (res) {
      navigate(`/Lieferanten/${lid}`);
    }
  };

  const onDelete = async () => {
    if (aid == null) return;
    await deleteAnsprechpartner({ id: aid });
    navigate(`/Lieferanten/${lid}`);
  };

  if (loading) return <LoadingSpinner />;
  if (lid == null || aid == null) return <>Keine ID</>;
  if (ap == null) return <LoadingSpinner />;

  return (
    <>
      <BackButton href={`/Lieferanten/${lid}`} />
      <h1 className="mb-4">{ap.Name} bearbeiten</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input required placeholder="Muster GmbH" {...field} />
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
            <Button
              variant="destructive"
              onClick={(e) => {
                e.preventDefault();
                void onDelete();
              }}
            >
              Löschen
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
