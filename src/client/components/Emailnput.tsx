import React, { useState, useEffect, ChangeEvent, useRef, useSyncExternalStore } from "react";
import { API_URLS } from "../../server/routes/api";
import { IUseInput } from "../hooks/useInput";
// import { useUserDataStore } from "../hooks/useUserDataStore";
// import { userDataStore } from "../store/userDataStore";

interface EmailInputProps {
  email: IUseInput;
  isEmailConfirmed: boolean;
  setEmailConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Emailnput: React.FC<EmailInputProps> = ({ email, isEmailConfirmed, setEmailConfirmed }) => {
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [codeInputValue, setCodeInputValue] = useState("");

  const requestEmailCode = async (email: string) => {
    let response = await fetch(API_URLS.requestEmailCode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email }),
    });
    let resText = await response.text();
    console.log(resText);
    if (response.ok) setIsCodeSended(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isCodeSended) requestEmailCode(email.value);
    else {
      setIsCodeSended(false);
      setCodeInputValue("");
      setEmailConfirmed(false);
    }
  };

  const checkEmailCode = async (code: string) => {
    let response = await fetch(API_URLS.checkEmailCode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ emailCode: code }),
    });
    let resText = await response.text();
    if (resText === "Email is confirmed") setEmailConfirmed(true);
    else setEmailConfirmed(false);
    console.log(resText);
  };

  const handleChangeCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeInputValue(e.target.value);
    if (e.target.value.length === 4) checkEmailCode(e.target.value);
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          name="email"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          className={"flex-1 border-solid border-gray-400 border rounded px-1 bg-blue-100"}
          type="email"
          placeholder="E-mail"
          hidden={isCodeSended}
        />
        <button
          name="requestEmailCode"
          className={"border border-black rounded " + (email.isValid ? "bg-green-200" : "bg-yellow-200")}
          onClick={handleClick}
          disabled={!email.isValid && !isCodeSended}
        >
          {isCodeSended ? "<=" : "=>"}
        </button>
        <input
          name="codeInput"
          onChange={handleChangeCodeInput}
          value={isEmailConfirmed ? "" : codeInputValue}
          disabled={isEmailConfirmed}
          className={
            "flex-1 border-solid border-gray-400 border rounded px-1 " +
            (isEmailConfirmed ? "bg-green-200 placeholder-green-800" : "bg-blue-100")
          }
          type="text"
          placeholder={isEmailConfirmed ? "E-mail подтвержден" :"Введите код из e-mail"}
          maxLength={4}
          hidden={!isCodeSended}
        />
      </div>
    </>
  );
};
