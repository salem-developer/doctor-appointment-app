export interface BookingFormData {
  doctorId?: string;
  date: string;
  startTime: {
    hour: string;
    minute: string;
    period: 'AM' | 'PM';
  };
  endTime: {
    hour: string;
    minute: string;
    period: 'AM' | 'PM';
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  fullDate: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
}