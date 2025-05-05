import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ent } from "../../wailsjs/go/models";

type Session = {
  User: ent.User;
};

const getSession = () => {
  const res = localStorage.getItem("session");
  if (!res) {
    return null;
  }
  const session = JSON.parse(res);
  return session as Session;
};

export const setLocalSession = (session: Session) => {
  localStorage.setItem("session", JSON.stringify(session));
};

export default function useSession() {
  const data = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (data == null) return;
    if (data.data == null) return;
    setSession(data.data);
    setLocalSession(data.data);
  }, [data]);

  return session;
}
