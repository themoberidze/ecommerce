import React from "react";
import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { SiHomebridge } from "react-icons/si";

const StyledHeader = styled(Box)(() => ({
  background: "#DFFF00",
  height: "84px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const SidebarHeader = () => {
  return (
    <StyledHeader><Link to="/"><SiHomebridge size={50}/></Link></StyledHeader>
  )
};
