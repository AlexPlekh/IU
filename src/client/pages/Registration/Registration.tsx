import React, { useState } from "react";
import { RegStep1 } from "./RegStep1";
import { RegStep2 } from "./RegStep2";

export interface IRegData {
  username: string;
  surname: string;
  dateOfBirth: Date;
}

export const Registration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [regData, setRegData] = useState({ username: "", surname: "", dateOfBirth: new Date(new Date().getFullYear() - 1, 0, 1) });

  return (
    <>
      {step === 1 && <RegStep1 regData={regData} setRegData={setRegData} nextStep={() => setStep(2)} />}
      {step === 2 && <RegStep2 regData={regData} backStep={() => setStep(1)} />}
    </>
  );
};
