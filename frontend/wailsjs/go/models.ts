export namespace ent {
	
	export class LieferantEdges {
	    Ansprechpartner?: Ansprechpartner[];
	
	    static createFrom(source: any = {}) {
	        return new LieferantEdges(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
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
	export class Lieferant {
	    id?: number;
	    Firma?: string;
	    Kundennummer?: string;
	    Webseite?: string;
	    edges: LieferantEdges;
	
	    static createFrom(source: any = {}) {
	        return new Lieferant(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.Firma = source["Firma"];
	        this.Kundennummer = source["Kundennummer"];
	        this.Webseite = source["Webseite"];
	        this.edges = this.convertValues(source["edges"], LieferantEdges);
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
	export class AnsprechpartnerEdges {
	    Lieferant?: Lieferant;
	
	    static createFrom(source: any = {}) {
	        return new AnsprechpartnerEdges(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Lieferant = this.convertValues(source["Lieferant"], Lieferant);
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
	export class Ansprechpartner {
	    id?: number;
	    Name?: string;
	    Telefon?: string;
	    Mobil?: string;
	    Mail?: string;
	    edges: AnsprechpartnerEdges;
	
	    static createFrom(source: any = {}) {
	        return new Ansprechpartner(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.Name = source["Name"];
	        this.Telefon = source["Telefon"];
	        this.Mobil = source["Mobil"];
	        this.Mail = source["Mail"];
	        this.edges = this.convertValues(source["edges"], AnsprechpartnerEdges);
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
	
	export class InventurEdges {
	    Teams?: Team[];
	
	    static createFrom(source: any = {}) {
	        return new InventurEdges(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Teams = this.convertValues(source["Teams"], Team);
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
	export class Inventur {
	    id?: number;
	    Jahr?: number;
	    edges: InventurEdges;
	
	    static createFrom(source: any = {}) {
	        return new Inventur(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.Jahr = source["Jahr"];
	        this.edges = this.convertValues(source["edges"], InventurEdges);
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
	export class TeamEdges {
	    artikel?: Artikel[];
	    Jahr?: Inventur;
	
	    static createFrom(source: any = {}) {
	        return new TeamEdges(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.artikel = this.convertValues(source["artikel"], Artikel);
	        this.Jahr = this.convertValues(source["Jahr"], Inventur);
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
	    id?: number;
	    Team?: number;
	    Mitarbeiter?: string;
	    Farbe?: string;
	    Ort?: string;
	    edges: TeamEdges;
	
	    static createFrom(source: any = {}) {
	        return new Team(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.Team = source["Team"];
	        this.Mitarbeiter = source["Mitarbeiter"];
	        this.Farbe = source["Farbe"];
	        this.Ort = source["Ort"];
	        this.edges = this.convertValues(source["edges"], TeamEdges);
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
	export class ArtikelEdges {
	    team?: Team;
	
	    static createFrom(source: any = {}) {
	        return new ArtikelEdges(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.team = this.convertValues(source["team"], Team);
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
	export class Artikel {
	    id?: number;
	    Artikelnummer?: string;
	    Suchbegriff?: string;
	    Anzahl?: number;
	    edges: ArtikelEdges;
	
	    static createFrom(source: any = {}) {
	        return new Artikel(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.Artikelnummer = source["Artikelnummer"];
	        this.Suchbegriff = source["Suchbegriff"];
	        this.Anzahl = source["Anzahl"];
	        this.edges = this.convertValues(source["edges"], ArtikelEdges);
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
	
	
	
	
	
	export class UserEdges {
	    mitarbeiter?: Mitarbeiter;
	
	    static createFrom(source: any = {}) {
	        return new UserEdges(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.mitarbeiter = this.convertValues(source["mitarbeiter"], Mitarbeiter);
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
	    id?: number;
	    Name?: string;
	    Password?: string;
	    Mail?: string;
	    Active?: boolean;
	    edges: UserEdges;
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.Name = source["Name"];
	        this.Password = source["Password"];
	        this.Mail = source["Mail"];
	        this.Active = source["Active"];
	        this.edges = this.convertValues(source["edges"], UserEdges);
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
	export class MitarbeiterEdges {
	    mitarbeiter?: User;
	
	    static createFrom(source: any = {}) {
	        return new MitarbeiterEdges(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.mitarbeiter = this.convertValues(source["mitarbeiter"], User);
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
	export class Mitarbeiter {
	    id?: number;
	    Name?: string;
	    Short?: string;
	    Gruppenwahl?: string;
	    InternTelefon1?: string;
	    InternTelefon2?: string;
	    FestnetzPrivat?: string;
	    FestnetzAlternativ?: string;
	    HomeOffice?: string;
	    MobilBusiness?: string;
	    MobilPrivat?: string;
	    Email?: string;
	    Azubi?: boolean;
	    // Go type: time
	    Geburtstag?: any;
	    Paypal?: boolean;
	    Abonniert?: boolean;
	    Geld?: string;
	    Pfand?: string;
	    Dinge?: string;
	    // Go type: time
	    Abgeschickt?: any;
	    Bild1?: string;
	    Bild2?: string;
	    Bild3?: string;
	    // Go type: time
	    Bild1Date?: any;
	    // Go type: time
	    Bild2Date?: any;
	    // Go type: time
	    Bild3Date?: any;
	    edges: MitarbeiterEdges;
	
	    static createFrom(source: any = {}) {
	        return new Mitarbeiter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.Name = source["Name"];
	        this.Short = source["Short"];
	        this.Gruppenwahl = source["Gruppenwahl"];
	        this.InternTelefon1 = source["InternTelefon1"];
	        this.InternTelefon2 = source["InternTelefon2"];
	        this.FestnetzPrivat = source["FestnetzPrivat"];
	        this.FestnetzAlternativ = source["FestnetzAlternativ"];
	        this.HomeOffice = source["HomeOffice"];
	        this.MobilBusiness = source["MobilBusiness"];
	        this.MobilPrivat = source["MobilPrivat"];
	        this.Email = source["Email"];
	        this.Azubi = source["Azubi"];
	        this.Geburtstag = this.convertValues(source["Geburtstag"], null);
	        this.Paypal = source["Paypal"];
	        this.Abonniert = source["Abonniert"];
	        this.Geld = source["Geld"];
	        this.Pfand = source["Pfand"];
	        this.Dinge = source["Dinge"];
	        this.Abgeschickt = this.convertValues(source["Abgeschickt"], null);
	        this.Bild1 = source["Bild1"];
	        this.Bild2 = source["Bild2"];
	        this.Bild3 = source["Bild3"];
	        this.Bild1Date = this.convertValues(source["Bild1Date"], null);
	        this.Bild2Date = this.convertValues(source["Bild2Date"], null);
	        this.Bild3Date = this.convertValues(source["Bild3Date"], null);
	        this.edges = this.convertValues(source["edges"], MitarbeiterEdges);
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

export namespace main {
	
	export class AnsprechpartnerParams {
	    Mail: string;
	    Mobil: string;
	    Telefon: string;
	    Name: string;
	    LieferantenId: number;
	
	    static createFrom(source: any = {}) {
	        return new AnsprechpartnerParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Mail = source["Mail"];
	        this.Mobil = source["Mobil"];
	        this.Telefon = source["Telefon"];
	        this.Name = source["Name"];
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
	export class Einkauf {
	    id?: number;
	    Name?: string;
	    Short?: string;
	    Gruppenwahl?: string;
	    InternTelefon1?: string;
	    InternTelefon2?: string;
	    FestnetzPrivat?: string;
	    FestnetzAlternativ?: string;
	    HomeOffice?: string;
	    MobilBusiness?: string;
	    MobilPrivat?: string;
	    Email?: string;
	    Azubi?: boolean;
	    // Go type: time
	    Geburtstag?: any;
	    Paypal?: boolean;
	    Abonniert?: boolean;
	    Geld?: string;
	    Pfand?: string;
	    Dinge?: string;
	    // Go type: time
	    Abgeschickt?: any;
	    Bild1?: string;
	    Bild2?: string;
	    Bild3?: string;
	    // Go type: time
	    Bild1Date?: any;
	    // Go type: time
	    Bild2Date?: any;
	    // Go type: time
	    Bild3Date?: any;
	    edges: ent.MitarbeiterEdges;
	    Bild1Data: ImageResponse;
	    Bild2Data: ImageResponse;
	    Bild3Data: ImageResponse;
	
	    static createFrom(source: any = {}) {
	        return new Einkauf(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.Name = source["Name"];
	        this.Short = source["Short"];
	        this.Gruppenwahl = source["Gruppenwahl"];
	        this.InternTelefon1 = source["InternTelefon1"];
	        this.InternTelefon2 = source["InternTelefon2"];
	        this.FestnetzPrivat = source["FestnetzPrivat"];
	        this.FestnetzAlternativ = source["FestnetzAlternativ"];
	        this.HomeOffice = source["HomeOffice"];
	        this.MobilBusiness = source["MobilBusiness"];
	        this.MobilPrivat = source["MobilPrivat"];
	        this.Email = source["Email"];
	        this.Azubi = source["Azubi"];
	        this.Geburtstag = this.convertValues(source["Geburtstag"], null);
	        this.Paypal = source["Paypal"];
	        this.Abonniert = source["Abonniert"];
	        this.Geld = source["Geld"];
	        this.Pfand = source["Pfand"];
	        this.Dinge = source["Dinge"];
	        this.Abgeschickt = this.convertValues(source["Abgeschickt"], null);
	        this.Bild1 = source["Bild1"];
	        this.Bild2 = source["Bild2"];
	        this.Bild3 = source["Bild3"];
	        this.Bild1Date = this.convertValues(source["Bild1Date"], null);
	        this.Bild2Date = this.convertValues(source["Bild2Date"], null);
	        this.Bild3Date = this.convertValues(source["Bild3Date"], null);
	        this.edges = this.convertValues(source["edges"], ent.MitarbeiterEdges);
	        this.Bild1Data = this.convertValues(source["Bild1Data"], ImageResponse);
	        this.Bild2Data = this.convertValues(source["Bild2Data"], ImageResponse);
	        this.Bild3Data = this.convertValues(source["Bild3Data"], ImageResponse);
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
	export class Geburtstag {
	    Name: string;
	    // Go type: time
	    Geburtstag: any;
	    Diff: number;
	
	    static createFrom(source: any = {}) {
	        return new Geburtstag(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Geburtstag = this.convertValues(source["Geburtstag"], null);
	        this.Diff = source["Diff"];
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
	export class GeburtstagList {
	    Vergangen: Geburtstag[];
	    Heute: Geburtstag[];
	    Zukunft: Geburtstag[];
	
	    static createFrom(source: any = {}) {
	        return new GeburtstagList(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Vergangen = this.convertValues(source["Vergangen"], Geburtstag);
	        this.Heute = this.convertValues(source["Heute"], Geburtstag);
	        this.Zukunft = this.convertValues(source["Zukunft"], Geburtstag);
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
	    id?: number;
	    Firma?: string;
	    Kundennummer?: string;
	    Webseite?: string;
	    edges: ent.LieferantEdges;
	    Ansprechpartner: ent.Ansprechpartner[];
	
	    static createFrom(source: any = {}) {
	        return new Lieferant(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.Firma = source["Firma"];
	        this.Kundennummer = source["Kundennummer"];
	        this.Webseite = source["Webseite"];
	        this.edges = this.convertValues(source["edges"], ent.LieferantEdges);
	        this.Ansprechpartner = this.convertValues(source["Ansprechpartner"], ent.Ansprechpartner);
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
	    Kundennummer: string;
	    Webseite: string;
	
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
	    Short: string;
	    Gruppenwahl: string;
	    InternTelefon1: string;
	    InternTelefon2: string;
	    FestnetzPrivat: string;
	    FestnetzAlternativ: string;
	    HomeOffice: string;
	    MobilBusiness: string;
	    MobilPrivat: string;
	    Email: string;
	    Azubi: boolean;
	    Day: number;
	    Month: number;
	    Year: number;
	
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
	        this.FestnetzPrivat = source["FestnetzPrivat"];
	        this.FestnetzAlternativ = source["FestnetzAlternativ"];
	        this.HomeOffice = source["HomeOffice"];
	        this.MobilBusiness = source["MobilBusiness"];
	        this.MobilPrivat = source["MobilPrivat"];
	        this.Email = source["Email"];
	        this.Azubi = source["Azubi"];
	        this.Day = source["Day"];
	        this.Month = source["Month"];
	        this.Year = source["Year"];
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
	export class UpsertEinkaufParams {
	    Paypal: boolean;
	    Abonniert: boolean;
	    Geld: string;
	    Pfand: string;
	    Dinge: string;
	    Bild1: string;
	    Bild2: string;
	    Bild3: string;
	
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
	export class UserParams {
	    Name: string;
	    Password: string;
	    Mail: string;
	
	    static createFrom(source: any = {}) {
	        return new UserParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Password = source["Password"];
	        this.Mail = source["Mail"];
	    }
	}
	export class UserWithMa {
	    User?: ent.User;
	    Mitarbeiter?: ent.Mitarbeiter;
	
	    static createFrom(source: any = {}) {
	        return new UserWithMa(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.User = this.convertValues(source["User"], ent.User);
	        this.Mitarbeiter = this.convertValues(source["Mitarbeiter"], ent.Mitarbeiter);
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

export namespace sql {
	
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

}

