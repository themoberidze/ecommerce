import React from "react";
import { Grid } from "@mui/material";

export const GridComponent = ({children}) => {
  return (
    <Grid container spacing={4} sx={{width: "100%"}}>
      {children}
    </Grid>
  )
};
