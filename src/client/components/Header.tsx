import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../../server/routes/api";
import { useUserData } from "../hooks/useUserData";

import logo from "../img/logo.svg";

export const Header: React.FC = () => {
  let navigate = useNavigate();
  const userData = useUserData();
  const setUserData = userData.setState
  const logout = async () => {
    userData.nullifyData();
    await fetch(API_URLS.logout);
  };

  useEffect(() => {
    async function getUserData() {
      let response = await fetch(API_URLS.getUser);
      if (response.ok) {
        let res = await response.json();
        setUserData({
          ...res,
          isAuth: true,
          dateOfBirth: new Date(Date.parse(res.dateOfBirth)),
        });
      }
    }
    getUserData();
  }, [setUserData]);

  return (
    <header className={"flex justify-between items-center"}>
      <img
        src={logo}
        alt="Лого"
        onClick={() => {
          navigate("/");
        }}
        className="max-h-8 mx-3 my-1 cursor-pointer"
      />
      <button
        type="button"
        onClick={() => {
          if (userData.isAuth) {
            logout();
            fetch(API_URLS.logout);
            navigate("/");
          } else {
            navigate("/Auth");
          }
        }}
        className="bg-orange-500 rounded-sm px-3 py-1 mx-3 my-1 text-white"
      >
        {userData.isAuth ? "Выйти" : "Войти"}
      </button>
    </header>
  );
};
