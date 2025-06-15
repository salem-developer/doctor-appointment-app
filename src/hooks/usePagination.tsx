/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

export const usePagination = (initialData: any[], itemsPerPage = 5) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [data]);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const next = () => setPage((p) => Math.min(p + 1, maxPage));
  const prev = () => setPage((p) => Math.max(p - 1, 1));

  return { page, maxPage, currentData, next, prev, setPage, setData };
};
