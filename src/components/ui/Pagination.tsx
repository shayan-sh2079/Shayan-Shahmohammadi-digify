interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pageNumbers = [];

  // Always show first page
  pageNumbers.push(1);

  // Calculate range of pages to show around current page
  let rangeStart = Math.max(2, currentPage - 1);
  let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

  // Adjust range to always show 3 pages if possible
  if (currentPage <= 3) {
    rangeEnd = Math.min(totalPages - 1, 4);
  } else if (currentPage >= totalPages - 2) {
    rangeStart = Math.max(2, totalPages - 3);
  }

  // Add ellipsis after first page if needed
  if (rangeStart > 2) {
    pageNumbers.push("...");
  }

  // Add range of pages
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pageNumbers.push(i);
  }

  // Add ellipsis before last page if needed
  if (rangeEnd < totalPages - 1) {
    pageNumbers.push("...");
  }

  // Always show last page if more than one page
  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="flex justify-center">
      <ul className="inline-flex space-x-2">
        {/* Previous button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-md px-3 py-1 ${
              currentPage === 1
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="Previous page"
          >
            &laquo;
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 py-1 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(Number(page))}
                className={`cursor-pointer rounded-md px-3 py-1 ${
                  currentPage === page
                    ? "bg-blue-600 font-medium text-white"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-md px-3 py-1 ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="Next page"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
