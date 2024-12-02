import { type AxiosRequestConfig, type RawAxiosRequestHeaders } from "axios";
import { client } from "./config";

export interface GetEinkaufArgs {
  id: string;
}

export interface UpdateEinkaufArgs {
  id: string;
  mitarbeiterId: string;
  Abonniert: boolean;
  Bild1?: string;
  Bild2?: string;
  Bild3?: string;
  Dinge?: string;
  Geld?: string;
  Paypal: boolean;
  Pfand?: string;
}

export interface SkipEinkaufArgs {
  id: string;
}

export interface DeleteEinkaufArgs {
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

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
  } as RawAxiosRequestHeaders,
};

// 127.0.0.1:8000/api/Einkauf/cltplzdp80000zlfc0rae9dnt

const getEinkauf = async (args: GetEinkaufArgs): Promise<Einkauf | null> => {
  const res = await client.get<Einkauf | { error: string }>(
    `/Einkauf/${args.id}`,
    config
  );

  if ("error" in res.data) {
    return null;
  }

  return res.data;
};

const getEinkaufsListe = async (): Promise<Einkauf[]> => {
  const res = await client.get<Einkauf[]>("/Einkauf", config);

  return res.data;
};

const updateEinkauf = async (args: UpdateEinkaufArgs): Promise<Einkauf> => {
  const res = await client.post<Einkauf>(`/Einkauf/${args.id}`, args, config);

  return res.data;
};

const skipEinkauf = async (args: SkipEinkaufArgs): Promise<void> => {
  await client.post(`/Einkauf/skip`, args, config);
};

const deleteEinkauf = async (args: DeleteEinkaufArgs): Promise<void> => {
  await client.delete(`/Einkauf/${args.id}`, config);
};

export {
  getEinkauf,
  getEinkaufsListe,
  updateEinkauf,
  skipEinkauf,
  deleteEinkauf,
};
