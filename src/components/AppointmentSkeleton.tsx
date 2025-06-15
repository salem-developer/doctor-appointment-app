// components/AppointmentSkeleton.tsx
const AppointmentSkeleton = () => {
  return (
    <tr className="border-b">
      {[...Array(4)].map((_, idx) => (
        <td key={idx} className="px-6 py-4 text-center">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mx-auto" />
        </td>
      ))}
    </tr>
  );
};

export default AppointmentSkeleton;
