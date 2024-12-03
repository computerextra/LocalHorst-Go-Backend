import { type AxiosRequestConfig, type RawAxiosRequestHeaders } from "axios";
import { client } from "./config";
import { z } from "zod";

const GetUserArgs = z.object({
  id: z.string(),
});

export type GetUserArgs = z.infer<typeof GetUserArgs>;

export const CreateUserArgs = z.object({
  Name: z.string(),
  Short: z.string().optional(),
  Gruppenwahl: z.string().optional(),
  InternTelefon1: z.string().optional(),
  InternTelefon2: z.string().optional(),
  FestnetzAlternativ: z.string().optional(),
  FestnetzPrivat: z.string().optional(),
  HomeOffice: z.string().optional(),
  MobilBusiness: z.string().optional(),
  MobilPrivat: z.string().optional(),
  Email: z.string().optional(),
  Azubi: z.boolean().optional(),
  Geburtstag: z.date().optional(),
});

export type CreateUserArgs = z.infer<typeof CreateUserArgs>;

export const UpdateUserArgs = CreateUserArgs.extend({
  id: z.string(),
});

export type UpdateUserArgs = z.infer<typeof UpdateUserArgs>;

export const SqlNullString = z.object({
  Valid: z.boolean(),
  String: z.string().nullable(),
});

export const SqlNullDateTime = z.object({
  Valid: z.boolean(),
  Time: z.date().nullable(),
});

export const SqlNullBool = z.object({
  Valid: z.boolean(),
  Bool: z.boolean().nullable(),
});

export const Mitarbeiter = z.object({
  ID: z.string(),
  Name: z.string(),
  Short: SqlNullString,
  Gruppenwahl: SqlNullString,
  Interntelefon1: SqlNullString,
  Interntelefon2: SqlNullString,
  Festnetzalternativ: SqlNullString,
  Festnetzprivat: SqlNullString,
  Homeoffice: SqlNullString,
  Mobilbusiness: SqlNullString,
  Mobilprivat: SqlNullString,
  Email: SqlNullString,
  Azubi: SqlNullBool,
  Geburtstag: SqlNullDateTime,
});

export type Mitarbeiter = z.infer<typeof Mitarbeiter>;

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

const updateUser = async (args: FormData, id: string): Promise<Mitarbeiter> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    } as RawAxiosRequestHeaders,
  };
  const res = await client.post<Mitarbeiter>(`/user/${id}/edit`, args, config);
  return res.data;
};

const deleteUser = async (args: GetUserArgs): Promise<void> => {
  return await client.delete(`/user/${args.id}`, config);
};

export { getUser, getUsers, deleteUser, createUser, updateUser };
