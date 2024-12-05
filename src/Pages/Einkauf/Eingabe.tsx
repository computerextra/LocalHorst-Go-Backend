import LoadingSpinner from "@/components/LoadingSpinner";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getEinkauf, updateEinkauf, UpdateEinkaufArgs } from "@/db/Einkauf";
import { getUsers } from "@/db/Mitarbeiter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

export function Auswahl() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const navigate = useNavigate();
  const [selected, setSelected] = useState<undefined | string>(undefined);

  useEffect(() => {
    if (selected == null) return;
  }, [selected]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Error...</>;
  return (
    <>
      <h1 className="my-8">Einkauf</h1>
      <Select onValueChange={(e) => setSelected(e)}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Bitte wählen ..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Mitarbeiter</SelectLabel>
            {data?.map((x) => (
              <SelectItem key={x.ID} value={x.ID}>
                {x.Name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selected && (
        <Button
          className="mt-8"
          onClick={() => navigate("/Einkauf/Eingabe/" + selected)}
        >
          Weiter
        </Button>
      )}
    </>
  );
}

export function Eingabe() {
  const { mid } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["einkauf", mid],
    queryFn: () => getEinkauf({ id: mid! }),
    enabled: !!mid,
  });

  const form = useForm<z.infer<typeof UpdateEinkaufArgs>>({
    resolver: zodResolver(UpdateEinkaufArgs),
  });

  useEffect(() => {
    if (data == null) return;

    form.reset({
      id: data.ID,
      mitarbeiterId: data.Mitarbeiterid,
      Bild1: data.Bild1.String ?? undefined,
      Bild2: data.Bild2.String ?? undefined,
      Bild3: data.Bild3.String ?? undefined,
      Dinge: data.Dinge.String ?? undefined,
      Geld: data.Geld.String ?? undefined,
      Paypal: data.Paypal,
      Pfand: data.Pfand.String ?? undefined,
      Abonniert: data.Abonniert,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = async (values: z.infer<typeof UpdateEinkaufArgs>) => {
    let Image1Blob: Blob | null = null,
      Image2Blob: Blob | null = null,
      Image3Blob: Blob | null = null;
    const image1 = document.querySelector("#Bild1") as HTMLInputElement;
    if (image1 != null && image1.files != null && image1.files[0] != null) {
      Image1Blob = image1.files[0];
    }
    const image2 = document.querySelector("#Bild2") as HTMLInputElement;
    if (image2 != null && image2.files != null && image2.files[0] != null) {
      Image2Blob = image2.files[0];
    }

    const image3 = document.querySelector("#Bild3") as HTMLInputElement;
    if (image3 != null && image3.files != null && image3.files[0] != null) {
      Image3Blob = image3.files[0];
    }

    const formData = new FormData();
    formData.set("mitarbeiterId", values.mitarbeiterId);
    formData.append("Bild1", Image1Blob ?? "");
    formData.append("Bild2", Image2Blob ?? "");
    formData.append("Bild3", Image3Blob ?? "");
    formData.set("Dinge", values.Dinge ?? "");
    formData.set("Paypal", values.Paypal ? "true" : "false");
    formData.set("Pfand", values.Pfand ?? "");
    formData.set("Abonniert", values.Abonniert ? "true" : "false");

    const res = await updateEinkauf(formData, values.id);

    if (res) navigate("/Einkauf");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Error...</>;
  return (
    <>
      <h1 className="my-8">Einkauf Eingabe</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="Geld"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Geld</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Dein Bargeld</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Pfand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pfand</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Dein Pfand</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="Paypal"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">PayPal</FormLabel>
                    <FormDescription>Bezahlung per Paypal</FormDescription>
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
            <FormField
              control={form.control}
              name="Abonniert"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Abo</FormLabel>
                    <FormDescription>
                      Wenn dieser Einkauf Abonniert wird, wird er jeden Tag
                      erneut in der Einkaufsliste angezeigt. Um das Abo zu
                      beenden muss dieser Slider auf "aus" geschoben und der
                      Einkauf neu gespeichert werden.
                    </FormDescription>
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
          <FormField
            control={form.control}
            name="Dinge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dein Einkauf</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Dein Einkauf"
                    className="resize-y"
                    rows={20}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Gib hier deinen Einkauf ein</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            {data?.Bild1date.Time &&
            data.Bild1.String &&
            // @ts-expect-error BildDate ist String sollte aber Date sein...
            new Date(data.Bild1date).toLocaleDateString("de-DE") ==
              new Date().toLocaleDateString("de-DE") ? (
              <>BILD</>
            ) : (
              <FormItem>
                <FormLabel>Bild1</FormLabel>
                <FormControl>
                  <Input type="file" id="Bild1" name="Bild1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            {data?.Bild2date.Time &&
            data.Bild2.String &&
            // @ts-expect-error BildDate ist String sollte aber Date sein...
            new Date(data.Bild2date).toLocaleDateString("de-DE") ==
              new Date().toLocaleDateString("de-DE") ? (
              <>BILD</>
            ) : (
              <FormItem>
                <FormLabel>Bild2</FormLabel>
                <FormControl>
                  <Input type="file" id="Bild2" name="Bild2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            {data?.Bild3date.Time &&
            data.Bild3.String &&
            // @ts-expect-error BildDate ist String sollte aber Date sein...
            new Date(data.Bild3date).toLocaleDateString("de-DE") ==
              new Date().toLocaleDateString("de-DE") ? (
              <>BILD</>
            ) : (
              <FormItem>
                <FormLabel>Bild3</FormLabel>
                <FormControl>
                  <Input type="file" id="Bild3" name="Bild3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </div>
          <Button type="submit">Speichern</Button>
        </form>
      </Form>
    </>
  );
}
