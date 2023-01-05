import React, { useEffect } from "react";
import Main from "./pages/Main/Main";
import { ContextWrapper } from "./Context";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Landing } from "./pages/Landing/Landing";
import { Header } from "./components/Header";
import { Auth } from "./pages/Auth/Auth";
import { Restore } from "./pages/Auth/RestorePas/Restore";
import { useUserData } from "./hooks/useUserData";
import { Invite } from "./pages/Invite/Invite";
import { Registration } from "./pages/Registration/Registration";
import { fetchUserData } from "./components/fetches/fetches";

export const App = () => {
  let location = useLocation();
  const { setState: setUserData, isAuth } = useUserData();

  // при каждом переходе будет происходить запрос на сервер о состоянии пользователя
  // TODO: добавить обработку ошибок
  useEffect(() => {
    fetchUserData().then(user => {
      setUserData(user);
    }).catch(e => {console.log(e.message, `statusCode: ${e.statusCode}`)});
  }, [setUserData, location]);

  return (
    <ContextWrapper>
      <Header />
      <Routes>
        <Route path="/" element={isAuth ? <Main /> : <Landing />}></Route>
        <Route path="/Auth" element={isAuth ? <Navigate to={"/"} /> : <Auth />}></Route>
        <Route path="/Auth/Restore" element={isAuth ? <Navigate to={"/"} /> : <Restore />}></Route>
        <Route path="/Registration" element={<Registration />}></Route>
        <Route path="/Invite" element={<Invite />}></Route>
      </Routes>
    </ContextWrapper>
  );
};

export default App;
