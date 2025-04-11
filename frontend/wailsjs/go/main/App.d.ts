// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {main} from '../models';
import {db} from '../models';

export function CheckImage(arg1:string,arg2:string):Promise<main.ImageResponse>;

export function DeleteAnsprechpartner(arg1:string):Promise<boolean>;

export function DeleteEinkauf(arg1:string):Promise<boolean>;

export function DeleteLieferant(arg1:string):Promise<boolean>;

export function Firma():Promise<boolean>;

export function GetAllMitarbeiter():Promise<Array<db.MitarbeiterModel>>;

export function GetAnsprechpartner(arg1:string):Promise<db.AnschprechpartnerModel>;

export function GetArchive(arg1:string):Promise<string>;

export function GetDataFromYear(arg1:string):Promise<Array<db.TeamModel>>;

export function GetEinkauf(arg1:string):Promise<db.MitarbeiterModel>;

export function GetEinkaufsListe():Promise<Array<db.EinkaufModel>>;

export function GetEntriesFromTeam(arg1:number):Promise<Array<db.ArtikelModel>>;

export function GetInventurYears():Promise<Array<db.InventurModel>>;

export function GetLieferant(arg1:string):Promise<db.LieferantenModel>;

export function GetLieferanten():Promise<Array<db.LieferantenModel>>;

export function Greet(arg1:string):Promise<string>;

export function Internet():Promise<boolean>;

export function SearchArchive(arg1:string):Promise<Array<db.PdfsModel>>;

export function SearchSage(arg1:string):Promise<Array<main.Sg_Adressen>>;

export function SendAbrechnung(arg1:string,arg2:string,arg3:string):Promise<boolean>;

export function SkipEinkauf(arg1:string):Promise<boolean>;

export function UpdateEinkauf(arg1:main.EinkaufResponse):Promise<boolean>;

export function UploadImage(arg1:string,arg2:string):Promise<string>;

export function UpsertAnsprechpartner(arg1:string,arg2:any,arg3:main.AnsprechpartnerParams):Promise<boolean>;

export function UpsertLieferant(arg1:main.LieferantenParams,arg2:any):Promise<boolean>;
