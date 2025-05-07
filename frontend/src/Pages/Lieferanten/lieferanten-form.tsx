import { GetLieferant, UpsertLieferant } from "@/api";
import { DeleteLieferant, LieferantenParams } from "@/api/lieferanten";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  Firma: z.string(),
  Kundennummer: z.string().optional(),
  Webseite: z.string().optional(),
});

export default function LieferantenForm({ id }: { id?: number }) {
  const queryClient = useQueryClient();
  const queryData = useQuery({
    queryKey: ["lieferant", id],
    queryFn: () => GetLieferant(id?.toString()),
  });
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (id == 0) return;

    if (queryData.data != null) {
      const data = queryData.data;
      form.reset({
        Firma: data.Firma,
        Kundennummer: data.Kundennummer,
        Webseite: data.Webseite,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData.data]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const params: LieferantenParams = {
      Firma: values.Firma,
      Kundennummer: values.Kundennummer ?? "",
      Webseite: values.Webseite ?? "",
    };
    await UpsertLieferant(params);
    queryClient.invalidateQueries({ queryKey: ["lieferant", id] });
    navigate("/lieferanten");
  };

  if (queryData.isPending) {
    return <span>Loading...</span>;
  }

  if (queryData.isError) {
    return <span>Error: {queryData.error.message}</span>;
  }

  return (
    <>
      {queryData.data && queryData.data.Firma ? (
        <h1 className="text-center">{queryData.data.Firma} bearbeiten</h1>
      ) : (
        <h1 className="text-center">Neuer Lieferant</h1>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="Firma"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firma</FormLabel>
                <FormControl>
                  <Input placeholder="Max Muster GmbH" {...field} />
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
                  <Input placeholder="0815" {...field} />
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
                <FormLabel>Short</FormLabel>
                <FormControl>
                  <Input placeholder="www.muster.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Speichern</Button>
        </form>
      </Form>
      {queryData.data?.Firma && (
        <Button
          variant={"destructive"}
          className="mt-4"
          onClick={() => {
            DeleteLieferant(queryData.data?.id).then(() => {
              navigate("/lieferanten");
            });
          }}
        >
          {`Lieferant ${queryData.data.Firma} löschen`}
        </Button>
      )}
    </>
  );
}
