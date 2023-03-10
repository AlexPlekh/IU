import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { DateOfBirthInput } from "./DateOfBirthInput";
import { isAdult } from "../../components/functions/isAdult";
import { setInputColour } from "../../components/functions/setInputColour";
import { IRegData } from "./Registration";

export interface IRegStep1 {
  nextStep: () => void;
  regData: IRegData;
  setRegData: React.Dispatch<React.SetStateAction<IRegData>>;
}

export const RegStep1: React.FC<IRegStep1> = ({ nextStep, regData, setRegData }) => {
  let navigate = useNavigate();
  const [dataValid, setDataValid] = useState<boolean>(false);
  const userName = useInput(["isEmpty", "validUserName"], regData.username);
  const userSurname = useInput(["isEmpty", "validUserName"], regData.surname);
  const [userBirthDate, setUserBirthDate] = useState(regData.dateOfBirth);
  const needResponsibility = useSearchParams()[0].get("isInvitedForParent") === "true";
  const [isResponsible, setResponsible] = useState(false);
  const [isCheckboxDirty, setCheckboxDirty] = useState(false);

  useEffect(() => {
    setDataValid(
      userName.isValid && userSurname.isValid && (!needResponsibility || (isResponsible && isAdult(userBirthDate))),
    );
  }, [userName.isValid, userSurname.isValid, needResponsibility, isResponsible, userBirthDate]);

  const handleClickNext = (e: SyntheticEvent) => {
    e.preventDefault();
    if (dataValid) {
      setRegData({
        username: userName.value,
        surname: userSurname.value,
        dateOfBirth: userBirthDate,
      });
      nextStep();
    }
  };

  return (
    <main className="">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl border-2 rounded border-black px-2 pt-2 pb-4 text-center w-full">Регистрация</h1>
        <p className="text-gray-500 text-center">Введите имя и фамилию</p>
        <form
          className="flex flex-col max-w-120"
          action=""
          onKeyDown={e => {
            if (e.key == "Enter") {
              handleClickNext(e);
            }
          }}
        >
          <input
            value={userName.value}
            onChange={userName.onChange}
            onBlur={userName.onBlur}
            className={
              "border-solid border-gray-400 border rounded px-1 mb-2 " +
              setInputColour(userName.isDirty, userName.isValid)
            }
            type="text"
            placeholder="Имя"
          />
          <span
            className="bg-red-200 mb-3 px-1 rounded text-sm text-red-800 border border-red-800"
            hidden={!userName.isDirty || userName.isValid}
          >
            {userName.isEmpty && "Введите ваше имя"}
            {!userName.isEmpty && !userName.isNickValid && "Некорректное имя"}
          </span>

          <input
            value={userSurname.value}
            onChange={userSurname.onChange}
            onBlur={userSurname.onBlur}
            className={
              "border-solid border-gray-400 border rounded px-1 mb-2 " +
              setInputColour(userSurname.isDirty, userSurname.isValid)
            }
            type="text"
            placeholder="Фамилия"
          />
          <span
            className="bg-red-200 mb-3 px-1 rounded text-sm text-red-800 border border-red-800"
            hidden={!userSurname.isDirty || userSurname.isValid}
          >
            {userSurname.isEmpty && "Введите вашу фамилию"}
            {!userSurname.isEmpty && !userSurname.isNickValid && "Некорректная фамилия"}
          </span>

          <span className="text-gray-500 text-center mb-2">Дата рождения</span>
          <DateOfBirthInput setUserBirthDate={setUserBirthDate} initialDate={userBirthDate}/>
          {needResponsibility && (
            <>
              <span
                className="bg-red-200 mt-2 px-1 rounded text-sm text-red-800 border border-red-800"
                hidden={isAdult(userBirthDate) || !isCheckboxDirty}
              >
                {!isAdult(userBirthDate) && "Вы должны быть старше 18 лет"}
              </span>

              <label className="text-center mt-2">
                <input
                  className="mx-1"
                  type="checkbox"
                  checked={isResponsible}
                  onChange={() => setResponsible(!isResponsible)}
                  onBlur={() => setCheckboxDirty(true)}
                />
                Беру всю ответственность на себя
              </label>

              <span
                className="bg-red-200 mt-2 px-1 rounded text-sm text-red-800 border border-red-800"
                hidden={isResponsible || !isCheckboxDirty}
              >
                {!isResponsible && "Вы должны принять ответственность"}
              </span>
            </>
          )}

          <div className="flex gap-5 self-center my-5">
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                navigate("/");
              }}
              className="border-solid border-gray-400 border text-sm leading-6 font-medium py-2 px-3 rounded-lg w-28"
            >
              Назад
            </button>
            <button
              onClick={handleClickNext}
              className={
                "text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg w-28 bg-orange-600 disabled:bg-gray-500"
              }
              disabled={!dataValid}
            >
              Далее
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
