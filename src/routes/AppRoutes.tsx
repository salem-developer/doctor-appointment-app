
import { lazy, Suspense } from 'react';
import { type RouteObject, useRoutes } from 'react-router-dom';
import loadingGif from '@/assets/Loading.gif';
const DoctorSelection = lazy(() => import('@/pages/DoctorSelection'));
const BookAppointment = lazy(() => import('@/pages/BookAppointment'));
const ShowAppointment = lazy(() => import('@/pages/ShowAppointment'));


const renderFallback = () => (
  <div className="flex items-center justify-center h-screen">
      <img src={loadingGif} alt="Loading..." className="w-24 h-24" />
    </div>
);


const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={renderFallback()}>
        <DoctorSelection />
      </Suspense>
    ),
  },
  {
    path: '/book/:doctorId',
    element: (
      <Suspense fallback={renderFallback()}>
        <BookAppointment />
      </Suspense>
    ),
  },
  {
    path: '/appointments/:doctorId',
    element: (
      <Suspense fallback={renderFallback()}>
        <ShowAppointment />
      </Suspense>
    ),
  },
];


export default function AppRoutes() {
  return useRoutes(publicRoutes);
}
