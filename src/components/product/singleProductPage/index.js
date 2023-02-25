import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { fetchSingleProduct, useSingleProduct } from "../../../redux";

export const SingleProduct = () => {
    const {state} = useLocation();
    const dispatch = useDispatch();
    const {categoryName} = useParams();
    const singleProduct = useSingleProduct();
    
    useEffect(() => {
        dispatch(fetchSingleProduct({id: state.id, category: categoryName}));
    }, [state.id]);

    return (
        <Box>
            <Typography><img alt="" src={singleProduct?.image} style={{width: "500px"}}/></Typography>
            <Typography>Product Name: {singleProduct?.name}</Typography>
            <Typography>Product Brand: {singleProduct?.brand}</Typography>
            <Typography>Product Category: {singleProduct?.category}</Typography>
            <Typography>Product Description: {singleProduct?.description}</Typography>
            <Typography>Product Price: {singleProduct?.price}</Typography>
        </Box>
    )
};

