import { type AxiosRequestConfig, type RawAxiosRequestHeaders } from "axios";
import { client } from "./config";

export interface GetEinkaufArgs {
  id: string;
}

export interface Einkauf {
  Abgeschickt: {
    Valid: boolean;
    Time: Date;
  };
  Abonniert: boolean;
  Bild1: {
    Valid: boolean;
    String: string;
  };
  Bild1date: {
    Valid: boolean;
    Time: Date;
  };
  Bild2: {
    Valid: boolean;
    String: string;
  };
  Bild2date: {
    Valid: boolean;
    Time: Date;
  };
  Bild3: {
    Valid: boolean;
    String: string;
  };
  Bild3date: {
    Valid: boolean;
    Time: Date;
  };
  Dinge: {
    Valid: boolean;
    String: string;
  };
  Geld: {
    Valid: boolean;
    String: string;
  };
  ID: string;
  Mitarbeiterid: string;
  Paypal: boolean;
  Pfand: {
    Valid: boolean;
    String: string;
  };
}

// 127.0.0.1:8000/api/Einkauf/cltplzdp80000zlfc0rae9dnt

const getEinkauf = async (args: GetEinkaufArgs): Promise<Einkauf | null> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    } as RawAxiosRequestHeaders,
  };
  const res = await client.get<Einkauf | null>(`/Einkauf/${args.id}`, config);

  return res.data;
};

export { getEinkauf };
