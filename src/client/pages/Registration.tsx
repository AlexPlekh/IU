import React, { useState } from "react";
import { RegStep1 } from "../components/RegStep1";
import { RegStep2 } from "../components/RegStep2";

export const Registration: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <RegStep1 nextStep={() => setStep(2)} />}
      {step === 2 && <RegStep2 backStep={() => setStep(1)} />}
    </>
  );
};
