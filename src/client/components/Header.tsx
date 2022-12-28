import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../hooks/useUserData";

import logo from "../img/logo.svg";

export const Header: React.FC = () => {
  let navigate = useNavigate();
  const isUserAuth = useUserData().isAuth;
  const logout = useUserData().nullifyData;

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
          if (isUserAuth) {
            logout();
            navigate("/");
          } else {
            navigate("/Auth");
          }
        }}
        className="bg-orange-500 rounded-sm px-3 py-1 mx-3 my-1 text-white"
      >
        {isUserAuth ? "Выйти" : "Войти"}
      </button>
    </header>
  );
};
