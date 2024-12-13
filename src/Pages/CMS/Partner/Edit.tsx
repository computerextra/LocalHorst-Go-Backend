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
  deletePartner,
  getPartner,
  updatePartner,
  UpdatePartnerProps,
} from "@/db/cms/Partner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

export default function PartnerEdit() {
  const { pid } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Partner", pid],
    queryFn: () => getPartner({ id: pid ?? "" }),
  });
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof UpdatePartnerProps>>({
    resolver: zodResolver(UpdatePartnerProps),
    defaultValues: {
      ID: data?.ID ?? "",
      Image: data?.Image ?? "",
      Link: data?.Link ?? "",
      Name: data?.Name ?? "",
    },
  });

  useEffect(() => {
    if (data == null) return;

    form.reset({
      ID: data.ID,
      Image: data.Image,
      Link: data.Link,
      Name: data.Name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Fehler...</>;

  const onSubmit = async (values: z.infer<typeof UpdatePartnerProps>) => {
    const res = await updatePartner(values);
    if (res) navigate("/CMS/Partner");
  };

  const handleDelete = async () => {
    if (pid == null) return;
    await deletePartner({ id: pid });
    navigate("/CMS/Partner");
  };

  return (
    <AuthPage>
      <>
        <BackButton href="/CMS/Partner" />
        <h1 className="my-8">{data?.Name} bearbeiten</h1>
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
            <FormField
              control={form.control}
              name="Link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
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
                Löschen
              </Button>
            </div>
          </form>
        </Form>
      </>
    </AuthPage>
  );
}
