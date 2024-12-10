/* eslint-disable react-hooks/exhaustive-deps */
import LoadingSpinner from "@/components/LoadingSpinner";
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
import { Switch } from "@/components/ui/switch";
import { deleteJob, getJob, updateJob, UpdateJobProps } from "@/db/cms/Job";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

export default function JobsEdit() {
  const { jid } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Job", jid],
    queryFn: () => getJob({ id: jid ?? "" }),
  });
  const form = useForm<z.infer<typeof UpdateJobProps>>({
    resolver: zodResolver(UpdateJobProps),
    defaultValues: {
      ID: data?.ID ?? "",
      Name: data?.Name ?? "",
      Online: data?.Online ?? false,
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data == null) return;

    form.reset({
      ID: data.ID,
      Name: data.Name,
      Online: data.Online,
    });
  }, [data]);

  const onSubmit = async (values: z.infer<typeof UpdateJobProps>) => {
    const res = await updateJob(values);
    if (res) navigate("/CMS/Jobs");
  };

  const handleDelete = async () => {
    if (jid == null) return;
    await deleteJob({ id: jid });
    navigate("/CMS/Jobs");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Fehler...</>;

  return (
    <>
      <h1 className="my-8">Neuen Job Anlegen</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <div>
            <h3 className="mb-4 text-lg font-medium">Anzeige auf Webseite</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="Online"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Online</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button type="submit">Speichern</Button>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                void handleDelete();
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
