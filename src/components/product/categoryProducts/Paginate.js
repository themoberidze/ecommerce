import React from "react";
import { Pagination } from "@mui/material";

export const Paginate = ({currentPage, totalPage=2, changePage}) => {
  return (
    <Pagination 
      count={totalPage}
      page={Number(currentPage)}
      onChange={(_, value) => {changePage("page", value)}}
    />
  )
};
