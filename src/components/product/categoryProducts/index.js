import React, { useEffect } from "react";
import { Box, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useQueryParams } from "../../../application";
import { fetchCategoryProducts, useCategoryProducts } from "../../../redux";
import { CategoryProductList } from "./CategoryProductList";
import { Paginate } from "./Paginate";
import { Sort } from "./Sort";

const StyledBox = styled(Box)(() => ({
    margin: "20px 0"
  }));

export const CategoryProducts = () => {
    const {categoryName} = useParams();
    const {products, totalPages} = useCategoryProducts();
    const dispatch = useDispatch();
    const {value: sort, changeQueryValue: changeSort} = useQueryParams("sort");
    const {value: page, changeQueryValue: changePage} = useQueryParams("page");
    
    useEffect(() => {
        dispatch(
            fetchCategoryProducts(`${categoryName}?page=${page}&size=1&sort=${sort}`));
    }, [categoryName, sort, page]);

    useEffect(() => {
        changePage("page", 1);
    }, [sort]);

    return (
        <Box>
            <Sort sort={sort} changeSort={changeSort}/>
            <StyledBox>
                <CategoryProductList products={products}/>    
            </StyledBox>
            <Paginate 
                totalPages={totalPages}
                currentPage={page}
                changePage={changePage}
            />
        </Box>
    )
};
