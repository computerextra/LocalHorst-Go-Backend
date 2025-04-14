import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  DeleteEinkauf,
  GetEinkauf,
  SkipEinkauf,
  UpdateEinkauf,
  UploadImage,
} from "../../../wailsjs/go/main/App";
import { main } from "../../../wailsjs/go/models";
import BackButton from "../../Components/BackButton";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function EinkaufEingabe() {
  const { id } = useParams();
  const [Dinge, setDinge] = useState<string | undefined>(undefined);
  const [Pfand, setPfand] = useState<string | undefined>(undefined);
  const [Geld, setGeld] = useState<string | undefined>(undefined);
  const [Bild1, setBild1] = useState<string | undefined>(undefined);
  const [Bild2, setBild2] = useState<string | undefined>(undefined);
  const [Bild3, setBild3] = useState<string | undefined>(undefined);
  const [Paypal, setPaypal] = useState<boolean | undefined>(undefined);
  const [Abonniert, setAbonniert] = useState<boolean | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  const [uploadRes1, setUploadRes1] = useState<string | undefined>(undefined);
  const [uploadRes2, setUploadRes2] = useState<string | undefined>(undefined);
  const [uploadRes3, setUploadRes3] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    async function x() {
      if (id == null) return;
      setLoading(true);
      const res = await GetEinkauf(id);
      if (res) {
        setDinge(res.Dinge.Valid ? res.Dinge.String : undefined);
        setPfand(res.Pfand.Valid ? res.Pfand.String : undefined);
        setGeld(res.Geld.Valid ? res.Geld.String : undefined);
        setPaypal(res.Paypal);
        setAbonniert(res.Abonniert);
      }
      setLoading(false);
    }
    x();
  }, [id]);

  const uploadFile = async (nr: string) => {
    if (id == null) return;
    const res = await UploadImage(id, nr);
    if (nr == "1") {
      setBild1(res);
      setUploadRes1(res);
    } else if (nr == "2") {
      setBild2(res);
      setUploadRes2(res);
    } else if (nr == "3") {
      setBild3(res);
      setUploadRes3(res);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const params: main.EinkaufResponse = {
      Abonniert: Abonniert != null ? Abonniert : false,
      Paypal: Paypal != null ? Paypal : false,
      Bild1: Bild1 != null ? Bild1 : "",
      Bild2: Bild2 != null ? Bild2 : "",
      Bild3: Bild3 != null ? Bild3 : "",
      Dinge: Dinge != null ? Dinge : "",
      Geld: Geld != null ? Geld : "",
      Pfand: Pfand != null ? Pfand : "",
      MitarbeiterId: id!,
    };
    if (await UpdateEinkauf(params)) {
      navigate("/Einkauf");
    } else {
      alert("Server Fehler");
    }
  };

  return (
    <>
      <BackButton href="/Einkauf/Auswahl" />

      <h1>Einkauf Eingabe</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <a
            href="https://www.edeka.de/markt-id/10001842/prospekt/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary my-4"
          >
            Edeka Blättchen
          </a>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mt-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="Geld">Geld</label>
                <input
                  type="text"
                  name="Geld"
                  className="input"
                  defaultValue={Geld}
                  onChange={(e) => setGeld(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="Pfand">Pfand</label>
                <input
                  type="text"
                  name="Pfand"
                  className="input"
                  defaultValue={Pfand}
                  onChange={(e) => setPfand(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="Paypal">Paypal</label>

                <input
                  type="checkbox"
                  checked={Paypal}
                  onChange={() => setPaypal((prev) => !prev)}
                  name="Paypal"
                  className="toggle toggle-success"
                />
              </div>
              <div>
                <div
                  className="tooltip pe-1"
                  data-tip="Wenn dieser Einkauf Abonniert wird, wird er jeden Tag erneut in der Einkaufsliste angezeigt. Um das Abo zu beenden muss dieser Slider auf 'aus' geschoben und der Einkauf neu gespeichert werden."
                >
                  <label htmlFor="Abonniert">Abo</label>
                </div>
                <input
                  type="checkbox"
                  checked={Abonniert}
                  onChange={() => setAbonniert((prev) => !prev)}
                  id="Abonniert"
                  name="Abonniert"
                  className="toggle toggle-success"
                />
              </div>
            </div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Dein Einkauf</legend>
              <textarea
                className="textarea h-44 !w-full"
                name="Dinge"
                defaultValue={Dinge}
                onChange={(e) => setDinge(e.target.value)}
              />
            </fieldset>
            <div className="grid grid-cols-3 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Bild 1</legend>
                <button
                  className="btn btn-primary"
                  onClick={async () => await uploadFile("1")}
                >
                  {uploadRes1 ? uploadRes1 : "Bild hochladen"}
                </button>

                <label className="fieldset-label">Maximal 2MB</label>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Bild 2</legend>
                <button
                  className="btn btn-primary"
                  onClick={async () => await uploadFile("2")}
                >
                  {uploadRes2 ? uploadRes2 : "Bild hochladen"}
                </button>
                <label className="fieldset-label">Maximal 2MB</label>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Bild 3</legend>
                <button
                  className="btn btn-primary"
                  onClick={async () => await uploadFile("3")}
                >
                  {uploadRes3 ? uploadRes3 : "Bild hochladen"}
                </button>
                <label className="fieldset-label">Maximal 2MB</label>
              </fieldset>
            </div>
            <input
              type="submit"
              value="Speichern"
              className="btn btn-success"
              onClick={handleSubmit}
            />
          </form>
          <div className="divider mt-12">ACHTUNG</div>
          <div className="flex w-full justify-center">
            <button
              className="btn btn-secondary"
              onClick={async () => {
                if (await SkipEinkauf(id!)) {
                  navigate("/Einkauf");
                } else {
                  alert("Server Fehler!");
                }
              }}
            >
              Einkauf Überspringen
            </button>
            <div className="divider divider-horizontal"></div>
            <button
              className="btn btn-error"
              onClick={async () => {
                if (await DeleteEinkauf(id!)) {
                  navigate("/Einkauf");
                } else {
                  alert("Server Fehler!");
                }
              }}
            >
              Einkauf Löschen
            </button>
          </div>
        </>
      )}
    </>
  );
}
