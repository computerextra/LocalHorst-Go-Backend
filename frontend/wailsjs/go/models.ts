export namespace db {
	
	export class Ansprechpartner {
	    Id: string;
	    Name: string;
	    Telefon: sql.NullString;
	    Mobil: sql.NullString;
	    Mail: sql.NullString;
	    LieferantenId: sql.NullString;
	
	    static createFrom(source: any = {}) {
	        return new Ansprechpartner(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Name = source["Name"];
	        this.Telefon = this.convertValues(source["Telefon"], sql.NullString);
	        this.Mobil = this.convertValues(source["Mobil"], sql.NullString);
	        this.Mail = this.convertValues(source["Mail"], sql.NullString);
	        this.LieferantenId = this.convertValues(source["LieferantenId"], sql.NullString);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class AnsprechpartnerParams {
	    Name: string;
	    Telefon?: string;
	    Mobil?: string;
	    Mail?: string;
	    LieferantenId: string;
	
	    static createFrom(source: any = {}) {
	        return new AnsprechpartnerParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Telefon = source["Telefon"];
	        this.Mobil = source["Mobil"];
	        this.Mail = source["Mail"];
	        this.LieferantenId = source["LieferantenId"];
	    }
	}
	export class Archive {
	    Id: number;
	    Title: string;
	    Body: string;
	
	    static createFrom(source: any = {}) {
	        return new Archive(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Title = source["Title"];
	        this.Body = source["Body"];
	    }
	}
	export class Artikel {
	    Id: number;
	    Artikelnummer: string;
	    Suchbegriff: string;
	    Anzahl: number;
	    TeamId: number;
	
	    static createFrom(source: any = {}) {
	        return new Artikel(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Artikelnummer = source["Artikelnummer"];
	        this.Suchbegriff = source["Suchbegriff"];
	        this.Anzahl = source["Anzahl"];
	        this.TeamId = source["TeamId"];
	    }
	}
	export class Mitarbeiter {
	    Id: string;
	    Name: string;
	    Short: sql.NullString;
	    Gruppenwahl: sql.NullString;
	    InternTelefon1: sql.NullString;
	    InternTelefon2: sql.NullString;
	    FestnetzAlternativ: sql.NullString;
	    FestnetzPrivat: sql.NullString;
	    HomeOffice: sql.NullString;
	    MobilBusiness: sql.NullString;
	    MobilPrivat: sql.NullString;
	    Email: sql.NullString;
	    Azubi: sql.NullBool;
	    Geburtstag: sql.NullTime;
	
	    static createFrom(source: any = {}) {
	        return new Mitarbeiter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Name = source["Name"];
	        this.Short = this.convertValues(source["Short"], sql.NullString);
	        this.Gruppenwahl = this.convertValues(source["Gruppenwahl"], sql.NullString);
	        this.InternTelefon1 = this.convertValues(source["InternTelefon1"], sql.NullString);
	        this.InternTelefon2 = this.convertValues(source["InternTelefon2"], sql.NullString);
	        this.FestnetzAlternativ = this.convertValues(source["FestnetzAlternativ"], sql.NullString);
	        this.FestnetzPrivat = this.convertValues(source["FestnetzPrivat"], sql.NullString);
	        this.HomeOffice = this.convertValues(source["HomeOffice"], sql.NullString);
	        this.MobilBusiness = this.convertValues(source["MobilBusiness"], sql.NullString);
	        this.MobilPrivat = this.convertValues(source["MobilPrivat"], sql.NullString);
	        this.Email = this.convertValues(source["Email"], sql.NullString);
	        this.Azubi = this.convertValues(source["Azubi"], sql.NullBool);
	        this.Geburtstag = this.convertValues(source["Geburtstag"], sql.NullTime);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Einkauf {
	    Id: string;
	    Paypal: boolean;
	    Abonniert: boolean;
	    Geld: sql.NullString;
	    Pfand: sql.NullString;
	    Dinge: sql.NullString;
	    MitarbeiterId: string;
	    // Go type: time
	    Abgeschickt: any;
	    Bild1: sql.NullString;
	    Bild2: sql.NullString;
	    Bild3: sql.NullString;
	    Bild1Date: sql.NullTime;
	    Bild2Date: sql.NullTime;
	    Bild3Date: sql.NullTime;
	    Mitarbeiter: Mitarbeiter;
	
	    static createFrom(source: any = {}) {
	        return new Einkauf(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Paypal = source["Paypal"];
	        this.Abonniert = source["Abonniert"];
	        this.Geld = this.convertValues(source["Geld"], sql.NullString);
	        this.Pfand = this.convertValues(source["Pfand"], sql.NullString);
	        this.Dinge = this.convertValues(source["Dinge"], sql.NullString);
	        this.MitarbeiterId = source["MitarbeiterId"];
	        this.Abgeschickt = this.convertValues(source["Abgeschickt"], null);
	        this.Bild1 = this.convertValues(source["Bild1"], sql.NullString);
	        this.Bild2 = this.convertValues(source["Bild2"], sql.NullString);
	        this.Bild3 = this.convertValues(source["Bild3"], sql.NullString);
	        this.Bild1Date = this.convertValues(source["Bild1Date"], sql.NullTime);
	        this.Bild2Date = this.convertValues(source["Bild2Date"], sql.NullTime);
	        this.Bild3Date = this.convertValues(source["Bild3Date"], sql.NullTime);
	        this.Mitarbeiter = this.convertValues(source["Mitarbeiter"], Mitarbeiter);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Lieferant {
	    Id: string;
	    Firma: string;
	    Kundennummer: sql.NullString;
	    Webseite: sql.NullString;
	    Ansprechpartner: Ansprechpartner[];
	
	    static createFrom(source: any = {}) {
	        return new Lieferant(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Firma = source["Firma"];
	        this.Kundennummer = this.convertValues(source["Kundennummer"], sql.NullString);
	        this.Webseite = this.convertValues(source["Webseite"], sql.NullString);
	        this.Ansprechpartner = this.convertValues(source["Ansprechpartner"], Ansprechpartner);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class LieferantenParams {
	    Firma: string;
	    Kundennummer?: string;
	    Webseite?: string;
	
	    static createFrom(source: any = {}) {
	        return new LieferantenParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Firma = source["Firma"];
	        this.Kundennummer = source["Kundennummer"];
	        this.Webseite = source["Webseite"];
	    }
	}
	
	export class MitarbeiterParams {
	    Name: string;
	    Short?: string;
	    Gruppenwahl?: string;
	    InternTelefon1?: string;
	    InternTelefon2?: string;
	    FestnetzAlternativ?: string;
	    FestnetzPrivat?: string;
	    HomeOffice?: string;
	    MobilBusiness?: string;
	    MobilPrivat?: string;
	    Email?: string;
	    Azubi: boolean;
	    // Go type: time
	    Geburtstag?: any;
	
	    static createFrom(source: any = {}) {
	        return new MitarbeiterParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Short = source["Short"];
	        this.Gruppenwahl = source["Gruppenwahl"];
	        this.InternTelefon1 = source["InternTelefon1"];
	        this.InternTelefon2 = source["InternTelefon2"];
	        this.FestnetzAlternativ = source["FestnetzAlternativ"];
	        this.FestnetzPrivat = source["FestnetzPrivat"];
	        this.HomeOffice = source["HomeOffice"];
	        this.MobilBusiness = source["MobilBusiness"];
	        this.MobilPrivat = source["MobilPrivat"];
	        this.Email = source["Email"];
	        this.Azubi = source["Azubi"];
	        this.Geburtstag = this.convertValues(source["Geburtstag"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Team {
	    Id: number;
	    Mitarbeiter: string;
	    Farbe: string;
	    Ort: string;
	    InventurJahr: string;
	    Artikel: Artikel[];
	
	    static createFrom(source: any = {}) {
	        return new Team(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Mitarbeiter = source["Mitarbeiter"];
	        this.Farbe = source["Farbe"];
	        this.Ort = source["Ort"];
	        this.InventurJahr = source["InventurJahr"];
	        this.Artikel = this.convertValues(source["Artikel"], Artikel);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class UpsertEinkaufParams {
	    Paypal?: boolean;
	    Abonniert?: boolean;
	    Geld?: string;
	    Pfand?: string;
	    Dinge?: string;
	    Bild1?: string;
	    Bild2?: string;
	    Bild3?: string;
	    MitarbeiterId: string;
	
	    static createFrom(source: any = {}) {
	        return new UpsertEinkaufParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Paypal = source["Paypal"];
	        this.Abonniert = source["Abonniert"];
	        this.Geld = source["Geld"];
	        this.Pfand = source["Pfand"];
	        this.Dinge = source["Dinge"];
	        this.Bild1 = source["Bild1"];
	        this.Bild2 = source["Bild2"];
	        this.Bild3 = source["Bild3"];
	        this.MitarbeiterId = source["MitarbeiterId"];
	    }
	}

}

export namespace main {
	
	export class ImageResponse {
	    Valid: boolean;
	    Image: string;
	
	    static createFrom(source: any = {}) {
	        return new ImageResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Valid = source["Valid"];
	        this.Image = source["Image"];
	    }
	}
	export class Sg_Adressen {
	    SG_Adressen_PK: number;
	    Suchbegriff: sql.NullString;
	    KundNr: sql.NullString;
	    LiefNr: sql.NullString;
	    Homepage: sql.NullString;
	    Telefon1: sql.NullString;
	    Telefon2: sql.NullString;
	    Mobiltelefon1: sql.NullString;
	    Mobiltelefon2: sql.NullString;
	    EMail1: sql.NullString;
	    EMail2: sql.NullString;
	    KundUmsatz: sql.NullFloat64;
	    LiefUmsatz: sql.NullFloat64;
	
	    static createFrom(source: any = {}) {
	        return new Sg_Adressen(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.SG_Adressen_PK = source["SG_Adressen_PK"];
	        this.Suchbegriff = this.convertValues(source["Suchbegriff"], sql.NullString);
	        this.KundNr = this.convertValues(source["KundNr"], sql.NullString);
	        this.LiefNr = this.convertValues(source["LiefNr"], sql.NullString);
	        this.Homepage = this.convertValues(source["Homepage"], sql.NullString);
	        this.Telefon1 = this.convertValues(source["Telefon1"], sql.NullString);
	        this.Telefon2 = this.convertValues(source["Telefon2"], sql.NullString);
	        this.Mobiltelefon1 = this.convertValues(source["Mobiltelefon1"], sql.NullString);
	        this.Mobiltelefon2 = this.convertValues(source["Mobiltelefon2"], sql.NullString);
	        this.EMail1 = this.convertValues(source["EMail1"], sql.NullString);
	        this.EMail2 = this.convertValues(source["EMail2"], sql.NullString);
	        this.KundUmsatz = this.convertValues(source["KundUmsatz"], sql.NullFloat64);
	        this.LiefUmsatz = this.convertValues(source["LiefUmsatz"], sql.NullFloat64);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class User {
	    Name: string;
	    Vorname: string;
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Vorname = source["Vorname"];
	    }
	}

}

export namespace sql {
	
	export class NullBool {
	    Bool: boolean;
	    Valid: boolean;
	
	    static createFrom(source: any = {}) {
	        return new NullBool(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Bool = source["Bool"];
	        this.Valid = source["Valid"];
	    }
	}
	export class NullFloat64 {
	    Float64: number;
	    Valid: boolean;
	
	    static createFrom(source: any = {}) {
	        return new NullFloat64(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Float64 = source["Float64"];
	        this.Valid = source["Valid"];
	    }
	}
	export class NullString {
	    String: string;
	    Valid: boolean;
	
	    static createFrom(source: any = {}) {
	        return new NullString(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.String = source["String"];
	        this.Valid = source["Valid"];
	    }
	}
	export class NullTime {
	    // Go type: time
	    Time: any;
	    Valid: boolean;
	
	    static createFrom(source: any = {}) {
	        return new NullTime(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Time = this.convertValues(source["Time"], null);
	        this.Valid = source["Valid"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

