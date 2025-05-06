import { Login, Session } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  let session: Session | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue, _removeValue] = useLocalStorage("session", session);

  const [mail, setMail] = useState<string | undefined>(undefined);
  const [pass, setPass] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  // TODO: Testen: https://usehooks-ts.com/react-hook/use-local-storage

  const handleSubmit = async () => {
    if (!mail || !pass) {
      return;
    }
    const user = await Login(mail, pass);
    if (user == null) {
      alert("Anmeldung fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.");
    }
    const ses: Session = {
      User: user,
    };
    setValue(ses);
    navigate("/");
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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    type="email"
                    placeholder="max.muster@computer-extra.de"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Passwort</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
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
        </CardContent>
      </Card>
    </div>
  );
}
