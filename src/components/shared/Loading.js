import React from "react";
import { CircularProgress } from "@mui/material";

export const Loading = () => {
  return <CircularProgress/>;
};

export const LoadingWrapper = ({isloading, children}) => {
    if(isloading) {
        return <Loading/>
    }
    return children;
};
