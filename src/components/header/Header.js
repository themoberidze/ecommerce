import React, { useState } from "react";
import { Box, AppBar, Toolbar, styled, Button, Badge } from "@mui/material";
import { Link } from 'react-router-dom';
import { SearchBar } from "./SearchBar";
import { UserIcon } from "./UserIcon";
import { BiShoppingBag } from "react-icons/bi";
import { SiHomebridge } from "react-icons/si";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "../../redux";

const StyledAppBar = styled(AppBar)(() => ({
    background: "#DFFF00",
    width: "calc(100% - 255px)",
    padding: "10px 30px 10px 30px",
}));

const StyledToolBar = styled(Toolbar)(() => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
}));

const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
        width: "20px",
        height: "20px",
        color: "#ffffff",
        background: "#F33451",
        top: "2px",
        right: "-3px",
    },
}));

export const Header = () => {
    const cartItems = useCart();
    const [isCartDrowerOpen, setIsCartDrowerOpen] = useState(false);
    const cartItemsQuantity = cartItems?.reduce((acc, curr) => acc + curr.quantity, 0);

    return (
        <Box>
            <StyledAppBar>
                <StyledToolBar>
                    <Link to="/"><SiHomebridge size={50}/></Link>
                    <SearchBar/>
                    <Button onClick={() => setIsCartDrowerOpen(true)}>
                        <StyledBadge badgeContent={cartItemsQuantity}>
                            <BiShoppingBag size={40} color={"#000000"}/>
                        </StyledBadge>
                    </Button>
                    <CartDrawer 
                        cartItems={cartItems} 
                        isCartDrowerOpen={isCartDrowerOpen} 
                        setIsCartDrowerOpen={setIsCartDrowerOpen}
                    />
                    <UserIcon/>
                </StyledToolBar>
            </StyledAppBar>
        </Box>
    )
};
