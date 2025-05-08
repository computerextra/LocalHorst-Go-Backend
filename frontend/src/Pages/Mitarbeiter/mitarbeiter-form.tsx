import { DeleteMitarbeiter, GetMitarbeiter, UpsertMitarbeiter } from "@/api";
import { MitarbeiterParams } from "@/api/mitarbeiter";
import { Login, Session } from "@/api/user";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";

const formSchema = z.object({
  Name: z.string().min(1, { message: "Name ist erforderlich" }),
  Short: z.string().optional(),
  Gruppenwahl: z.string().optional(),
  InternTelefon1: z.string().optional(),
  InternTelefon2: z.string().optional(),
  FestnetzPrivat: z.string().optional(),
  FestnetzAlternativ: z.string().optional(),
  HomeOffice: z.string().optional(),
  MobilBusiness: z.string().optional(),
  MobilPrivat: z.string().optional(),
  Email: z.string().email().optional(),
  Azubi: z.boolean(),
  Geburtstag: z.date().optional(),
});

export default function MitarbeiterForm({ id }: { id?: number }) {
  const queryClient = useQueryClient();
  const queryData = useQuery({
    queryKey: ["mitarbeiter", id],
    queryFn: () => GetMitarbeiter(id ? id.toString() : undefined),
  });
  const mutation = useMutation({
    mutationFn: (params: MitarbeiterParams) => UpsertMitarbeiter(params),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["mitarbeiter", id] });
      if (value?.User.Mitarbeiter?.id == id) {
        if (value?.User.User?.Mail && value.User.User.Password) {
          const res = await Login(
            value?.User.User?.Mail,
            value?.User.User?.Password
          );
          const ses: Session = {
            User: res,
          };
          setValue(ses);
        }
      }
      navigate("/mitarbeiter");
    },
    onError: (err) => {
      alert(err);
    },
  });

  const navigate = useNavigate();

  let session: Session | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue, _removeValue] = useLocalStorage("session", session);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Azubi: false,
      Email: "",
    },
  });

  useEffect(() => {
    if (id == 0) return;

    if (queryData.data != null) {
      const data = queryData.data;
      form.reset({
        Azubi: data.Azubi ?? false,
        Name: data.Name,
        Email: data.Email,
        FestnetzAlternativ: data.FestnetzAlternativ,
        FestnetzPrivat: data.FestnetzPrivat,
        Gruppenwahl: data.Gruppenwahl,
        Geburtstag: new Date(data.Geburtstag),
        HomeOffice: data.HomeOffice,
        InternTelefon1: data.InternTelefon1,
        InternTelefon2: data.InternTelefon2,
        MobilBusiness: data.MobilBusiness,
        MobilPrivat: data.MobilPrivat,
        Short: data.Short,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData.data]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let day = undefined,
      month = undefined,
      year = undefined;
    if (values.Geburtstag) {
      day = values.Geburtstag.getDate();
      month = values.Geburtstag.getMonth() + 1; // Months are 0-indexed in JS
      year = values.Geburtstag.getFullYear();
    }

    const params: MitarbeiterParams = {
      Name: values.Name,
      Short: values.Short ?? "",
      Gruppenwahl: values.Gruppenwahl ?? "",
      InternTelefon1: values.InternTelefon1 ?? "",
      InternTelefon2: values.InternTelefon2 ?? "",
      FestnetzPrivat: values.FestnetzPrivat ?? "",
      FestnetzAlternativ: values.FestnetzAlternativ ?? "",
      HomeOffice: values.HomeOffice ?? "",
      MobilBusiness: values.MobilBusiness ?? "",
      MobilPrivat: values.MobilPrivat ?? "",
      Email: values.Email ?? "",
      Azubi: values.Azubi,
      Day: day ? day : 0,
      Month: month ? month : 0,
      Year: year ? year : 0,
    };
    await mutation.mutateAsync(params);
  };

  if (queryData.isPending) {
    return <span>Loading...</span>;
  }

  if (queryData.isError) {
    return <span>Error: {queryData.error.message}</span>;
  }

  return (
    <>
      <BackButton href={id == null ? "/mitarbeiter" : `/mitarbeiter/${id}`} />
      {queryData.data && queryData.data.Name ? (
        <h1 className="text-center">{queryData.data.Name} bearbeiten</h1>
      ) : (
        <h1 className="text-center">Neuer Mitarbeiter</h1>
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
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Max.Muster@computer-extra.de"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="Short"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short</FormLabel>
                  <FormControl>
                    <Input placeholder="JK" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="HomeOffice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HomeOffice</FormLabel>
                  <FormControl>
                    <Input placeholder="422" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="Gruppenwahl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gruppenwahl</FormLabel>
                  <FormControl>
                    <Input placeholder="122" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="InternTelefon1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>InternTelefon1</FormLabel>
                  <FormControl>
                    <Input placeholder="222" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="InternTelefon2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>InternTelefon2</FormLabel>
                  <FormControl>
                    <Input placeholder="322" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="FestnetzPrivat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Festnetz Privat</FormLabel>
                  <FormControl>
                    <Input placeholder="0561 / 123345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="FestnetzAlternativ"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Festnetz Business Alternativ</FormLabel>
                  <FormControl>
                    <Input placeholder="0561 / 123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="MobilPrivat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobil Privat</FormLabel>
                  <FormControl>
                    <Input placeholder="0151 / 123345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MobilBusiness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobil Business</FormLabel>
                  <FormControl>
                    <Input placeholder="0151 / 123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="Geburtstag"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Geburtstag</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: de })
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={de}
                      selected={field.value}
                      onSelect={field.onChange}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="Azubi"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Azubi</FormLabel>
                      <FormDescription>
                        Aktivieren, wenn der Mitarbeiter ein Azubi ist.
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
          </div>

          <Button type="submit">Speichern</Button>
        </form>
      </Form>
      {queryData.data?.Name && (
        <Button
          variant={"destructive"}
          className="mt-4"
          onClick={() => {
            DeleteMitarbeiter(queryData.data?.id).then(() => {
              navigate("/mitarbeiter");
            });
          }}
        >
          {`Mitarbeiter ${queryData.data.Name} löschen`}
        </Button>
      )}
    </>
  );
}
