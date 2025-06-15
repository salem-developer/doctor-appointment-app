/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Appointment, TimeSlot } from "@/types/appointment";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formateDate(dateString: Date | string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function timeSlotToMinutes(time: TimeSlot): number {
  let hours = time.hour % 12;
  if (time.period === "PM") hours += 12;
  return hours * 60 + time.minute;
}

export async function isTimeSlotAvailable(
  newBooking: Appointment,
  existingBookings: Appointment[]
): Promise<boolean> {
  const newDate = newBooking.date;
  const newStart = timeSlotToMinutes(newBooking.startTime);
  const newEnd = timeSlotToMinutes(newBooking.endTime);

  return !existingBookings.some((booking) => {
    if (booking.date !== newDate) return false;

    const existingStart = timeSlotToMinutes(booking.startTime);
    const existingEnd = timeSlotToMinutes(booking.endTime);

    console.log(newStart, newEnd, existingEnd, existingStart);
    return newStart < existingEnd && newEnd > existingStart;
  });
}

export function isSlotDisabled(
  hour: number,
  minute: number,
  period: string,
  isEndTime = false,
  referenceTime: any,
  bookedSlots: any[],
  doctorId: string | number,
  selectedDate: string
) {
  const current = toMinutes({ hour, minute, period });

  const matchingBookings = bookedSlots.filter((slot: any) => {
    return slot.date === selectedDate && slot.doctorId === doctorId;
  });

  if (isEndTime && referenceTime) {
    const start = toMinutes(referenceTime);
    let end = current;

    let duration = end - start;
    if (duration <= 0) duration += 1440;
    if (duration > 15) return true;

    return matchingBookings.some((slot: any) => {
      const bookedStart = toMinutes(slot.startTime);
      const bookedEnd = toMinutes(slot.endTime);
      let adjustedStart = start;
      let adjustedEnd = end;
      if (adjustedEnd <= adjustedStart) adjustedEnd += 1440;
      let bStart = bookedStart;
      let bEnd = bookedEnd;
      if (bEnd <= bStart) bEnd += 1440;
      return adjustedStart < bEnd && adjustedEnd > bStart;
    });
  } else if (!isEndTime) {
    const start = current;
    let end = current + 15;


    return matchingBookings.some((slot: any) => {
      const bookedStart = toMinutes(slot.startTime);
      const bookedEnd = toMinutes(slot.endTime);
      let adjustedStart = start;
      let adjustedEnd = end;
      if (adjustedEnd <= adjustedStart) adjustedEnd += 1440;
      let bStart = bookedStart;
      let bEnd = bookedEnd;
      if (bEnd <= bStart) bEnd += 1440;
      return adjustedStart < bEnd && adjustedEnd > bStart;
    });
  }

  return false;
}

export function toMinutes({ hour, minute, period }: TimeSlot) {
  let h = period === "PM" && hour !== 12 ? hour + 12 : hour;
  if (period === "AM" && hour === 12) h = 0;
  return h * 60 + minute;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = [0, 15, 30, 45];
const PERIODS = ["AM", "PM"];

export const getUnitOptions = (unit: string) => {
  if (unit === "hour") return HOURS;
  if (unit === "minute") return MINUTES;
  return PERIODS;
};


export const getNextAvailableSlot = (
  doctorId: string,
  selectedDate: string,
  bookedSlots: any[],
  initialStart: TimeSlot = { hour: 10, minute: 0, period: "AM" },
  slotDuration = 15,
  maxSearchMinutes = 12 * 60 
): { start: TimeSlot; end: TimeSlot } | null => {
  let baseHour = initialStart.hour;
  let baseMinute = initialStart.minute;
  let period = initialStart.period;

  const totalSlotsToCheck = Math.floor(maxSearchMinutes / slotDuration);

  for (let i = 0; i < totalSlotsToCheck; i++) {
    const isBooked = isSlotDisabled(
      baseHour,
      baseMinute,
      period,
      false,
      null,
      bookedSlots,
      doctorId,
      selectedDate
    );

    if (!isBooked) {
      const start: TimeSlot = { hour: baseHour, minute: baseMinute, period };
      const total = toMinutes(start) + slotDuration;
      let endHour = Math.floor(total / 60) % 24;
      const endMinute = total % 60;
      const endPeriod = endHour >= 12 ? "PM" : "AM";
      endHour = endHour % 12 || 12;

      const end: TimeSlot = {
        hour: endHour,
        minute: endMinute,
        period: endPeriod,
      };
      return { start, end };
    }

    const total =
      toMinutes({ hour: baseHour, minute: baseMinute, period }) + slotDuration;
    baseHour = Math.floor(total / 60) % 24;
    baseMinute = total % 60;
    period = baseHour >= 12 ? "PM" : "AM";
    baseHour = baseHour % 12 || 12;
  }

  return null; 
};


export const isPastDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};
