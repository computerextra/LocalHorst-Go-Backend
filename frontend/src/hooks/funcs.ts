import { GetMitarbeiterIdByName, GetUsername } from "../../wailsjs/go/main/App";

export type User = {
  Username: string;
  id: string;
};

export async function get_username(): Promise<string> {
  const username = await GetUsername();
  const split = username.split(" ");
  let realName = "";
  split.forEach((x) => {
    if (!x.startsWith("(") && !x.startsWith("E")) {
      realName += x + " ";
    }
  });
  return realName.trim();
}

export async function get_id(name: string): Promise<string> {
  return await GetMitarbeiterIdByName(name);
}

export function getUser(): User | undefined {
  const login = localStorage.getItem("allow");
  let allow: boolean | undefined = undefined;

  if (login != null) {
    allow = JSON.parse(login);
  }

  let user: User | undefined = undefined;

  if (allow == null || !allow) {
    const check = localStorage.getItem("user");
    if (check != null) {
      user = JSON.parse(check);
    }
  }

  return user;
}

export function setUser(user: User): void {
  localStorage.setItem("user", JSON.stringify(user));
}

export function Logout(): void {
  localStorage.removeItem("user");
  localStorage.setItem("allow", JSON.stringify(true));
}

export function Login(): void {
  localStorage.removeItem("allow");
}
