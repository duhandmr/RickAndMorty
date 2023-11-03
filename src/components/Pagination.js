import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="pagination">
      {prevPage && (
        <button onClick={() => onPageChange(prevPage)}>Previous</button>
      )}
      <span>{currentPage} of {totalPages}</span>
      {nextPage && (
        <button onClick={() => onPageChange(nextPage)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
