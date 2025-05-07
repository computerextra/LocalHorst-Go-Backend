import {
  DeleteAnsprechpartner,
  GetAnsprechpartner,
  UpsertAnsprechpartner,
} from "@/api";
import { AnsprechpartnerParams } from "@/api/lieferanten";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  Name: z.string(),
  Mail: z.string().optional(),
  Mobil: z.string().optional(),
  Telefon: z.string().optional(),
});

export default function AnsprechpartnerForm({
  id,
  lid,
}: {
  id?: number;
  lid: number;
}) {
  const queryClient = useQueryClient();
  const queryData = useQuery({
    queryKey: ["ap", id],
    queryFn: () => GetAnsprechpartner(id?.toString()),
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
        Name: data.Name,
        Mail: data.Mail,
        Mobil: data.Mobil,
        Telefon: data.Telefon,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData.data]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const params: AnsprechpartnerParams = {
      LieferantenId: lid,
      Mail: values.Mail ?? "",
      Mobil: values.Mobil ?? "",
      Telefon: values.Telefon ?? "",
      Name: values.Name,
    };
    await UpsertAnsprechpartner(params);
    queryClient.invalidateQueries({ queryKey: ["ap", id] });
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
      <BackButton href={`/lieferanten/${lid}`} />
      {queryData.data && queryData.data.Name ? (
        <h1 className="text-center">{queryData.data.Name} bearbeiten</h1>
      ) : (
        <h1 className="text-center">Neuer Ansprechpartner</h1>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Max Muster" {...field} />
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
                  <Input placeholder="0815" {...field} />
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
                  <Input placeholder="0815" {...field} />
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
                  <Input placeholder="abc@def.de" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Speichern</Button>
        </form>
      </Form>
      {queryData.data?.Name && (
        <Button
          variant={"destructive"}
          className="mt-4"
          onClick={() => {
            DeleteAnsprechpartner(queryData.data?.id).then(() => {
              navigate("/lieferanten");
            });
          }}
        >
          {`${queryData.data.Name} löschen`}
        </Button>
      )}
    </>
  );
}
