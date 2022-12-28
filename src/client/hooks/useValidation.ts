import { useEffect, useState } from "react";

export type validations = Array<"isEmpty" | "validPassword" | "validUserName" | "validEmail" | "validTelephone">;

const useValidation = (value: any, validations: validations) => {
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
          // Пароль должен содержать хотя бы одну цифру, одну заглавную и прописную латинскую буквы, один спецсимвол.
          // Прочие символы не допускаются. Длина пароля от 8 до 14 символов
            const regExp = /^(?=.*?[\d])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[.,:;?!*+%\-<>@[\]{}/\\_{}$#])[\dA-Za-z.,:;?!*+%\-<>@[\]{}/\\_{}$#]{8,14}$/;
          if (regExp.test(value)) setPassValid(true);
          else {
            setPassValid(false);
            valid = false;
          }
          break;
        }
        case "validUserName": {
          const regExp = /^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z-]{0,29}$/; // от 1 до 20 символов от латиницы и кириллицы
          if (regExp.test(value)) setNickValid(true);
          else {
            setNickValid(false);
            valid = false;
          }
          break;
        }
        case "validEmail": {
          const regExp = /^.{1,}@.{1,}\..{1,}$/;
          if (regExp.test(value)) setEmailValid(true);
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
