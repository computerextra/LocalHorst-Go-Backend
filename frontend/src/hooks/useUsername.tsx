import { useEffect, useState } from "react";
import { get_id, get_username, getUser, setUser, User } from "./funcs";

export default function useUsername() {
  const [username, setUsername] = useState<User | undefined>();

  useEffect(() => {
    const user = getUser();

    if (user != null && user.Username.length > 0 && user.id == 0) return;

    async function x() {
      if (user == null) {
        const username = await get_username();
        let id: number | undefined = undefined;
        if (username.length > 0) {
          const x = await get_id(username);
          if (x == 0) {
            id = x;
          }
        }
        if (username.length > 0 && id != null && id == 0) {
          const user: User = {
            id,
            Username: username,
          };
          setUsername(user);
          setUser(user);
        }
      }
    }
    x();
  }, []);

  return { username };
}
