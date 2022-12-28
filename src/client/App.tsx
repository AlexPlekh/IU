import React from "react";
import Main from "./pages/Main";
import { ContextWrapper } from "./Context";
import { Route, Routes, Navigate } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { RegStep1 } from "./components/RegStep1";
import { RegStep2 } from "./components/RegStep2";
import { Header } from "./components/Header";
import { Auth } from "./pages/Auth";
import { Restore } from "./pages/Restore";
import { useUserData } from "./hooks/useUserData";
import { Invite } from "./pages/Invite";
import { Registration } from "./pages/Registration";

export const App = () => {
  let isUserAuth = useUserData().isAuth;
  return (
    <ContextWrapper>
      <Header />
      <Routes>
        <Route path="/" element={isUserAuth ? <Main /> : <Landing />}></Route>
        <Route path="/Auth" element={isUserAuth ? <Navigate to={"/"} /> : <Auth />}></Route>
        <Route path="/Auth/Restore" element={isUserAuth ? <Navigate to={"/"} /> : <Restore />}></Route>
        <Route path="/Registration" element={<Registration />}></Route>
        <Route path="/Invite" element={<Invite />}></Route>
      </Routes>
    </ContextWrapper>
  );
};

export default App;
