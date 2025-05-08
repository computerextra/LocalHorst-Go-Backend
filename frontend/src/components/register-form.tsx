import { CreateUser } from "@/api";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
  Name: z.string(),
  Mail: z.string().email(),
  Password: z.string(),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  let session: Session | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue, _removeValue] = useLocalStorage("session", session);

  const mutation = useMutation({
    mutationFn: ({
      Mail,
      Name,
      Password,
    }: {
      Mail: string;
      Name: string;
      Password: string;
    }) => CreateUser({ Mail, Name, Password }),
    onSuccess: (res) => {
      if (res != null)
        setValue({
          User: res,
        });

      navigate("/");
    },
    onError: () => {
      alert("Es ist ein Fehler aufgetreten, bitte erneut versuchen!");
    },
  });

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutation.mutateAsync(values);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Willkommen</CardTitle>
          <CardDescription>
            Registriere dich hier, in dem du das Formular ausfüllst.
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
                      name="Name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Dein Name" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="Mail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="max.muster@computer-extra.de"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Bitte keinen Alias angeben.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="Password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Registrieren
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Du hast bereits einen Zugang?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Anmelden
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
