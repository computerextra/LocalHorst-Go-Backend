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
import { setLocalSession } from "@/hooks/useSession";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Login } from "../../wailsjs/go/main/App";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [mail, setMail] = useState<string | undefined>(undefined);
  const [pass, setPass] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!mail || !pass) {
      return;
    }
    Login(mail, pass)
      .then((res) => {
        setLocalSession({
          User: res,
        });
      })
      .catch(() => {
        alert("Anmeldung fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.");
      })
      .finally(() => {
        navigate("/");
      });
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
