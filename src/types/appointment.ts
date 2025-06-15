export type TimeSlot = {
  hour: number;
  minute: number;
  period: string;
};

export type Appointment = {
  date: string; // 'dd-mm-yyyy'
  startTime: TimeSlot;
  endTime: TimeSlot;
};