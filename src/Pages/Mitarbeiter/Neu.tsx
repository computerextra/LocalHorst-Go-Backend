import { createUser, CreateUserArgs } from "@/db/Mitarbeiter";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { de } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import BackButton from "@/components/BackButton";
import { AuthPage } from "@/components/AuthPage";

export default function MitarbeiterNeu() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof CreateUserArgs>>({
    resolver: zodResolver(CreateUserArgs),
    defaultValues: {},
  });

  const onSumit = async (values: z.infer<typeof CreateUserArgs>) => {
    const formData = new FormData();

    formData.set("Name", values.Name);
    formData.set("Short", values.Short ?? "");
    formData.set("Gruppenwahl", values.Gruppenwahl ?? "");
    formData.set("InternTelefon1", values.InternTelefon1 ?? "");
    formData.set("InternTelefon2", values.InternTelefon2 ?? "");
    formData.set("FestnetzAlternativ", values.FestnetzAlternativ ?? "");
    formData.set("FestnetzPrivat", values.FestnetzPrivat ?? "");
    formData.set("HomeOffice", values.HomeOffice ?? "");
    formData.set("MobilBusiness", values.MobilBusiness ?? "");
    formData.set("MobilPrivat", values.MobilPrivat ?? "");
    formData.set("Email", values.Email ?? "");
    formData.set("Azubi", values.Azubi?.toString() ?? "false");
    formData.set(
      "Geburtstag",
      new Date(values.Geburtstag ?? "").toLocaleDateString("de-DE")
    );

    const res = await createUser(formData);
    if (res) {
      navigate("/Mitarbeiter");
    }
  };

  return (
    <AuthPage>
      <>
        <BackButton href="/Mitarbeiter" />
        <h1 className="mb-4">Neuen Mitarbeiter anlegen</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input required placeholder="Max Muster" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Short"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SE"
                        minLength={2}
                        maxLength={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="max.muster@computer-extra.de"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="Gruppenwahl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gruppenwahl</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={3}
                        minLength={3}
                        placeholder="123"
                        {...field}
                      />
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
                    <FormLabel>Interne Durchwahl 1</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={3}
                        minLength={3}
                        placeholder="123"
                        {...field}
                      />
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
                    <FormLabel>Interne Durchwahl 2</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={3}
                        minLength={3}
                        placeholder="123"
                        {...field}
                      />
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
                    <FormLabel>Private Telefonnummer</FormLabel>
                    <FormControl>
                      <Input placeholder="0561 / 12456789" {...field} />
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
                    <FormLabel>Geschäftliche Telefonnummer</FormLabel>
                    <FormControl>
                      <Input placeholder="0561 / 12456789" {...field} />
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
                    <FormLabel>Private Handynummer</FormLabel>
                    <FormControl>
                      <Input placeholder="0151 / 12456789" {...field} />
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
                    <FormLabel>Geschäftliche Handynummer</FormLabel>
                    <FormControl>
                      <Input placeholder="0151 / 12456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="Azubi"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Azubi?</FormLabel>
                      <FormDescription>
                        Ist dieser Mitarbeiter ein Azubi?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
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
                            format(field.value, "PPPP", { locale: de })
                          ) : (
                            <span>Bitte Auswählen</span>
                          )}
                          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DayPicker
                        locale={de}
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) =>
                          date > new Date() || date < new Date("1920-01-01")
                        }
                        fromYear={1920}
                        toYear={new Date().getFullYear()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Dein Geburtstag</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Speichern</Button>
          </form>
        </Form>
      </>
    </AuthPage>
  );
}
