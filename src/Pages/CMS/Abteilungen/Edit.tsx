import { AuthPage } from "@/components/AuthPage";
import BackButton from "@/components/BackButton";
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
import {
  deleteAbteilung,
  getAbteilung,
  updateAbteilung,
  UpdateAbteilungProps,
} from "@/db/cms/Abteilung";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

export default function AbteilungEdit() {
  const { aid } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Abteilung", aid],
    queryFn: () => getAbteilung({ id: aid ?? "" }),
  });
  const form = useForm<z.infer<typeof UpdateAbteilungProps>>({
    resolver: zodResolver(UpdateAbteilungProps),
    defaultValues: {
      ID: data?.ID ?? "",
      Name: data?.Name ?? "",
    },
  });
  const navigate = useNavigate();
  const [msg, setMsg] = useState<undefined | string>(undefined);

  useEffect(() => {
    if (data == null) return;

    form.reset({
      ID: data.ID,
      Name: data.Name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = async (values: z.infer<typeof UpdateAbteilungProps>) => {
    const res = await updateAbteilung(values);
    if (res) {
      navigate("/CMS/Abteilungen");
    } else {
      setMsg("Fehler!");
    }
  };

  const handleDelete = async () => {
    if (aid == null) return;
    await deleteAbteilung({ id: aid });
    navigate("/CMS/Abteilungen");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Fehler...</>;

  return (
    <AuthPage>
      <>
        <BackButton href="/CMS/Abteilungen" />
        <h1 className="mt-8">{data?.Name} bearbeiten</h1>

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
            <div className="flex justify-between">
              <Button type="submit">Speichern</Button>
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  void handleDelete();
                }}
              >
                Eintrag Löschen
              </Button>
            </div>
          </form>
        </Form>
      </>
    </AuthPage>
  );
}
