import React from "react";
import { Drawer, List, Box, ListItem, styled, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useCaregories } from "../../redux";
import { SidebarHeader } from "./SidebarHeader";

const StyledListItem = styled(ListItem)(() => ({
  padding: "5px 0px 3px 15px",
  margin: "0px",
}));

export const Sidebar = () => {
  const sidebarItems = useCaregories();
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "block"},
        "& .MuiDrawer-paper": {width: "255px", height: "95%"},
      }}
      open
    >
      <SidebarHeader/>
      <Divider/>
      <List>
        {sidebarItems.map((item) => {
          const {_id, name} = item;
          return (
            <React.Fragment key={_id}>
              <Link to={`/products/categories/${name}?page=1&sort=name,desc`}>
                <Box sx={{display: "flex"}}>
                  <StyledListItem>
                    <ListItemText secondary={name} />
                  </StyledListItem>
                </Box>
                <Divider/>
              </Link>
            </React.Fragment>
          )
        })}
      </List>
    </Drawer>
  )
};
