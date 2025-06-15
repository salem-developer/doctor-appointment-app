/* eslint-disable @typescript-eslint/no-explicit-any */
export const filterAppointments = (data: any[], query: string) => {
  const lowerQuery = query.toLowerCase();
  return data.filter((item) => {
    const firstName = item.firstName?.toLowerCase() ?? "";
    const lastName = item.lastName?.toLowerCase() ?? "";
    const fullName = `${firstName} ${lastName}`.trim();
    return (
      fullName.includes(lowerQuery) ||
      (item.email ?? "").toLowerCase().includes(lowerQuery) ||
      (item.phone ?? "").toLowerCase().includes(lowerQuery)
    );
  });
};