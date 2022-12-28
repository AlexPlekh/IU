import React from "react";
import { useNavigate } from "react-router-dom";

export const Landing: React.FC = () => {
  let navigate = useNavigate();

  return (
    <main className="bg-blue-300 flex flex-col items-center relative">
      <div className="py-40 ">
        <h1 className="text-orange-500 text-5xl font-bold text-center">Университет будущего</h1>
        <h1 className="text-5xl font-bold text-center">для детей и взрослых</h1>
        <p className="text-lg uppercase text-center max-w-[1030px] mt-4">
          Космическое образование по семейной подписке: до пяти учеников по цене одного детского кружка. Учите детей,
          учитесь вместе с ними и дарите образование друзьям
        </p>
      </div>
      <div className="bg-blue-100 flex flex-col items-center rounded-lg absolute p-4 bottom-[-64px]">
        <p className="text-orange-500 text-xl text-center">Хотите попробовать?</p>
        <p className="text-xl text-center">Регистрируйтесь сами и смотрите сами</p>
        <button
          type="button"
          onClick={() => navigate("/Registration")}
          className="bg-orange-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
        >
          Поступить в IU
        </button>
      </div>
    </main>
  );
};
