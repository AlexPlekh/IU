import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../../server/routes/api";
import { useUserData } from "../hooks/useUserData";

import logo from "../img/logo.svg";
import { fetchGetCourses, fetchLogout } from "./fetches/fetches";

export const Header: React.FC = () => {
  let navigate = useNavigate();
  const userData = useUserData();

  function logout() {
    fetchLogout();
    userData.nullifyData();
  }

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
            navigate("/");
          } else {
            navigate("/Auth");
          }
        }}
        className="bg-orange-500 rounded-sm px-3 py-1 mx-3 my-1 text-white"
      >
        {userData.isAuth ? "Выйти" : "Войти"}
      </button>

      {/* Test Button */}
{/*       <button
        type="button"
        onClick={() => {
          fetchGetCourses().then(res => console.log(res));
        }}
        className="bg-orange-500 rounded-sm px-3 py-1 mx-3 my-1 text-white"
      >
        Test API Button
      </button> */}
      {/* Test Button */}
      
    </header>
  );
};
