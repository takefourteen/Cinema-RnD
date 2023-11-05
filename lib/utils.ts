import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, and the last page.
  if (currentPage <= 2) {
    return [1, 2, 3, totalPages];
  }

  // If the current page is among the last 2 pages,
  // show the first page and the last 3.
  if (currentPage >= totalPages - 1) {
    return [1,  totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, the current page and its neighbors,
  // and the last page.
  return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
};
