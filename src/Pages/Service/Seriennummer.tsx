import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { getSeriennummer, GetSeriennummerProps } from "@/db/sage/Seriennummer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Terminal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Seriennummer() {
  const [string, setString] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof GetSeriennummerProps>>({
    resolver: zodResolver(GetSeriennummerProps),
  });

  const onSubmit = async (values: z.infer<typeof GetSeriennummerProps>) => {
    const res = await getSeriennummer(values);
    if (res) {
      const x = `${values.Artikelnummer}: ${res}`;
      setString(x);
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(x);
      } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement("textarea");
        textArea.value = x;

        // Move textarea out of the viewport
        textArea.style.position = "absolute";
        textArea.style.left = "-99999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
          document.execCommand("copy");
        } catch (error) {
          alert(error);
        } finally {
          textArea.remove();
        }
      }

      setTimeout(() => {
        setString(undefined);
        form.reset({
          Artikelnummer: "",
        });
      }, 2000);
    }
  };

  return (
    <>
      <h1 className="mt-8">Seriennummern</h1>
      <h2 className="mb-8">
        Eingabe von Artieklnummern: Hinterlegt in der Zwischenablage das
        passende Format für CE SN
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit">Senden</Button>
        </form>
      </Form>

      {string && (
        <Alert className="mt-8">
          <Terminal className="w-4 h-4" />
          <AlertTitle>Text Kopiert.</AlertTitle>
          <AlertDescription>
            {string} wurde in die Zwischenablage kopiert.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
