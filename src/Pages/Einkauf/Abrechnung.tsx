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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEinkaufsListe, sendPayPalMail } from "@/db/Einkauf";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  PayPalName: z.string(),
  Benutzer: z.string().email(),
  Betrag: z.string(),
});

export default function Abrechnung() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["einkaufsliste"],
    queryFn: getEinkaufsListe,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Error...</>;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    let user = values.PayPalName;
    if (values.PayPalName.startsWith("@")) {
      user = user.substring(1);
    }
    formData.set("Name", user);
    formData.set("Mail", values.Benutzer);
    formData.set("Betrag", values.Betrag);

    const res = await sendPayPalMail(formData);

    if (res.error.length > 1) {
      setErrorMsg(res.error);
    } else {
      form.reset({ Benutzer: undefined, Betrag: "" });
    }
  };

  return (
    <>
      <h1>PayPal Abrechnung</h1>
      {errorMsg && (
        <p className="my-8 text-2xl font-bold text-red-500">{errorMsg}</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <FormField
            control={form.control}
            name="PayPalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benutzername</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Dein PayPal Benutzername</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Benutzer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte Mitarbeiter wählen" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.map((x) => {
                      if (x.Paypal && x.Name.String && x.Email.String)
                        return (
                          <SelectItem key={x.ID} value={x.Email.String}>
                            {x.Name.String}
                          </SelectItem>
                        );
                    })}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Betrag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Betrag in €</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Absenden</Button>
        </form>
      </Form>
    </>
  );
}
