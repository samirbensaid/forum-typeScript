import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import NewArticle from "./components/newArticle";

import Home from "./components/home";
import Detail from "./components/detail";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import PrivateRoute from "./components/privateRoute";
import Layout from "./components/layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/article" element={<NewArticle />} />
            <Route path="/detail/:id" element={<Detail />} />
           
          </Route>
          <Route path="/user" element={<Layout />}>
            <Route path="/user" element={<SignIn />} />
            <Route path="/user/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
