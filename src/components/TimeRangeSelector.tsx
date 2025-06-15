/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUnitOptions, isSlotDisabled, toMinutes } from "@/lib/utils";
import React, { useEffect } from "react";
import { TimeUnitSelector } from "./TimeUnitSelector";
import type { Appointment } from "@/types/appointment";
import { AlarmClock } from "lucide-react";

interface Time {
  hour: number;
  minute: number;
  period: string;
}

interface Props {
  doctorId: string | number;
  selectedDate: string;
  bookedSlots: Appointment[];
  startTime: Time;
  endTime: Time;
  setStartTime: (time: Time) => void;
  setEndTime: (time: Time) => void;
  disabled?: boolean;
}

const TimeSelector: React.FC<Props> = ({
  doctorId,
  selectedDate,
  bookedSlots,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  disabled = false,
}) => {
  useEffect(() => {
    const total = toMinutes(startTime) + 15;
    let hour = Math.floor(total / 60) % 24;
    const minute = total % 60;
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    const newEndTime: Time = { hour, minute, period };
    const conflict = isSlotDisabled(
      hour,
      minute,
      period,
      true,
      startTime,
      bookedSlots,
      doctorId,
      selectedDate
    );

    if (!conflict) setEndTime(newEndTime);
  }, [startTime]);

  const handleUnitChange = (
    index: number,
    unit: any,
    value: number | string
  ) => {
    const time = index === 0 ? startTime : endTime;
    const updated = { ...time, [unit as keyof Time]: value };
    index === 0 ? setStartTime(updated) : setEndTime(updated);
  };
  const nextValidVal =
    (
      selected: Time,
      index: number,
      unit: keyof Time,
      options: (number | string)[]
    ) =>
    (direction: "up" | "down"): number | string => {
      const currentIndex = options.indexOf(selected[unit]);
      for (let i = 1; i <= options.length; i++) {
        const nextIndex =
          direction === "up"
            ? (currentIndex + i) % options.length
            : (currentIndex - i + options.length) % options.length;
        const val = options[nextIndex];

        const testHour = unit === "hour" ? Number(val) : selected.hour;
        const testMinute = unit === "minute" ? Number(val) : selected.minute;
        const testPeriod = unit === "period" ? String(val) : selected.period;
        const reference: any = index === 1 ? startTime : null;

        const disabled = isSlotDisabled(
          testHour,
          testMinute,
          testPeriod,
          index === 1,
          reference,
          bookedSlots,
          doctorId,
          selectedDate
        );

        if (!disabled) return val;
      }
      return selected[unit];
    };

  return (
    <div className="bg-[#f3f8ff] flex justify-center">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-3xl shadow-md">
        <div className="flex items-center gap-3 mb-2 mt-">
          <AlarmClock className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-900">Choose Time</h2>
        </div>
        <p className="text-gray-600 mt-2 px-1">
          Set time by clicking the following:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-4">
          {["Start Time", "End Time"].map((label, index) => {
            const selected: string | Time = index === 0 ? startTime : endTime;
            return (
              <div key={label}>
                <p className="font-semibold mb-2 px-2">{label}</p>
                <div className="flex items-center gap-2 text-center p-8 rounded-lg border shadow-md">
                  {(["hour", "minute", "period"] as const).map((unit) => {
                    const options = getUnitOptions(unit);
                    const unitKey = unit as keyof Time;
                    const getNextValidVal = nextValidVal(
                      selected,
                      index,
                      unitKey,
                      options
                    );

                    const isDisabled = (val: number | string): boolean => {
                      const testHour =
                        unit === "hour" ? Number(val) : selected.hour;
                      const testMinute =
                        unit === "minute" ? Number(val) : selected.minute;
                      const testPeriod =
                        unit === "period" ? String(val) : selected.period;
                      const reference = index === 1 ? startTime : null;
                      return isSlotDisabled(
                        testHour,
                        testMinute,
                        testPeriod,
                        index === 1,
                        reference,
                        bookedSlots,
                        doctorId,
                        selectedDate
                      );
                    };

                    return (
                      <TimeUnitSelector
                        key={unit}
                        unit={unit}
                        value={selected[unit]}
                        onChange={(val: string | number) =>
                          handleUnitChange(index, unit, val)
                        }
                        getNextValidVal={getNextValidVal}
                        options={options}
                        isDisabled={isDisabled}
                        disabled={
                          disabled || (index === 1 && unit === "period")
                        }
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!selectedDate && (
          <div className="text-red-600  mt-0.5 mb-0.5 text-xs font-medium text-center float-left ">
            ⚠️ Please select a date to enable time selection.
          </div>
        )}
        <div className="mt-6 bg-blue-50 text-blue-700 p-4 rounded-md text-sm">
          <span role="img" aria-label="info">
            💡
          </span>{" "}
          Patients may book appointments in intervals of{" "}
          <span className="text-red-800 font-bold">15</span> minutes only.
          <br />
          <span role="img" aria-label="info">
            💡
          </span>{" "}
          Time slots that conflict with existing appointments are automatically
          disabled.
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
