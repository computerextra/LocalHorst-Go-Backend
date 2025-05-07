import { GetEinkaufsliste } from "@/api";
import { Mitarbeiter, SendPayPalLink } from "@/api/mitarbeiter";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Abrechnung() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["einkaufsliste"],
    queryFn: GetEinkaufsliste,
  });
  const [mail, setMail] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [money, setMoney] = useState<string | undefined>(undefined);
  const [menschen, setMenschen] = useState<Array<Mitarbeiter> | undefined>(
    undefined
  );

  useEffect(() => {
    if (data == null) return;

    const u: Array<Mitarbeiter> = [];

    data.forEach((x) => {
      if (x.Paypal && x.Email) {
        u.push(x);
      }
    });

    setMenschen(u);
  }, [data]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleSubmit = async () => {
    if (mail == null) {
      alert("Es wurde kein Mitarbeiter ausgewählt!");
      return;
    }
    if (name == null) {
      alert("Es wurde kein Paypal Benutzername eingegeben");
      return;
    }
    if (money == null) {
      alert("Es wurde kein Betrag eingegeben");
      return;
    }

    const res = await SendPayPalLink({
      Betrag: money,
      Mail: mail,
      Name: name,
    });
    if (!res) {
      alert("Fehler beim senden der Mail.");
      return;
    }

    setMenschen((prev) => {
      const y: Array<Mitarbeiter> = [];
      prev?.forEach((x) => {
        if (x.Email != mail) {
          y.push(x);
        }
      });
      return y;
    });
    setMail("");
    setMoney("");
  };

  return (
    <>
      <BackButton />
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8 my-5">
        <Select required onValueChange={(e) => setMail(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Bitte wählen..." />
          </SelectTrigger>
          <SelectContent>
            {menschen?.map((mensch) => (
              <SelectItem key={mensch.id} value={mensch.Email!}>
                {mensch.Name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Dein Paypal Nutzername</Label>
          <Input
            type="text"
            id="name"
            required
            placeholder="maxmuster"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="betrag">Betrag in €</Label>
          <Input
            type="text"
            id="betrag"
            required
            placeholder="0,25"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        <Button type="submit" onClick={handleSubmit}>
          Mail Senden
        </Button>
      </form>
    </>
  );
}
