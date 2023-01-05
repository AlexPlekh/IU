import React, { useEffect, useState } from "react";

interface DateOfBirthInputProps {
  setUserBirthDate: React.Dispatch<React.SetStateAction<Date>>;
  initialDate: Date;
}

export const DateOfBirthInput: React.FC<DateOfBirthInputProps> = ({ setUserBirthDate, initialDate }) => {
  const [year, setYear] = useState<number>(initialDate.getFullYear());
  const [month, setMonth] = useState<number>(initialDate.getMonth());
  const [day, setDay] = useState<number>(initialDate.getDate());

  useEffect(() => {
    setUserBirthDate(new Date(year, month, day));
  }, [year, month, day, setUserBirthDate]);

  const generateYearOptions = () => {
    const arr = [];
    const startYear = 1900;
    const endYear = new Date().getFullYear() - 1;
    for (let i = endYear; i >= startYear; i--) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    return arr;
  };

  const generateMonthOptions = () => {
    const arr = [];
    const monthArr = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    for (let i = 0; i <= 11; i++) {
      arr.push(
        <option key={i} value={i}>
          {monthArr[i]}
        </option>,
      );
    }
    return arr;
  };

  const generateDayOptions = (year: number, month: number) => {
    const arr = [];
    const dayInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= dayInMonth; i++) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    return arr;
  };

  return (
    <div>
      <select
        onChange={e => setDay(+e.target.value)}
        value={day}
        className="w-[100px] border-solid border-gray-400 border rounded-l text-center"
        name=""
        id="day"
      >
        {generateDayOptions(year, month)}
      </select>

      <select
        onChange={e => setMonth(+e.target.value)}
        value={month}
        className="w-[100px] border-solid border-gray-400 border rounded-l text-center"
        name=""
        id="month"
      >
        {generateMonthOptions()}
      </select>

      <select
        onChange={e => setYear(+e.target.value)}
        value={year}
        className="w-[100px] border-solid border-gray-400 border rounded-l text-center"
        name=""
        id="year"
      >
        {generateYearOptions()}
      </select>
    </div>
  );
};
