import React from 'react';

export default function MoviesPaginator({
  totalPages,
  currentPage = 1,
  onClick,
  maxVisiblePages = 3,
}: {
  totalPages: number;
  currentPage?: number;
  onClick: (pageIndex: number) => void;
  maxVisiblePages?: number;
}) {
  if (totalPages <= 1) return null;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center items-center gap-2 my-8">
      <button
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 border rounded-md transition-colors ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
        aria-label="Previous page"
      >
        &lt;
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onClick(1)}
            className={`px-2 py-1 border rounded-md transition-colors ${
              1 === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onClick(page)}
          className={`px-2 py-1 border rounded-md transition-colors ${
            page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onClick(totalPages)}
            className={`px-2 py-1 border rounded-md transition-colors ${
              totalPages === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 border rounded-md transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  );
};