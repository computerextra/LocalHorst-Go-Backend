import axios, {
  type AxiosRequestConfig,
  type RawAxiosRequestHeaders,
} from "axios";
import type {
  CreateUserArgs,
  DeleteAuthorArgs,
  GetUserArgs,
  GetUserRow,
  GetUsersRow,
} from "./query_sql";

const port = import.meta.env.VITE_PORT;

const client = axios.create({
  baseURL: `http://127.0.0.1:${port}/api`,
});

const getUser = async (args: GetUserArgs): Promise<GetUserRow | null> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/vnd.github+json",
    } as RawAxiosRequestHeaders,
  };
  const res = await client.get<GetUserRow | null>(`/user/${args.id}`, config);

  return res.data;
};

const getUsers = async (): Promise<GetUsersRow[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/vnd.github+json",
    } as RawAxiosRequestHeaders,
  };
  const res = await client.get<GetUserRow[]>("/user", config);
  return res.data;
};

const createUser = async (args: CreateUserArgs): Promise<GetUserRow> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/vnd.github+json",
    } as RawAxiosRequestHeaders,
  };
  const res = await client.post<GetUserRow>("/user", args, config);
  return res.data;
};

const deleteUser = async (args: DeleteAuthorArgs): Promise<void> => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/vnd.github+json",
    } as RawAxiosRequestHeaders,
  };
  return await client.delete(`/user/${args.id}`, config);
};

export { getUser, getUsers, createUser, deleteUser };
