import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import useValidation, { validations } from "./useValidation";

function useTelephoneInput(validations: validations, initialValue?: string) {
  const [inputValue, setInputValue] = useState<string>(initialValue || "");
  const [telNumber, setTelNumber] = useState<string>("");
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(telNumber, validations);
  // const ref = useRef(null);

  function onBlur(e: React.FocusEvent) {
    setDirty(true);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    function unMaskTel(maskedTel: string) {
      if (maskedTel === "+") return maskedTel;
      let unmaskedTel = maskedTel.replace(/\D/g, "");
      if (unmaskedTel) unmaskedTel = "+" + unmaskedTel;
      unmaskedTel = unmaskedTel.slice(0, 12);
      return unmaskedTel;
    }

    function maskTel(unmaskedTel: string) {
      let maskedTel = unmaskedTel;

      if (maskedTel.length > 1 && maskedTel[1] !== "7") maskedTel = "+7" + maskedTel.slice(1);
      if (maskedTel.length > 2) maskedTel = maskedTel.slice(0, 2) + "(" + maskedTel.slice(2);
      if (maskedTel.length > 6) maskedTel = maskedTel.slice(0, 6) + ")" + maskedTel.slice(6);
      if (maskedTel.length > 10) maskedTel = maskedTel.slice(0, 10) + "-" + maskedTel.slice(10);
      if (maskedTel.length > 13) maskedTel = maskedTel.slice(0, 13) + "-" + maskedTel.slice(13);

      return maskedTel;
    }

    const input = e.target;
    let value = input.value;
    // console.log("selectionStart: ", input.selectionStart, " , ", "selectionEnd: ", input.selectionEnd, " , ", "selectionDirection: ", input.selectionDirection)
    let telNumber = unMaskTel(value);
    setInputValue(maskTel(telNumber));
    setTelNumber(telNumber);
  }

  return {
    // ref,
    value: inputValue,
    telNumber,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
}

export default useTelephoneInput;
