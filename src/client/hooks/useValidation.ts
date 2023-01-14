import { useEffect, useState } from "react";

export type validations = Array<"isEmpty" | "validPassword" | "validUserName" | "validEmail" | "validTelephone">;

const useValidation = (value: string, validations: validations) => {
  const [isEmpty, setEmpty] = useState(false);
  const [isPassValid, setPassValid] = useState(false);
  const [isNickValid, setNickValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isTelValid, setTelValid] = useState(false);
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    let valid = true;
    for (const key in validations) {
      switch (validations[key]) {
        case "isEmpty": {
          if (value) setEmpty(false);
          else {
            setEmpty(true);
            valid = false;
          }
          break;
        }
        case "validPassword": {
          // Пароль должен содержать хотя бы одну заглавную букву, один спецсимвол.
          // Прочие символы не допускаются. Длина пароля от 8 до 30 символов
            const regExp = /^(?=.*?[A-ZА-ЯЁ])(?=.*?[.,:;?!*+%\-<>@[\]{}/\\_{}$#])[\dA-Za-zА-ЯЁа-яё.,:;?!*+%\-<>@[\]{}/\\_{}$#]{8,30}$/;
          if (regExp.test(value)) setPassValid(true);
          else {
            setPassValid(false);
            valid = false;
          }
          break;
        }
        case "validUserName": {
          const regExp = /^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z-]{1,29}$/; // от 2 до 30 символов от латиницы и кириллицы, начинается с заглавной
          if (regExp.test(value)) setNickValid(true);
          else {
            setNickValid(false);
            valid = false;
          }
          break;
        }
        case "validEmail": {
          const regExp = /[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
          if (regExp.test(value.toLowerCase())) setEmailValid(true);
          else {
            setEmailValid(false);
            valid = false;
          }
          break;
        }
        case "validTelephone": {
            const regExp = /^[+][7]\d{10}$/;
          if (regExp.test(value)) setTelValid(true);
          else {
            setTelValid(false);
            valid = false;
          }
          break;
        }

        default:
          break;
      }
      setValid(valid);
    }
  }, [value, validations]);

  return {
    isEmpty,
    isPassValid,
    isNickValid,
    isEmailValid,
    isTelValid,
    isValid,
  };
};

export default useValidation;
