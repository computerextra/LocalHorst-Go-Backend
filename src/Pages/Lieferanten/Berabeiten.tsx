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
  deleteLieferant,
  getLieferant,
  updateLieferant,
  UpdateLieferantParams,
  type Lieferanten,
} from "@/db/Lieferanten";

export default function LieferantBearbeiten() {
  const { lid } = useParams();
  const navigate = useNavigate();
  const [lieferant, setLieferant] = useState<undefined | null | Lieferanten>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  const formSchema = z.object({
    ID: z.string(),
    Firma: z.string(),
    Kundennummer: z.string(),
    Webseite: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID: lid ?? "",
      Firma: lieferant?.Firma,
      Kundennummer: lieferant?.Kundennummer.String ?? "",
      Webseite: lieferant?.Webseite.String ?? "",
    },
  });

  useEffect(() => {
    async function x() {
      if (lid == null) return;
      const Lieferant = await getLieferant({ id: lid });
      setLieferant(Lieferant);
      if (Lieferant != null) {
        form.reset({
          Firma: Lieferant.Firma,
          ID: Lieferant.ID,
          Kundennummer: Lieferant.Kundennummer.String ?? "",
          Webseite: Lieferant.Webseite.String ?? "",
        });
      }
      setLoading(false);
    }

    void x();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lid]);

  const onSumit = async (values: z.infer<typeof formSchema>) => {
    const data: UpdateLieferantParams = {
      Firma: values.Firma,
      ID: lid!,
      Kundennummer: {
        String: values.Kundennummer.length > 1 ? values.Kundennummer : null,
        Valid: values.Kundennummer.length > 1,
      },
      Webseite: {
        String: values.Webseite.length > 1 ? values.Webseite : null,
        Valid: values.Webseite.length > 1,
      },
    };

    const res = await updateLieferant(data);
    if (res) {
      navigate("/Lieferanten");
    }
  };

  const onDelete = async () => {
    if (lid == null) return;
    await deleteLieferant({ id: lid });
    navigate("/Lieferanten");
  };

  if (loading) return <LoadingSpinner />;
  if (lid == null) return <>Keine ID</>;
  if (lieferant == null) return <LoadingSpinner />;

  return (
    <>
      <BackButton href={`/Lieferanten/${lieferant.ID}`} />
      <h1 className="mb-4">{lieferant.Firma} bearbeiten</h1>
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
