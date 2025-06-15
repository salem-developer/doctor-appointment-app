/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Appointment } from '@/types/appointment'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Doctor {
  id: number
  name: string
  image?: string
}

const URL: string = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const allApi = createApi({ 
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: URL}),
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      query: () => '/doctors',
    }),
    getAppointments: builder.query<Appointment[], void>({
      query: () => '/appointments',
    }),
    getDoctorByDoctorId: builder.query<Doctor[], number>({
      query: (doctorId) => `/doctors?id=${doctorId}`,
    }),
    getAppointByDate: builder.query<Appointment[], { doctorId: string | number; date: string }>({
  query: ({ doctorId, date }) => `/appointments?doctorId=${doctorId}&date=${date}`,
}),
     getAppointmentsByDoctorId: builder.query<Appointment[], number>({
      query: (doctorId) => `/appointments?doctorId=${doctorId}`,
    }),
    addAppointment: builder.mutation<Doctor, Partial<Doctor>>({
      query: (data) => ({
        url: '/appointments',
        method: 'POST',
        body: data,
      }),
    }),
  })
})

export const { useGetDoctorsQuery ,useGetAppointmentsQuery, useGetDoctorByDoctorIdQuery,useGetAppointByDateQuery, useGetAppointmentsByDoctorIdQuery, useAddAppointmentMutation} = allApi