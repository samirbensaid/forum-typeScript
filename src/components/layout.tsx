import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="w-[80%] m-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
