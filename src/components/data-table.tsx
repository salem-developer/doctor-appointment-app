/* eslint-disable @typescript-eslint/no-explicit-any */
import TableRow from "./row-table";

interface PatientTableProps {
  data: any[];
  searchTerm:string
}

const DataTable = ({ data }: PatientTableProps) => {
 return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border-2">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs text-center">
          <tr>
            <th className="px-6 py-4">Sl No.</th>
            <th className="px-6 py-4">Patient Name</th>
            <th className="px-6 py-4">Appointment Time</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Phone Number</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((appointment, idx) => (
            <TableRow key={idx} appointment={appointment} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
