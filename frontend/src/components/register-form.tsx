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
import { CreateUser, Login } from "../../wailsjs/go/main/App";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState<string | undefined>(undefined);
  const [mail, setMail] = useState<string | undefined>(undefined);
  const [pass, setPass] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !mail || !pass) {
      return;
    }
    CreateUser({
      Mail: mail,
      Name: name,
      Password: pass,
    })
      .then((res) => {
        if (res) {
          Login(mail, pass).then((res) => {
            if (res == null) {
              return;
            } else {
              setLocalSession({
                User: res,
              });
            }
          });
        }
      })
      .finally(() => {
        navigate("/");
      });
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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Dein Name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="email">Email</Label>
                    <span className="ml-auto text-sm underline-offset-4 ">
                      Bitte keinen Alias angeben.
                    </span>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
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
        </CardContent>
      </Card>
    </div>
  );
}
