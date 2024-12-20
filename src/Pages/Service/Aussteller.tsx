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
  createAusstellerImage,
  createAusstellerImageProps,
  syncAusteller,
} from "@/db/Service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Aussteller() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof createAusstellerImageProps>>({
    resolver: zodResolver(createAusstellerImageProps),
  });

  const sync = async () => {
    setLoading(true);
    const res = await syncAusteller();
    if (res.error != "false") {
      setError(res.error);
      return;
    } else {
      setLoading(false);
      setError("Daten erfolgreich synchronisiert");
    }
  };

  const onSubmit = async (
    values: z.infer<typeof createAusstellerImageProps>
  ) => {
    setLoading(true);
    const res = await createAusstellerImage(values);
    if (res.error != "false") {
      setError(res.error);
      setLoading(false);
    } else {
      setError("Bilder Link erfolgreich geschrieben");
      form.reset({
        Artikelnummer: undefined,
        Url: undefined,
      });
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <>
        <BackButton href="/" />
        <h1 className="mt-8 mb-8">Aussteller</h1>
        {loading && <LoadingSpinner />}
        {!loading && <Button onClick={sync}>Sync Aussteller</Button>}
        {error != null && (
          <h2 className="my-8 text-5xl font-bold text-red-600">{error}</h2>
        )}
        {!loading && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-12 space-y-8 "
            >
              <FormField
                control={form.control}
                name="Artikelnummer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artikelnummer</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        )}
      </>
    </AuthPage>
  );
}
