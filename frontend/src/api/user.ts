import type { ent, main } from "../../wailsjs/go/models";
import {
  Login as ApiLogin,
  DeactivateUser as ApiDeactivateUser,
  ActivateUser as ApiActivateUser,
  CreateUser as ApiCreateUser,
  ChangePassword as ApiChangePassword,
  GetUser as ApiGetUser,
} from "../../wailsjs/go/main/App";

type User = ent.User;

export type Session = {
  User: User;
};

export const Login = async (mail: string, pass: string): Promise<User> => {
  const res = (await ApiLogin(mail, pass)) as User;
  return res;
};

export const DeactivateUser = async (id: number): Promise<boolean> => {
  return await ApiDeactivateUser(id);
};

export const ActivateUser = async (id: number): Promise<boolean> => {
  return await ApiActivateUser(id);
};

export const CreateUser = async (
  user: main.UserParams
): Promise<User | undefined> => {
  const res = await ApiCreateUser(user);
  if (!res) return undefined;
  return await Login(user.Mail, user.Password);
};

export const ChangePassword = async (
  user: User,
  newPass: string
): Promise<boolean> => {
  if (user == null) return false;
  if (user.id == null) return false;
  if (user.Password == null) return false;

  return await ApiChangePassword(user.id, user.Password, newPass);
};

export const GetUser = async (id: number): Promise<User | undefined> => {
  if (id == null) return undefined;
  const res = await ApiGetUser(id);
  if (res == null) return undefined;
  return res as ent.User;
};
