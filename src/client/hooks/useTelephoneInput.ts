import React, { useState } from "react";

const useTelephoneInput = () => {
  const [value, setValue] = useState<string>("");
  const [telNumber, setTelNumber] = useState<string>("");

  const [name, setName] = useState<string>("");

  const unMaskTel = (maskedTel: string) => maskedTel.replace(/\+7|\D/g, "");

  const maskTel = (tel: string) => {
    let maskedTel = "+7";
    if (tel.length > 0) maskedTel += ` ${tel.substring(0, 3)}`;
    if (tel.length > 3) maskedTel += ` ${tel.substring(3, 6)}`;
    if (tel.length > 6) maskedTel += ` ${tel.substring(6, 10)}`;
    return maskedTel;
  };

  const telInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val !== "+" && val !== "+7") {
      val = unMaskTel(val).slice(0, 10);
      setName(maskTel(val));
    } else setName(val);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target;
    let val = input.value;
    let numberValue = val.replace(/\D/g, "");

    if (["7", "+", "8", "9"].indexOf(val[0]) > -1) {
        if (val.match(/^\+7/))
      setValue(numberValue);
    } else {
      setValue("+" + numberValue.slice(0, 13));
    }
  };

  return {
    value,
    telNumber,
    onChange,
  };
};

export default useTelephoneInput;
