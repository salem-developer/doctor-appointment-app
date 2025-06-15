/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

  
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";

import { useGetDoctorsQuery } from "@/redux/features/apiSlice";
import { DoctorCard } from "@/components/DoctorCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterTag } from "@/components/FilterTag";


export const DoctorSelection = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useGetDoctorsQuery();
  const [showAll, setShowAll] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  const specialties = useMemo(() => {
    if (!data || data.length === 0) return ['All'];
    const uniqueSpecialties = Array.from(new Set(data.map((doctor: any) => doctor.specialty)));
    return ['All', ...uniqueSpecialties];
  }, [data]);
  
  const filteredDoctors = useMemo(() => {
    if (selectedSpecialty === 'All') {
      return data;
    }
    return data.filter((doctor: any) => doctor.specialty === selectedSpecialty);
  }, [data, selectedSpecialty]);
  
  const doctors = showAll ? filteredDoctors : filteredDoctors.slice(0, 6);

  const getSpecialtyCount = (specialty: string) => {
    if (specialty === 'All') return data.length;
    return data.filter((doctor: any) => doctor.specialty === specialty).length;
  };

  const onDoctorSelect = (doctorId: string) => {
   navigate(`/book/${doctorId}`, { state: { fromHome: true } });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-4 px-6 sm:px-14 ">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Choose Doctor
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            Select from our experienced medical professionals to book your
            appointment
          </p>
        </div>
        <div className="mt-8 mb-8 flex flex-wrap gap-3 justify-center">
          {specialties.map((specialty) => (
            <FilterTag
              key={specialty}
              label={specialty}
              count={getSpecialtyCount(specialty)}
              selected={selectedSpecialty === specialty}
              onClick={() => {
                setSelectedSpecialty(specialty);
                setShowAll(false);
              }}
            />
          ))}
        </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {(isLoading) ? (
            Array(showAll ? data.length : 6)
             .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg shadow-md p-4 bg-white space-y-3 animate-pulse"
                >
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                  <Skeleton className="h-4 w-1/4 rounded" />
                  <Skeleton className="h-32 w-full rounded-md" />
                </div>
              ))
          ) : (
            doctors.map((doctor: any) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onSelect={onDoctorSelect}
              />
            ))
          )}
        </div>
        
      {!showAll && filteredDoctors.length > 6 && (
          <div className="text-center mt-6">
            <Button onClick={() => setShowAll(true)}>View All</Button>
          </div>
        )}
      </div>
    </div>
  );
};
