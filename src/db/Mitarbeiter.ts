import { type AxiosRequestConfig, type RawAxiosRequestHeaders } from "axios";
import { client } from "./config";

export interface GetUserArgs {
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

const getUser = async (args: GetUserArgs): Promise<Mitarbeiter | null> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    } as RawAxiosRequestHeaders,
  };
  const res = await client.get<Mitarbeiter | null>(`/user/${args.id}`, config);

  return res.data;
};

const getUsers = async (): Promise<Mitarbeiter[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    } as RawAxiosRequestHeaders,
  };
  const res = await client.get<Mitarbeiter[]>("/user", config);

  return res.data;
};

// const createUser = async (args: CreateUserArgs): Promise<Mitarbeiter> => {
//   const config: AxiosRequestConfig = {
//     headers: {
//       Accept: "application/json",
//     } as RawAxiosRequestHeaders,
//   };
//   const res = await client.post<Mitarbeiter>("/user", args, config);
//   return res.data;
// };

const deleteUser = async (args: GetUserArgs): Promise<void> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    } as RawAxiosRequestHeaders,
  };
  return await client.delete(`/user/${args.id}`, config);
};

export { getUser, getUsers, deleteUser };
