import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../redux/useAuth";
import Footer from "./footer";
import Header from "./header";

export default function PrivateRoute() {
  const { user } = useAuth();

   console.log(user);

  if (user.token == undefined) {
    console.log("done");
    return <Navigate to="/user" />;
  }
  //   if (user.name != "") {
  //     return <Navigate to="/article" />;
  //   }

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
