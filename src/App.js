import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";
import { Box, styled } from "@mui/material";
import { RoutesComponent } from "./Routes";
import { fetchCart, fetchHomePageProducts, useUserInfo } from "./redux";

const StyledContentContainer = styled(Box)(() => ({
  padding: "0 0 0 37px",
  width: "calc (100% - 225px)",
  marginLeft: "225px",
  marginTop: "100px",
  minHeight: "100vh",
}));

function App() {
  const dispatch = useDispatch();
  const userInfo = useUserInfo();

  useEffect(() => {
    dispatch(fetchHomePageProducts());
  }, []);

  useEffect(() => {
    if(userInfo) {
      dispatch(fetchCart(userInfo._id));
    }
  }, [userInfo]);
  
  return (
    <Box>
      <Sidebar/>
      <Header/>
      <StyledContentContainer>{RoutesComponent()}</StyledContentContainer>
    </Box>
  );
}

export default App;
