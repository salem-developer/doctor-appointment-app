import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Time {
  hour: string;
  minute: string;
  period: string;
}

interface Appointment {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  startTime: Time;
   doctorId: string;
}

const getInitials = (first: string, last: string) => {
  return `${first[0]}${last[0]}`;
};

const TableRow = ({ appointment, idx }: { appointment: Appointment, idx:number }) => {
  const { firstName, lastName, email, phone, date, startTime } = appointment;

  return (
    <tr className="border-b hover:bg-gray-50 text-center">
      <td className="px-3 py-2">{idx+1}</td>
      <td className="flex items-center gap-3 px-6 py-4 justify-center">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-orange-300 text-white text-sm">
            {getInitials(firstName, lastName)}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{firstName} {lastName}</span>
      </td>
      <td className="px-6 py-4">
        {date}
        <span className="ml-2 inline-block text-green-700 text-xs bg-green-100 px-2 py-0.5 rounded">
          {startTime?.hour}:{startTime?.minute =="0" ? `${startTime?.minute}0`: startTime?.minute} {startTime?.period}
        </span>
      </td>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">{phone}</td>
    </tr>
  );
};

export default TableRow;
