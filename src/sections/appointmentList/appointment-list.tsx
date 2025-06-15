/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArchiveX } from "lucide-react";
import DataTable from "@/components/data-table";
import AppointmentSkeleton from "@/components/AppointmentSkeleton";
import SearchBar from "@/components/SearchBar";
import {
  useGetAppointmentsByDoctorIdQuery,
  useGetDoctorByDoctorIdQuery,
} from "@/redux/features/apiSlice";
import { usePagination } from "@/hooks/usePagination";
import { filterAppointments } from "@/lib/filterAppointments";
import SuccessDialog from "@/components/dialog-box/SuccessFullDialog";

const ShowAppointment = () => {
  const { doctorId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);

  const { data: doctorData } = useGetDoctorByDoctorIdQuery(Number(doctorId));
  const {
    data = [],
    isLoading,
    isError,
  } = useGetAppointmentsByDoctorIdQuery(Number(doctorId));
const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (location.state?.showSuccessDialog) {
      setShowDialog(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const doctorName = doctorData?.[0]?.name ?? "";

  const { page, maxPage, currentData, next, prev, setData } = usePagination(filtered, 5);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredData = filterAppointments(data, searchTerm);
      setFiltered(filteredData);
      setData(filteredData);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, data]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <Card className="rounded-xl shadow-md overflow-hidden p-8">
        <h2 className="text-3xl font-bold text-gray-900">Patients List - {doctorName}</h2>
        <p className="text-gray-600 text-lg">
          List of all patients who booked an appointment with {doctorName}
        </p>

        <CardContent className="p-0 mb-2">
          {!isLoading && !isError && currentData.length > 0 && (
          <div className="mb-0">
             <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        )}
          {isLoading ? (
            Array(5)
              .fill(0)
              .map((_, idx) => <AppointmentSkeleton key={idx} />)
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 text-red-500">
              <ArchiveX className="w-16 h-16 mb-4"/>
              <p className="text-lg">Failed to load data.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
             <ArchiveX className="w-16 h-16 mb-4"/>
              <p className="text-lg">No appointments found</p>
            </div>
          ) : (
            <>
              <DataTable data={currentData} searchTerm={searchTerm} />
              <div className="flex justify-between gap-4 mt-4">
                <span className="text-sm text-gray-600 font-bold">
                  Page {page} of {maxPage}
                </span>
                <div>
                  <Button onClick={prev} disabled={page === 1} variant="default">Prev</Button>
                  <span className="text-sm text-gray-900 mx-2 font-bold">Page {page}</span>
                  <Button onClick={next} disabled={page === maxPage} variant="default">Next</Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      {showDialog && 
      <SuccessDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        doctorName={doctorName}
      />}
    </div>
      
  );
};

export default ShowAppointment;
