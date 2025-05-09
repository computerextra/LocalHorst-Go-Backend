import type { ent, main } from "../../wailsjs/go/models";
import {
  Login as ApiLogin,
  DeactivateUser as ApiDeactivateUser,
  ActivateUser as ApiActivateUser,
  CreateUser as ApiCreateUser,
  ChangePassword as ApiChangePassword,
  GetUser as ApiGetUser,
} from "../../wailsjs/go/main/App";

export type User = main.UserWithMa;

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
  user: Session,
  newPass: string
): Promise<string> => {
  if (user == null) return "Keine Session! Bitte anmelden";
  if (user.User == null) return "Keine Session! Bitte anmelden";
  if (user.User.User == null) return "Keine Session! Bitte anmelden";
  if (user.User.User.id == null) return "Keine Session! Bitte anmelden";
  if (user.User.User.Password == null) return "Keine Session! Bitte anmelden";

  return await ApiChangePassword(
    user.User.User.id,
    user.User.User.Password,
    newPass
  );
};

export const GetUser = async (id: number): Promise<User | undefined> => {
  if (id == null) return undefined;
  const res = await ApiGetUser(id);
  if (res == null) return undefined;
  return res as ent.User;
};
