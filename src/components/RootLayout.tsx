import { Outlet } from "react-router";
import { Navigation } from "./Navigation";

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <h1>Root Layout</h1>
      <Outlet />
    </>
  );
}
