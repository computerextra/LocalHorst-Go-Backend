import { type AxiosRequestConfig, type RawAxiosRequestHeaders } from "axios";
import { client } from "./config";

export interface GetUserArgs {
  id: string;
}

export interface CreateUserArgs {
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
  Azubi?: string;
  Geburtstag?: string;
}

export interface UpdateUserArgs extends CreateUserArgs {
  id: string;
}

export interface Mitarbeiter {
  ID: string;
  Name: string;
  Short: {
    Valid: boolean;
    String: string | null;
  };
  Gruppenwahl: {
    Valid: boolean;
    String: string | null;
  };
  Interntelefon1: {
    Valid: boolean;
    String: string | null;
  };
  Interntelefon2: {
    Valid: boolean;
    String: string | null;
  };
  Festnetzalternativ: {
    Valid: boolean;
    String: string | null;
  };
  Festnetzprivat: {
    Valid: boolean;
    String: string | null;
  };
  Homeoffice: {
    Valid: boolean;
    String: string | null;
  };
  Mobilbusiness: {
    Valid: boolean;
    String: string | null;
  };
  Mobilprivat: {
    Valid: boolean;
    String: string | null;
  };
  Email: {
    Valid: boolean;
    String: string | null;
  };
  Azubi: {
    Valid: boolean;
    Bool: boolean | null;
  };
  Geburtstag: {
    Valid: boolean;
    Time: Date | null;
  };
}

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
  } as RawAxiosRequestHeaders,
};

const getUser = async (args: GetUserArgs): Promise<Mitarbeiter | null> => {
  const res = await client.get<Mitarbeiter | null>(`/user/${args.id}`, config);

  return res.data;
};

const getUsers = async (): Promise<Mitarbeiter[]> => {
  const res = await client.get<Mitarbeiter[]>("/user", config);

  return res.data;
};

const createUser = async (args: CreateUserArgs): Promise<Mitarbeiter> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    } as RawAxiosRequestHeaders,
  };
  const res = await client.post<Mitarbeiter>("/user", args, config);
  return res.data;
};

const updateUser = async (args: UpdateUserArgs): Promise<Mitarbeiter> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    } as RawAxiosRequestHeaders,
  };
  const res = await client.patch<Mitarbeiter>(`/user/${args.id}`, args, config);
  return res.data;
};

const deleteUser = async (args: GetUserArgs): Promise<void> => {
  return await client.delete(`/user/${args.id}`, config);
};

export { getUser, getUsers, deleteUser, createUser, updateUser };
