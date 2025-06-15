/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {  Clock, Award } from 'lucide-react';
import { type Doctor } from '../types/booking';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctorId: string) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(doctor.id)}
      className={`
        relative cursor-pointer transition-all duration-300 transform hover:-translate-y-2
        bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-blue-200'
      `}
    >
      <div className="flex justify-center mb-4">
        <div className="relative">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-md"
          />
        </div>
      </div>
      <div className="text-center space-y-3">
        <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
        
        <div className="flex items-center justify-center space-x-1">
          <Award className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-600">{doctor.specialty}</span>
        </div>

        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{doctor.experience}</span>
          </div>
        </div>
      </div>
    </div>
  );
};