import ReactPaginate from "react-paginate";
import "./Pagination.css"; // 스타일 추가

const PaginationComponent = ({ pageCount, onPageChange }) => (
  <ReactPaginate
    pageCount={pageCount}
    onPageChange={(data) => onPageChange(data.selected)}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    containerClassName={"pagination"}
    activeClassName={"active"}
    previousLabel={"<"}
    nextLabel={">"}
    breakLabel={"..."}
  />
);

export default PaginationComponent;
