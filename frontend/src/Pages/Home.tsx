import Einkaufsliste from "@/Pages/Einkauf/Einkaufsliste";
import { ChangePassword, Session } from "@/api/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { UserCheck } from "lucide-react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useReadLocalStorage } from "usehooks-ts";
import { z } from "zod";
import Geburtstagsliste from "./Mitarbeiter/Geburtstagsliste";

const formSchema = z.object({
  OldPass: z.string(),
  NewPass: z
    .string()
    .min(8, { message: "Dein Passwort muss mindestens 8 Zeichen lang sein." }),
  NewPassRedo: z.string(),
});

export default function Home() {
  const session = useReadLocalStorage<Session | undefined>("session");

  const mutate = useMutation({
    mutationFn: ({ user, newPass }: { user: Session; newPass: string }) =>
      ChangePassword(user, newPass),
    onSuccess: (res) => {
      alert(res);
      location.reload();
    },
    onError: (err) => {
      alert("Fehler beim Speichern: " + err.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (session?.User.User?.Password !== values.OldPass) {
      form.setError(
        "OldPass",
        {
          message: "Das eingegebene Passwort ist falsch!",
        },
        { shouldFocus: true }
      );
      return;
    }
    if (values.NewPass !== values.NewPassRedo) {
      form.setError(
        "NewPass",
        {
          message: "Die Passwörter stimmen nicht überein",
        },
        { shouldFocus: true }
      );
      form.setError("NewPassRedo", {
        message: "Die Passwörter stimmen nicht überein",
      });
      return;
    }
    await mutate.mutateAsync({
      newPass: values.NewPass,
      user: session,
    });
  };

  return (
    <>
      {session?.User && (
        <Alert className="mb-2 print:hidden">
          <UserCheck className="h-4 w-4" />
          <AlertTitle>
            <div className="flex flex-row justify-between">
              Angemeldet
              <Button variant={"outline"} size={"sm"}>
                Abmelden
              </Button>
            </div>
          </AlertTitle>

          <AlertDescription>
            <p className="my-1">Angemeldet als: {session.User.User?.Name}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"} variant="outline">
                  Passwort ändern
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Passwort ändern</DialogTitle>
                  <DialogDescription>
                    Hier kannst du dein Passwort jederzeit ändern.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                      <FormField
                        control={form.control}
                        name="OldPass"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Altes Passwort</FormLabel>
                              <FormControl>
                                <Input
                                  required
                                  type="password"
                                  className="col-span-3"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="NewPass"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Neues Passwort</FormLabel>
                              <FormControl>
                                <Input
                                  required
                                  type="password"
                                  className="col-span-3"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="NewPassRedo"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>
                                Neues Passwort (wiederholen)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  required
                                  type="password"
                                  className="col-span-3"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </AlertDescription>
        </Alert>
      )}
      <h1 className="text-center print:hidden">Victor</h1>
      <Separator className="my-4 print:hidden" />
      <h2 className="print:hidden">
        <Suspense fallback="Bin Laden ...">
          Einkaufsliste vom {new Date().toLocaleDateString()}
        </Suspense>
      </h2>
      <Einkaufsliste />
      <Separator className="my-4 print:hidden" />
      <div className="print:hidden">
        <Suspense fallback="Bin Laden ...">
          <h2>Geburtstagsliste</h2>
        </Suspense>
        <Geburtstagsliste />
      </div>
    </>
  );
}
