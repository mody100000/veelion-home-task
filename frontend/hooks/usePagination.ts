import { useState, useEffect } from "react";

export function usePagination<T>(
  items: T[],
  itemsPerPage: number,
  resetDependencies: any[] = [],
) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, resetDependencies);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(
    Math.max(0, startIndex),
    startIndex + itemsPerPage,
  );

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
  };
}
