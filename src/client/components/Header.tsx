import React from "react"
import logo from "../img/logo.svg"
import { useNavigate, Link } from "react-router-dom"
import { useUserData } from "../hooks/useUserData"
import { fetchLogout } from "./fetches/fetches"

export const Header: React.FC = () => {
  let navigate = useNavigate()
  const userData = useUserData()

  const logout = async () => {
    let res = await fetchLogout()
    if (res.ok) {
      userData.nullifyData()
      navigate("/")
    }
  }
  const login = () => {
    navigate("/Auth")
  }
  const loginToggle = () => {
    if (userData.isAuth) {
      logout()
    } else {
      login()
    }
  }

  return (
    <header className={"flex justify-between items-center h-16 py-4 px-4 shadow"}>
      <img
        src={logo}
        alt="Лого"
        onClick={() => {
          navigate("/");
        }}
        className="max-h-8 mx-3 my-1 cursor-pointer"
      />
      <div>
        <nav>
          <Link 
              className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900" 
              to="/subscribe">
                  Подписки
          </Link>
          <Link 
              className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900" 
              to="/catalog">
                  Каталог
          </Link>
          <Link 
              className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900" 
              to="/profile">
                  Профиль
          </Link>
        </nav>
      </div>
      <button
        type="button"
        onClick={loginToggle}
        className="bg-orange-500 rounded-sm px-4 py-1.5 mr-3 text-white"
      >
        {userData.isAuth ? "Выйти" : "Войти"}
      </button>
    </header>
  )
}