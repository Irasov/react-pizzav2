import React from "react";
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({currentPage, onChangePage}) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(event)=>onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    previousLabel="<"
    forcePage={currentPage - 1}
    renderOnZeroPageCount={null}
  />
);