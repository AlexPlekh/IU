import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Restore: React.FC = () => {
  let navigate = useNavigate();

  let [isRestoreDone, setRestoreDone] = useState(false);

  return (
    <main>
      <div className={"p-5 bg-blue-100"}>
        <form className="max-w-120 mx-auto p-5 bg-white">
          <div className={(!isRestoreDone ? "flex " : "hidden ") + "flex-col items-center "}>
            <h1 className="text-2xl">Восстановление пароля</h1>
            <div className="flex flex-col">
              <span className="text-sm">Введите почту или телефон</span>
              <input className="border-solid border-gray-400 border rounded px-1" type="text" />
            </div>
            <button
              className="bg-green-400 text-white rounded px-1 mt-1"
              type="submit"
              onClick={e => {
                e.preventDefault();
                setRestoreDone(true);
              }}
            >
              Далее
            </button>
          </div>
          <div className={(isRestoreDone ? "flex " : "hidden ") + "flex-col items-center "}>
            <h1 className="text-2xl">Восстановление пароля</h1>
            <span className="text-sm">Уведомление отправлено</span>
            <button
              className="bg-green-400 text-white rounded px-1 mt-1"
              type="submit"
              onClick={e => {
                e.preventDefault();
                navigate("/Auth");
              }}
            >
              Готово
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
