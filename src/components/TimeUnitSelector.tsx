/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChevronDown, ChevronUp } from "lucide-react";

type TimeUnit = "hour" | "minute" | "period";
type Direction = "up" | "down";

interface TimeUnitSelectorProps {
  unit: TimeUnit;
  value: number | string;
  onChange: (val: number | string) => void;
  getNextValidVal: (direction: Direction) => number | string;
  options: (number | string)[];
  isDisabled: (val: number | string) => boolean;
  disabled?: boolean;
}
export const TimeUnitSelector:React.FC<TimeUnitSelectorProps>  = ({
  unit,
  value,
  onChange,
  getNextValidVal,
  options,
  isDisabled,
  disabled
}) => {
  const increment = () => {
    onChange(
      unit === "period" ? (value === "AM" ? "PM" : "AM") : getNextValidVal("up")
    );
  };

  const decrement = () => {
    onChange(
      unit === "period" ? (value === "AM" ? "PM" : "AM") : getNextValidVal("down")
    );
  };

  return (
 <div className="flex flex-col items-center gap-1 w-20">
  <button
    onClick={increment}
    disabled={disabled}
    className="w-full flex justify-center items-center h-8 rounded-t"
  >
    <ChevronUp strokeWidth={2} />
  </button>

  <select
    value={value}
    onChange={(e) =>
      onChange(unit === "period" ? e.target.value : parseInt(e.target.value))
    }
    disabled={disabled}
    className="w-full h-10 text-center bg-white border border-gray-300 no-arrow"
  >
    {options.map((option) => {
      const disabled = isDisabled(option);
      const label = option.toString().padStart(2, "0");
      return (
        <option
          key={option}
          value={option}
          disabled={disabled}
          className={
            disabled
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-black"
          }
          title={
            disabled
              ? `${unit === "hour" ? label : value.toString().padStart(2, "0")}:${
                  unit === "minute" ? label : value.toString().padStart(2, "0")
                } ${unit === "period" ? option : value} - Already booked`
              : ""
          }
        >
          {label}
        </option>
      );
    })}
  </select>

  <button
    onClick={decrement}
    disabled={disabled}
    className="w-full flex justify-center items-center h-8 rounded-b"
  >
    <ChevronDown strokeWidth={2} />
  </button>
</div>

  );
};