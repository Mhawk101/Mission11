interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}
//takes pagination functionality and puts it in a separate component that can be reused later. 
const Pagination = ({currentPage, totalPages, pageSize, onPageChange, onPageSizeChange}: PaginationProps) => {
    return (
        <div className="d-flex gap-2 justify-content-center mt-4">
            <h3>Books to display: </h3>
            <select
                    className="form-select mb-3"
                    onChange={(e) => {
                        onPageSizeChange(Number(e.target.value));
                        onPageChange(1);
                    }}
                    value={pageSize}>
                        
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
            </select>
            <button
              className="btn btn-primary"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="align-self-center">Page {currentPage}</span>

            <button
              className="btn btn-primary"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
        </div>
    );
};

export default Pagination;