import {
  DeleteEinkauf,
  GetAllGlobalMitarbeiter,
  GetMitarbeiter,
  SkipEinkauf,
  UpdateEinkauf,
  UploadImage,
} from "@/api";
import type { EinkaufParams } from "@/api/mitarbeiter";
import { Session } from "@/api/user";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";

const formSchema = z.object({
  Geld: z.string().optional(),
  Pfand: z.string().optional(),
  Einkauf: z.string().optional(),
  Paypal: z.boolean(),
  Abo: z.boolean(),
});

export default function Eingabe() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  let session: Session | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, _setValue, _removeValue] = useLocalStorage("session", session);

  const global = useQuery({
    queryKey: ["globaleMitarbeiter"],
    queryFn: () => GetAllGlobalMitarbeiter(),
  });
  const einkauf = useQuery({
    queryKey: ["mitarbeiter_einkauf", value?.User.Mitarbeiter?.id],
    queryFn: () =>
      GetMitarbeiter(value?.User?.Mitarbeiter?.id?.toString() ?? undefined),
  });

  const upsertMutation = useMutation({
    mutationFn: ({ params, id }: { params: EinkaufParams; id: number }) =>
      UpdateEinkauf(params, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mitarbeiter_einkauf", value?.User.Mitarbeiter?.id],
      });
      navigate("/");
    },
    onError: () => {
      alert("Fehler beim Speichern des Einkaufs");
    },
  });
  const imageMutation = useMutation({
    mutationFn: ({ id, nr }: { id: number; nr: string }) => UploadImage(id, nr),
    onSuccess: (data, variables) => {
      if (variables.nr == "1") {
        setBild1(data);
      }
      if (variables.nr == "2") {
        setBild2(data);
      }
      if (variables.nr == "3") {
        setBild3(data);
      }
    },
    onError: (error) => {
      alert("Fehler beim Speichern: " + error.message);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => DeleteEinkauf(id),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["mitarbeiter_einkauf", variables],
      });
      navigate("/");
    },
    onError: (error) => {
      alert("Fehler beim Löschen: " + error.message);
    },
  });
  const skipMutation = useMutation({
    mutationFn: (id: number) => SkipEinkauf(id),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["mitarbeiter_einkauf", variables],
      });
      navigate("/");
    },
    onError: (error) => {
      alert("Fehler beim Verschieben: " + error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Paypal: value?.User.Mitarbeiter?.Paypal ?? false,
      Abo: value?.User.Mitarbeiter?.Abonniert ?? false,
      Einkauf: value?.User.Mitarbeiter?.Dinge,
      Geld: value?.User.Mitarbeiter?.Geld,
      Pfand: value?.User.Mitarbeiter?.Pfand,
    },
  });

  const [id, setId] = useState<number | undefined>(value?.User.Mitarbeiter?.id);
  const [Bild1, setBild1] = useState<string | undefined>(undefined);
  const [Bild2, setBild2] = useState<string | undefined>(undefined);
  const [Bild3, setBild3] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (id == undefined) return;
    // Find Ma
    if (einkauf.data?.id == id) {
      form.reset();
      form.setValue("Abo", einkauf.data.Abonniert ?? false);
      form.setValue("Einkauf", einkauf.data.Dinge);
      form.setValue("Geld", einkauf.data.Geld);
      form.setValue("Paypal", einkauf.data.Paypal ?? false);
      form.setValue("Pfand", einkauf.data.Pfand);

      setBild1(undefined);
      setBild2(undefined);
      setBild3(undefined);

      return;
    }
    const found = global.data?.find((x) => x.id === id);
    if (found == null) return;
    form.reset();
    form.setValue("Abo", found.Abonniert ?? false);
    form.setValue("Einkauf", found.Dinge);
    form.setValue("Geld", found.Geld);
    form.setValue("Paypal", found.Paypal ?? false);
    form.setValue("Pfand", found.Pfand);
    setBild1(undefined);
    setBild2(undefined);
    setBild3(undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (global.isPending) {
    return <span>Loading Globals...</span>;
  }
  if (einkauf.isPending) {
    return <span>Loading Mitarbeiter...</span>;
  }

  if (global.isError) {
    return <span>Error: {global.error.message}</span>;
  }
  if (einkauf.isError) {
    return <span>Error: {einkauf.error.message}</span>;
  }

  const uploadImage = async (nr: number) => {
    imageMutation.mutate({
      id: id!,
      nr: nr.toString(),
    });
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const params: EinkaufParams = {
      Abonniert: values.Abo ?? false,
      Bild1: Bild1 ?? "",
      Bild2: Bild2 ?? "",
      Bild3: Bild3 ?? "",
      Dinge: values.Einkauf ?? "",
      Geld: values.Geld ?? "",
      Paypal: values.Paypal ?? false,
      Pfand: values.Pfand ?? "",
    };

    upsertMutation.mutate({
      id: id!,
      params,
    });
  };

  if (global.isSuccess && einkauf.isSuccess)
    return (
      <div>
        {(value == null || value.User == null) && (
          <>
            <h2 className="text-center">
              Nicht angemeldet. Ohne Anmeldung stehen nur allegemein Verfügbare
              Eingaben zur Verfügung.
            </h2>
            <div className="grid my-5">
              <Button asChild>
                <Link to="/login">Anmelden</Link>
              </Button>
            </div>
          </>
        )}
        <Button variant={"outline"} asChild>
          <a
            href="https://www.edeka.de/markt-id/10001842/prospekt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edeka Blättchen
          </a>
        </Button>
        <div className="mt-5">
          <Select
            required
            defaultValue={id?.toString()}
            onValueChange={(e) => setId(parseInt(e))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Mitarbeiter" />
            </SelectTrigger>
            <SelectContent>
              {einkauf.data?.id && (
                <SelectItem value={einkauf.data.id.toString()}>
                  {einkauf.data.Name}
                </SelectItem>
              )}
              {global.data.map((x) => {
                if (x.id)
                  return (
                    <SelectItem key={x.id} value={x.id.toString()}>
                      {x.Name}
                    </SelectItem>
                  );
              })}
            </SelectContent>
          </Select>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="Geld"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Geld in €</FormLabel>
                    <FormControl>
                      <Input placeholder="0,25" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Pfand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pfand in €</FormLabel>
                    <FormControl>
                      <Input placeholder="0,25" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="Paypal"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Paypal</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Abo"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Abo</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="Einkauf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dein Einkauf</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Dein Einkauf..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3">
              <fieldset>
                <legend>Bild 1</legend>
                <Button
                  variant={"outline"}
                  onClick={async (e) => {
                    e.preventDefault();
                    await uploadImage(1);
                  }}
                >
                  {Bild1 && Bild1.length > 0 ? Bild1 : "Bild hochladen"}
                </Button>
              </fieldset>
              <fieldset>
                <legend>Bild 2</legend>
                <Button
                  variant={"outline"}
                  onClick={async (e) => {
                    e.preventDefault();
                    await uploadImage(2);
                  }}
                >
                  {Bild2 && Bild2.length > 0 ? Bild2 : "Bild hochladen"}
                </Button>
              </fieldset>
              <fieldset>
                <legend>Bild 3</legend>
                <Button
                  variant={"outline"}
                  onClick={async (e) => {
                    e.preventDefault();
                    await uploadImage(3);
                  }}
                >
                  {Bild3 && Bild3.length > 0 ? Bild3 : "Bild hochladen"}
                </Button>
              </fieldset>
            </div>
            <Button type="submit">Speichern</Button>
          </form>
        </Form>

        <Separator className="my-8" />
        <div className="flex justify-around mb-10">
          <Button
            variant={"secondary"}
            onClick={() => skipMutation.mutate(id!)}
          >
            Einkauf auf morgen verschieben
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => deleteMutation.mutate(id!)}
          >
            Einkauf löschen
          </Button>
        </div>
      </div>
    );
}
