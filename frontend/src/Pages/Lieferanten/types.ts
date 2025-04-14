import { db } from "../../../wailsjs/go/models";

type Lieferant = {
  id: string;
  Firma: string;
  Kundennummer?: string;
  Webseite?: string;
  Ansprechpartner: Ansprechpartner[];
};
type Ansprechpartner = {
  id: string;
  Name: string;
  Telefon?: string;
  Mobil?: string;
  Mail?: string;
  lieferantenId: string;
};

function GenerateLieferant(lieferant: db.GetLieferantRow[]): Lieferant {
  const l: Lieferant = {
    id: lieferant[0].ID,
    Firma: lieferant[0].Firma,
    Kundennummer: lieferant[0].Kundennummer.Valid
      ? lieferant[0].Kundennummer.String
      : undefined,
    Webseite: lieferant[0].Webseite.Valid
      ? lieferant[0].Webseite.String
      : undefined,
    Ansprechpartner: [],
  };
  l.Ansprechpartner = [];
  lieferant.map((x) => {
    if (x.ID_2.Valid && x.Name.Valid) {
      l.Ansprechpartner.push({
        id: x.ID_2.String,
        lieferantenId: x.ID,
        Name: x.Name.String,
        Mail: x.Mail.Valid ? x.Mail.String : undefined,
        Mobil: x.Mobil.Valid ? x.Mobil.String : undefined,
        Telefon: x.Telefon.Valid ? x.Telefon.String : undefined,
      });
    }
  });
  return l;
}

export { GenerateLieferant, type Lieferant, type Ansprechpartner };
