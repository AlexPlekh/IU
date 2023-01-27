import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchLogin } from "../../components/fetches/fetches";
import { useUserData } from "../../hooks/useUserData";
import eye from "../../img/eye.svg";
import eyeSlash from "../../img/eye-slash.svg";

export const Auth: React.FC = () => {
  const [userName, setUserName] = useState(""); // userName здесь - это телефон или почта
  const [password, setPassword] = useState("");
  const userData = useUserData();
  const [wrongLogin, setWrongLogin] = useState(false);
  const [isPasVisible, setPasVisible] = useState(false);

  function Login() {
    fetchLogin(userName, password)
      .then(user => {
        userData.setState(user);
      })
      .catch(e => {
        setWrongLogin(true);
      });
  }

  const togglePasVisible = () => {
    setPasVisible(!isPasVisible);
  };

  return (
    <main>
      <div className={"p-5 bg-blue-100"}>
        <form className="flex flex-col max-w-120 items-center mx-auto p-5 bg-white">
          <h1 className="text-3xl">Вход в аккаунт</h1>
          <label className="flex flex-col mt-1">
            Почта или телефон
            <input
              className="border-solid border-gray-400 border rounded px-1"
              type="text"
              onChange={e => setUserName(e.target.value)}
              value={userName}
              name="userName"
              id="userName"
            />
          </label>
          <label className="relative flex flex-col mt-1">
            Пароль
            <input
              className="border-solid border-gray-400 border rounded px-1"
              onChange={e => setPassword(e.target.value)}
              value={password}
              name="password"
              id="password"
              type={isPasVisible ? "text" : "password"}
            />
            <img
              src={isPasVisible ? eyeSlash : eye}
              onClick={togglePasVisible}
              className="absolute top-[29px] right-2"
            />
          </label>
          <span className="bg-red-200 mt-1 px-2 py-1 rounded text-red-800 border border-red-800" hidden={!wrongLogin}>
            Неправильные телефон, email или пароль
          </span>
          <button
            className="bg-green-600 text-white rounded px-3 py-1 mt-1 disabled:bg-gray-400"
            type="submit"
            onClick={e => {
              e.preventDefault();
              Login();
            }}
            disabled={!userName || !password}
          >
            Войти
          </button>
          <Link to="/Registration">Регистрация</Link>
          <Link to="/Auth/Restore">Забыли пароль?</Link>
        </form>
      </div>
    </main>
  );
};
