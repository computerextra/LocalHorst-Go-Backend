import { GetAllGlobalMitarbeiter, GetMitarbeiter, UpdateEinkauf } from "@/api";
import {
  DeleteEinkauf,
  EinkaufParams,
  Mitarbeiter,
  SkipEinkauf,
  UploadImage,
} from "@/api/mitarbeiter";
import { Session } from "@/api/user";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";

export default function Eingabe() {
  let session: Session | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, _setValue, _removeValue] = useLocalStorage("session", session);
  const global = useQuery({
    queryKey: ["globaleMitarbeiter"],
    queryFn: () => GetAllGlobalMitarbeiter(),
  });
  const einkauf = useQuery({
    queryKey: ["mitarbeiter_einkauf"],
    queryFn: () => GetMitarbeiter(value?.User?.id?.toString() ?? undefined),
  });

  const [id, setId] = useState<number | undefined>(undefined);
  const [Geld, setGeld] = useState<string | undefined>(undefined);
  const [Pfand, setPfand] = useState<string | undefined>(undefined);
  const [Einkauf, setEinkauf] = useState<string | undefined>(undefined);
  const [Bild1, setBild1] = useState<string | undefined>(undefined);
  const [Bild2, setBild2] = useState<string | undefined>(undefined);
  const [Bild3, setBild3] = useState<string | undefined>(undefined);
  const [Paypal, setPaypal] = useState<boolean>(false);
  const [Abo, setAbo] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (einkauf.data == null) return;

    setId(einkauf.data.id);
    setGeld(einkauf.data.Geld);
    setPfand(einkauf.data.Pfand);
    setEinkauf(einkauf.data.Dinge);
    setPaypal(einkauf.data.Paypal ?? false);
    setAbo(einkauf.data.Abonniert ?? false);
  }, [einkauf.data]);

  useEffect(() => {
    if (id == null) return;

    let ma: Mitarbeiter | undefined = undefined;
    global?.data?.map((x) => {
      if (x.id == id) {
        ma = x;
        return;
      }
    });
    if (ma == undefined) {
      if (einkauf?.data?.id == id) {
        ma = einkauf.data;
      }
    }

    if (ma == null) return;

    setGeld(ma.Geld);
    setPfand(ma.Pfand);
    setEinkauf(ma.Dinge);
    setPaypal(ma.Paypal ?? false);
    setAbo(ma.Abonniert ?? false);
    setBild1(undefined);
    setBild2(undefined);
    setBild3(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (global.isPending) {
    return <span>Loading Globals...</span>;
  }
  if (einkauf.isPending) {
    return <span>Loading Mitarbeiter...</span>;
  }

  if (global.isError) {
    return <span>Error: {global.error.message}</span>;
  }
  if (einkauf.isError) {
    return <span>Error: {einkauf.error.message}</span>;
  }

  const uploadImage = async (nr: number) => {
    if (id == null) return;
    const res = await UploadImage(id, nr.toString());
    switch (nr) {
      case 1:
        setBild1(res);
        break;

      case 2:
        setBild2(res);
        break;

      case 3:
        setBild3(res);
        break;
    }
  };

  const handleSubmit = async () => {
    console.log("Sumbit start");
    let ma: Mitarbeiter | null = null;
    global?.data?.map((x) => {
      if (x.id == id) {
        ma = x;
        return;
      }
    });
    if (ma == undefined) {
      if (einkauf.data?.id == id) {
        ma = einkauf.data;
      }
    }
    console.log(ma);
    if (ma == null || ma.id == null) {
      alert("Kann keinen Mitarbeiter finden");
      return;
    }

    const params: EinkaufParams = {
      Abonniert: Abo,
      Bild1: Bild1 ?? "",
      Bild2: Bild2 ?? "",
      Bild3: Bild3 ?? "",
      Dinge: Einkauf ?? "",
      Geld: Geld ?? "",
      Paypal: Paypal,
      Pfand: Pfand ?? "",
    };

    const res = await UpdateEinkauf(params, ma);
    if (!res) {
      alert("Fehler beim Speichern.");
    } else {
      navigate("/einkauf");
    }
  };

  return (
    <div>
      {(value == null || value.User == null) && (
        <>
          <h2 className="text-center">
            Nicht angemeldet. Ohne Anmeldung stehen nur allegemein Verfügbare
            Eingaben zur Verfügung.
          </h2>
          <div className="grid my-5">
            <Button asChild>
              <Link to="/login">Anmelden</Link>
            </Button>
          </div>
        </>
      )}
      <Button variant={"outline"} asChild>
        <a
          href="https://www.edeka.de/markt-id/10001842/prospekt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Edeka Blättchen
        </a>
      </Button>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8 mt-5">
        <Select
          required
          onValueChange={(e) => setId(parseInt(e))}
          value={id?.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Mitarbeiter" />
          </SelectTrigger>
          <SelectContent>
            {value?.User?.id && (
              <SelectItem value={value.User.id.toString()}>
                {value.User.Name}
              </SelectItem>
            )}
            {global.data.map((x) => {
              if (x.id)
                return (
                  <SelectItem key={x.id} value={x.id.toString()}>
                    {x.Name}
                  </SelectItem>
                );
            })}
          </SelectContent>
        </Select>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Geld">Geld in €</Label>
            <Input type="text" id="Geld" placeholder="0,25" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Pfand">Pfand in €</Label>
            <Input type="text" id="Pfand" placeholder="0,25" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="Paypal"
              checked={Paypal}
              onCheckedChange={() => setPaypal((prev) => !prev)}
            />
            <Label htmlFor="Paypal">Paypal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="Abo"
              checked={Abo}
              onCheckedChange={() => setAbo((prev) => !prev)}
            />
            <Label htmlFor="Abo">Abo</Label>
          </div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="Einkauf">Dein Einkauf</Label>
          <Textarea
            placeholder="Dein Einkauf..."
            value={Einkauf}
            onChange={(e) => setEinkauf(e.target.value)}
            id="Einkauf"
          />
        </div>
        <div className="grid grid-cols-3">
          <fieldset>
            <legend>Bild 1</legend>
            <Button
              variant={"outline"}
              onClick={async () => await uploadImage(1)}
            >
              {Bild1 && Bild1.length > 0 ? Bild1 : "Bild hochladen"}
            </Button>
          </fieldset>
          <fieldset>
            <legend>Bild 2</legend>
            <Button
              variant={"outline"}
              onClick={async () => await uploadImage(2)}
            >
              {Bild2 && Bild2.length > 0 ? Bild2 : "Bild hochladen"}
            </Button>
          </fieldset>
          <fieldset>
            <legend>Bild 3</legend>
            <Button
              variant={"outline"}
              onClick={async () => await uploadImage(3)}
            >
              {Bild3 && Bild3.length > 0 ? Bild3 : "Bild hochladen"}
            </Button>
          </fieldset>
        </div>
        <Button type="submit" onClick={handleSubmit}>
          Speichern
        </Button>
      </form>

      <Separator className="my-8" />
      <div className="flex justify-around mb-10">
        <Button
          variant={"secondary"}
          onClick={async () => {
            if (id == null) return;
            const res = await SkipEinkauf(id);
            if (res) {
              navigate("/einkauf");
            } else {
              alert("Konnte Einkauf nicht verschieben");
            }
          }}
        >
          Einkauf auf morgen verschieben
        </Button>
        <Button
          variant={"destructive"}
          onClick={async () => {
            if (id == null) return;
            const res = await DeleteEinkauf(id);
            if (res) {
              navigate("/einkauf");
            } else {
              alert("Konnte Einkauf nicht löschen");
            }
          }}
        >
          Einkauf löschen
        </Button>
      </div>
    </div>
  );
}
