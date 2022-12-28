import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { Emailnput } from "./Emailnput";
import { TelNumberInput } from "./TelNumberInput";
import eye from "../img/eye.svg";
import eyeSlash from "../img/eye-slash.svg";
import { useRegData } from "../hooks/useRegData";
import { API_URLS } from "../../server/routes/api";
import { useUserData } from "../hooks/useUserData";
import { setInputColour } from "./functions/setInputColour";

export interface IRegStep2 {
  backStep: () => void;
}

export const RegStep2: React.FC<IRegStep2> = ({ backStep }) => {
  let navigate = useNavigate();
  const [dataValid, setDataValid] = useState<boolean>(false);
  const [isTelConfirmed, setTelConfirmed] = useState<boolean>(false);
  const [isEmailConfirmed, setEmailConfirmed] = useState<boolean>(false);
  const telNumber = useInput(["isEmpty", "validTelephone"]);
  const email = useInput(["isEmpty", "validEmail"]);
  const password = useInput(["isEmpty", "validPassword"]);
  const confirmPassword = useInput(["isEmpty", "validPassword"]);
  const [isFirstPasVisible, setFirstPasVisible] = useState(false);
  const [isSecondPasVisible, setSecondPasVisible] = useState(false);
  const stepOneRegData = useRegData().regData;
  const userData = useUserData();

  useEffect(() => {
    setDataValid((isTelConfirmed || isEmailConfirmed) && password.isValid && password.value === confirmPassword.value);
  }, [isTelConfirmed, isEmailConfirmed, password.isValid, password.value, confirmPassword.value]);

  const toggleFirstPasVisible = () => {
    setFirstPasVisible(!isFirstPasVisible);
  };
  const toggleSecondPasVisible = () => {
    setSecondPasVisible(!isSecondPasVisible);
  };

  const sendNewUser = async () => {
    let response = await fetch(API_URLS.newUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: stepOneRegData.username,
        surname: stepOneRegData.surname,
        tel: isTelConfirmed ? telNumber.value : null,
        email: isEmailConfirmed ? email.value.toLowerCase() : null,
        dateOfBirth: stepOneRegData.dateOfBirth,
        password: password.value,
      }),
    });
    let res = await response.json();
    if (res.login) {
      userData.setState({
        isAuth: true,
        ...res.userData,
        dateOfBirth: new Date(Date.parse(res.userData.dateOfBirth)),
      });
      navigate("/?newUser=true");
    }
  };

  const GoReg = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendNewUser();
  };

  // const unMaskTel = (maskedTel: string) => maskedTel.replace(/\+7|\D/g, "");

  // const maskTel = (tel: string) => {
  //   let maskedTel = "+7";
  //   if (tel.length > 0) maskedTel += ` ${tel.substring(0, 3)}`;
  //   if (tel.length > 3) maskedTel += ` ${tel.substring(3, 6)}`;
  //   if (tel.length > 6) maskedTel += ` ${tel.substring(6, 10)}`;
  //   return maskedTel;
  // };

  // const telInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   let val = e.target.value;
  //   if (val !== "+" && val !== "+7") {
  //     val = unMaskTel(val).slice(0, 10);
  //     setName(maskTel(val));
  //   } else setName(val);
  // };

  // const telInputBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Backspace") {
  //     e.preventDefault();
  //     let val = name;
  //     if (val !== "+" && val !== "+7") {
  //       val = unMaskTel(val);
  //       val = val.slice(0, val.length - 1);
  //       setName(maskTel(val));
  //     } else setName(val);
  //   }
  // };

  return (
    <main className="">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl border-2 rounded border-black px-2 pt-2 pb-4 text-center w-full">Регистрация</h1>
        <form
          className="flex flex-col max-w-120"
          action=""
          onKeyDown={e => {
            if (e.key == "Enter" && dataValid) {
              GoReg(e);
            }
          }}
        >
          <span className="text-gray-500 text-center">Введите номер телефона</span>
          <TelNumberInput telNumber={telNumber} setTelConfirmed={setTelConfirmed} isTelConfirmed={isTelConfirmed} />

          <span
            className="bg-red-200 mt-2 px-1 rounded text-sm text-red-800 border border-red-800"
            hidden={!telNumber.isDirty || telNumber.isValid || isEmailConfirmed}
          >
            {"Номер телефона не соответствует требованиям"}
          </span>


          <span className="text-gray-500 text-center">Или</span>
          <span className="text-gray-500 text-center">E-mail</span>
          <Emailnput email={email} setEmailConfirmed={setEmailConfirmed} isEmailConfirmed={isEmailConfirmed} />
          
          <span
            className="bg-red-200 mt-2 px-1 rounded text-sm text-red-800 border border-red-800"
            hidden={!email.isDirty || email.isValid || isTelConfirmed}
          >
            {"Email не соответствует требованиям"}
          </span>

          <label className="text-gray-500 text-center flex flex-col relative">
            Придумайте пароль
            <input
              value={password.value}
              onChange={password.onChange}
              onBlur={password.onBlur}
              className={
                "border-solid border-gray-400 border rounded px-1 " + setInputColour(password.isDirty, password.isValid)
              }
              type={isFirstPasVisible ? "text" : "password"}
              placeholder="Придумайте пароль"
            />
            <img
              src={isFirstPasVisible ? eyeSlash : eye}
              onClick={toggleFirstPasVisible}
              className="absolute top-[29px] right-2"
            />
            <span className="text-gray-500 text-xs text-left">
              {
                "Пароль должен состоять из букв латинского алфавита (A-z), арабских цифр (0-9) и специальных символов: ( . , : ; ? ! * + % - < > @ [ ] { } / \\ _ {} $ # )"
              }
            </span>
          </label>

          <span
            className="bg-red-200 mt-2 px-1 rounded text-sm text-red-800 border border-red-800"
            hidden={!password.isDirty || password.isValid}
          >
            {"Пароль не соответствует требованиям"}
          </span>

          <label className="text-gray-500 text-center flex flex-col relative">
            Повторите пароль
            <input
              value={confirmPassword.value}
              onChange={confirmPassword.onChange}
              onBlur={confirmPassword.onBlur}
              className={
                "border-solid border-gray-400 border rounded px-1 " +
                setInputColour(
                  confirmPassword.isDirty && password.isDirty,
                  password.value === confirmPassword.value && confirmPassword.isValid,
                )
              }
              type={isSecondPasVisible ? "text" : "password"}
              placeholder="Повторите пароль"
            />
            <img
              src={isSecondPasVisible ? eyeSlash : eye}
              onClick={toggleSecondPasVisible}
              className="absolute top-[29px] right-2"
            />
          </label>

          <span
            className="bg-red-200 mt-2 px-1 rounded text-sm text-red-800 border border-red-800"
            hidden={!confirmPassword.isDirty || !password.isDirty || confirmPassword.value === password.value}
          >
            {"Пароли должны совпадать"}
          </span>

          <div className="flex gap-5 self-center my-5">
            <button
              onClick={e => {
                e.preventDefault();
                backStep();
              }}
              className="border-solid border-gray-400 border text-sm leading-6 font-medium py-2 px-3 rounded-lg w-28"
            >
              Назад
            </button>
            <button
              onClick={GoReg}
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
