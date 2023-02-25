import React, { useState } from "react";
import { Box, Avatar, IconButton, Menu, Button, MenuItem } from "@mui/material";
import { getUserInitials, isUserAdmin } from "../../application";
import { logoutUser, useUserInfo } from "../../redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

export const UserIcon = () => {
  const userData = useUserInfo();
  const [anchor, setAnchor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={{borderRadius: "50%", boxShadow: "0 0 10px black"}}>
      <IconButton onClick={(e) => {setAnchor(e.currentTarget)}}>
        {!userData ? <FaRegUserCircle size={40} color={"black"}/> 
        : <Avatar sx={{background: "#DFFF00", color: "#000000"}}>
          {getUserInitials(userData?.firstName, userData?.lastName)}
          </Avatar>}
      </IconButton>
      <Box>
        <Menu
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}
        >
          {!!userData ? (
            <MenuItem onClick={() => {
              dispatch(logoutUser());
              navigate("/");
              }}>
              <Button>logout</Button>
            </MenuItem>
          ) : (
            <Box>
              <MenuItem onClick={()=>navigate("/login")}>
                <Button>login</Button>
              </MenuItem>
              <MenuItem onClick={()=>navigate("/register")}>
                <Button>register</Button>
              </MenuItem>
            </Box>
          )}
          {isUserAdmin(userData) && 
            <MenuItem onClick={() => navigate("/products/new")}>
              <Button>add product</Button>
            </MenuItem>}
        </Menu>
      </Box>
    </Box>
  );
};
