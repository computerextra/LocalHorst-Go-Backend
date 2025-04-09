export namespace db {
	
	export class EinkaufModel {
	    id: string;
	    Paypal: boolean;
	    Abonniert: boolean;
	    Geld?: string;
	    Pfand?: string;
	    Dinge?: string;
	    mitarbeiterId: string;
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
	    Mitarbeiter?: MitarbeiterModel;
	
	    static createFrom(source: any = {}) {
	        return new EinkaufModel(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.Paypal = source["Paypal"];
	        this.Abonniert = source["Abonniert"];
	        this.Geld = source["Geld"];
	        this.Pfand = source["Pfand"];
	        this.Dinge = source["Dinge"];
	        this.mitarbeiterId = source["mitarbeiterId"];
	        this.Abgeschickt = this.convertValues(source["Abgeschickt"], null);
	        this.Bild1 = source["Bild1"];
	        this.Bild2 = source["Bild2"];
	        this.Bild3 = source["Bild3"];
	        this.Bild1Date = this.convertValues(source["Bild1Date"], null);
	        this.Bild2Date = this.convertValues(source["Bild2Date"], null);
	        this.Bild3Date = this.convertValues(source["Bild3Date"], null);
	        this.Mitarbeiter = this.convertValues(source["Mitarbeiter"], MitarbeiterModel);
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
	export class MitarbeiterModel {
	    id: string;
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
	    Azubi?: boolean;
	    // Go type: time
	    Geburtstag?: any;
	    // Go type: EinkaufModel
	    Einkauf?: any;
	
	    static createFrom(source: any = {}) {
	        return new MitarbeiterModel(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
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
	        this.Einkauf = this.convertValues(source["Einkauf"], null);
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
	export class PdfsModel {
	    id: number;
	    title: string;
	    body: string;
	
	    static createFrom(source: any = {}) {
	        return new PdfsModel(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.body = source["body"];
	    }
	}

}

export namespace main {
	
	export class InventurAllFile {
	    Artikelnummer: string;
	    Suchbegriff: string;
	    Anzahl: number;
	    Team: string;
	
	    static createFrom(source: any = {}) {
	        return new InventurAllFile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Artikelnummer = source["Artikelnummer"];
	        this.Suchbegriff = source["Suchbegriff"];
	        this.Anzahl = source["Anzahl"];
	        this.Team = source["Team"];
	    }
	}
	export class InventurEntry {
	    Artikelnummer: string;
	    Suchbegriff: string;
	    Anzahl: number;
	
	    static createFrom(source: any = {}) {
	        return new InventurEntry(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Artikelnummer = source["Artikelnummer"];
	        this.Suchbegriff = source["Suchbegriff"];
	        this.Anzahl = source["Anzahl"];
	    }
	}
	export class InventurTeamFile {
	    Team: number;
	    Mitarbeiter: string;
	    Farbe: string;
	    Ort: string;
	
	    static createFrom(source: any = {}) {
	        return new InventurTeamFile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Team = source["Team"];
	        this.Mitarbeiter = source["Mitarbeiter"];
	        this.Farbe = source["Farbe"];
	        this.Ort = source["Ort"];
	    }
	}
	export class YearData {
	    Teams: InventurTeamFile[];
	    Entries: InventurAllFile[];
	
	    static createFrom(source: any = {}) {
	        return new YearData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Teams = this.convertValues(source["Teams"], InventurTeamFile);
	        this.Entries = this.convertValues(source["Entries"], InventurAllFile);
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

