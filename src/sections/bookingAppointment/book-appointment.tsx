/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import TimeSelector from "@/components/TimeRangeSelector";
import UserDetailsForm from "@/components/UserDetailsForm";
import {
  useAddAppointmentMutation,
  useGetAppointByDateQuery,
} from "@/redux/features/apiSlice";
import { formateDate, getNextAvailableSlot, isPastDate } from "@/lib/utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

function BookAppointment() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const formattedDate = date ? formateDate(date) : "";
  const { doctorId } = useParams<{ doctorId: string }>();
  const [startTime, setStartTime] = useState<any>({
    hour: 10,
    minute: 0,
    period: "AM",
  });
  const [endTime, setEndTime] = useState<any>({
    hour: 10,
    minute: 15,
    period: "AM",
  });

  const { data: allAppointments = [] } = useGetAppointByDateQuery(
    doctorId && date ? { doctorId, date: formattedDate } : skipToken,
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const [createAppointment, { isSuccess: isApiSuccess }] = useAddAppointmentMutation();
  const handleSubmit = async (formValues: any) => {
    if (!formattedDate) {
      return;
    }
    try {
      const payload = {
        id: uuidv4(),
        ...formValues,
        doctorId,
        date: formattedDate,
        startTime,
        endTime,
      };
      await createAppointment(payload).unwrap();
      navigate(`/appointments/${doctorId}`, {
        state: { showSuccessDialog: true },
      });
      localStorage.setItem("booked", "true")
    } catch (err) {
      console.log(err);
    }
  };

  const location = useLocation();

useEffect(() => {
  const fromHome = location.state?.fromHome;
  if (!fromHome) {
    navigate("/");
  }
}, []);

  useEffect(() => {
  if (isApiSuccess || !date || !doctorId || !allAppointments.length) return;

    const result = getNextAvailableSlot(
      doctorId,
      formattedDate,
      allAppointments
    );

    if (result) {
      setStartTime(result.start);
      setEndTime(result.end);
    } else {
      alert("No available time slots for this doctor on selected date.");
    }
  }, [date, doctorId, allAppointments, isApiSuccess]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-4 px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Book Your Appointment
            </h1>
            <p className="text-gray-600 text-lg">
              Choose your preferred date and time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <CalendarIcon className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Choose Date
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Pick a date for your appointment:
                </p>
                <div className="flex justify-center py-6">
                  <CalendarUI
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-lg border shadow-md w-[400px]"
                    disabled={isPastDate}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 space-y-4">
              <TimeSelector
                doctorId={doctorId ?? ""}
                selectedDate={formattedDate}
                bookedSlots={allAppointments}
                startTime={startTime}
                endTime={endTime}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                disabled={!date}
              />
              <UserDetailsForm
                onSubmit={handleSubmit}
                selectedDate={formattedDate}
                startTime={startTime}
                endTime={endTime}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
