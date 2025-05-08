import { Login } from "@/api";
import { Session } from "@/api/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
  mail: z.string().email(),
  pass: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  let session: Session | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue, _removeValue] = useLocalStorage("session", session);

  const mutation = useMutation({
    mutationFn: ({ mail, pass }: { mail: string; pass: string }) =>
      Login(mail, pass),
    onSuccess: (data) => {
      const ses: Session = {
        User: data,
      };
      setValue(ses);
      navigate("/");
    },
    onError: () => {
      alert("Anmeldung fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutation.mutateAsync(values);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Willkommen zurück</CardTitle>
          <CardDescription>
            Melde dich hier mit deiner E-Mail-Adresse und deinem Passwort an.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="mail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
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
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="pass"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passwort</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Anmelden
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Du hast noch keinen Zugang?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Registrieren
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
