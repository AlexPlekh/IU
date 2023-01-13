import React, { useEffect } from "react";
import Main from "./pages/Main/Main";
import { ContextWrapper } from "./Context";
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Landing } from "./pages/Landing/Landing";
import { Header } from "./components/Header";
import { Auth } from "./pages/Auth/Auth";
import { Restore } from "./pages/Auth/RestorePas/Restore";
import { useUserData } from "./hooks/useUserData";
import { Invite } from "./pages/Invite/Invite";
import { Registration } from "./pages/Registration/Registration";
import { fetchUserData } from "./components/fetches/fetches";
import Catalog from "./pages/Catalog/Catalog";
import CatalogDetail from "./pages/Catalog/CatalogDetail";
import Profile from "./pages/Profile/Profile";
import Subscribe from "./pages/Subscribe/Subscribe";
import { PrivateOutlet } from "./components/PrivateOutlet";
import ActivatePromocode from "./pages/ActivatePromocode/ActivatePromocode";
import Payment from "./pages/Payment/Payment";

export const App = () => {
  let location = useLocation();
  const { setState: setUserData, isAuth } = useUserData();

  // при каждом переходе будет происходить запрос на сервер о состоянии пользователя
  // TODO: добавить обработку ошибок
  // TODO: уменьшить количество запросов
  // TODO: решить проблему сброса пользователя при обновлении страницы
  // Возможный путь - задание пользователя при рендере страницы на сервере
  useEffect(() => {
    fetchUserData()
      .then(user => {
        setUserData(user);
      })
      .catch(e => {
        console.log(e.message, `statusCode: ${e.statusCode}`); // для тестирования
      });
  }, [setUserData, location]);

  return (
    <ContextWrapper>
      <Header />
      <Routes>
        <Route element={<PrivateOutlet navigateUnautorizedTo={"/Auth"} />}>
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route path="/catalog/:id" element={<CatalogDetail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/activate-promocode" element={<ActivatePromocode />} />
        </Route>
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
