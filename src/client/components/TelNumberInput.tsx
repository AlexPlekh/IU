import React, { useState, useEffect, ChangeEvent, useRef, useSyncExternalStore } from "react";
import { API_URLS } from "../../server/routes/api";
import { IUseInput } from "../hooks/useInput";
// import { useUserDataStore } from "../hooks/useUserDataStore";
// import { userDataStore } from "../store/userDataStore";

interface TelNumberInputProps {
  telNumber: IUseInput;
  isTelConfirmed: boolean;
  setTelConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TelNumberInput: React.FC<TelNumberInputProps> = ({ telNumber, isTelConfirmed, setTelConfirmed }) => {
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [codeInputValue, setCodeInputValue] = useState("");

  const requestTelCode = async (telNumber: string) => {
    let response = await fetch(API_URLS.requestTelCode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ telNumber }),
    });
    let resText = await response.text();
    console.log(resText);
    if (response.ok) setIsCodeSended(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isCodeSended) requestTelCode(telNumber.value);
    else {
      setIsCodeSended(false);
      setCodeInputValue("");
      setTelConfirmed(false);
    }
  };

  const checkCode = async (code: string) => {
    let response = await fetch(API_URLS.checkTelCode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ telCode: code }),
    });
    let resText = await response.text();
    if (resText === "Telephone number is confirmed") setTelConfirmed(true);
    else setTelConfirmed(false);
    console.log(resText);
  };

  const handleChangeCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 4) checkCode(e.target.value);
    setCodeInputValue(e.target.value);
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          name="telNumber"
          value={telNumber.value}
          onChange={telNumber.onChange}
          onBlur={telNumber.onBlur}
          className={"flex-1 border-solid border-gray-400 border rounded px-1 bg-blue-100"}
          type="tel"
          placeholder="+7 999 999 9999"
          hidden={isCodeSended}
        />
        <button
          name="requestTelCode"
          className={"border border-black rounded " + (telNumber.isValid ? "bg-green-200" : "bg-yellow-200")}
          onClick={handleClick}
          disabled={!telNumber.isValid && !isCodeSended}
        >
          {isCodeSended ? "<=" : "=>"}
        </button>
        <input
          name="codeInput"
          onChange={handleChangeCodeInput}
          value={isTelConfirmed ? "" : codeInputValue}
          disabled={isTelConfirmed}
          className={
            "flex-1 border-solid border-gray-400 border rounded px-1 " +
            (isTelConfirmed ? "bg-green-200 placeholder-green-800" : "bg-blue-100")
          }
          type="text"
          placeholder={isTelConfirmed ? "Номер телефона подтверждён" : "Введите код из SMS"}
          maxLength={4}
          hidden={!isCodeSended}
        />
      </div>
    </>
  );
};
