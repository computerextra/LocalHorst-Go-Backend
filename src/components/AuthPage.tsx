import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { ReactElement } from "react";

export const AuthPage = ({ children }: { children: ReactElement }) => {
  const auth = useAuth();

  if (auth) return children;
  else
    return (
      <Button asChild>
        <Link to="/Login">Bitte erst Anmelden</Link>
      </Button>
    );
};
