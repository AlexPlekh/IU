export const setInputColour = (dirty: boolean, valid: boolean) => {
    if (valid) return "bg-green-200";
    else if (!dirty) return "bg-blue-100";
    else return "bg-red-100";
  };