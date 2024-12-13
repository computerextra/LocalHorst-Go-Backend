import { useEffect, useState } from "react";

export default function useAuth() {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem("Auth");
    if (token && token.length > 10) {
      setAuth(true);
    }
  }, []);

  return auth;
}
