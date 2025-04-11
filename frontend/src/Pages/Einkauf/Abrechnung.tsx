import { useEffect, useState } from "react";
import { GetEinkaufsListe, SendAbrechnung } from "../../../wailsjs/go/main/App";
import { db } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function EinkaufAbrechnung() {
  const [username, setUsername] = useState("");
  const [betrag, setBetrag] = useState<string | undefined>(undefined);
  const [mail, setMail] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<undefined | db.EinkaufModel[]>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      setLoading(true);
      const res = await GetEinkaufsListe();
      const ma: db.EinkaufModel[] = [];
      res.forEach((x) => {
        if (x.Mitarbeiter?.Email && x.Paypal) {
          ma.push(x);
        }
      });
      setUsers(ma);
      setLoading(false);
    }
    x();
  }, []);

  const onSubmit = async () => {
    console.log("betrag", betrag);
    console.log("mail", mail);
    if (betrag == null) return;
    if (mail == null) return;
    setLoading(true);
    if (await SendAbrechnung(username, betrag, mail)) {
      setUsers((prev) => {
        const x: db.EinkaufModel[] = [];
        prev?.map((y) => {
          if (y.Mitarbeiter?.Email != mail) {
            x.push(y);
          }
        });
        return x;
      });
      setBetrag(undefined);
      setMail(undefined);
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton href="/Einkauf" />
      <h1>Paypal Abrechnung</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={(e) => e.preventDefault()} className="mt-12 space-y-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Dein PayPal Benutzername
            </legend>
            <input
              className="input"
              type="text"
              name="Name"
              id="Name"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="MaxMuster"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Der geschuldete Betrag in €
            </legend>
            <input
              className="input"
              type="text"
              name="Betrag"
              id="Betrag"
              required
              defaultValue={betrag}
              onChange={(e) => setBetrag(e.target.value)}
              placeholder="1,50"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Mitarbeiter</legend>
            <select
              className="select"
              name="Mail"
              id="Mail"
              required
              onChange={(e) => setMail(e.target.value)}
              defaultValue={""}
            >
              <option value={""} disabled>
                Bitte Wählen ...
              </option>
              {users?.map((x) => (
                <option value={x.Mitarbeiter?.Email} key={x.id}>
                  {x.Mitarbeiter?.Name}
                </option>
              ))}
            </select>
          </fieldset>
          <input
            type="submit"
            value="Senden"
            onClick={onSubmit}
            disabled={loading}
            className="btn btn-success"
          />
        </form>
      )}
    </>
  );
}
