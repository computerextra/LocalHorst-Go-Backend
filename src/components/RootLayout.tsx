import { Outlet } from "react-router";
import { Navigation } from "./Navigation";

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto mt-5">
        <Outlet />
      </div>
    </>
  );
}
