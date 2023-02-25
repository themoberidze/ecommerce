import React from "react";
import { Drawer, styled, Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearCart, saveCart, useUserInfo } from "../../redux";

const StyledBox = styled(Box)(() => ({
  width: 400,
  display: "flex",
  alignItems: "center",
  padding: "5px 10px",
  marginBottom: 20,
}));

export const CartDrawer = ({cartItems, isCartDrowerOpen, setIsCartDrowerOpen}) => {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();

  const onSaveCart = (isClear) => {
    dispatch(
      saveCart({
        userId: userInfo?._id, cartItems: isClear ? [] : cartItems
      })
    );
  };

  return (
    <Drawer 
      open={isCartDrowerOpen} 
      onClose={() => setIsCartDrowerOpen(false)} 
      anchor="bottom"
    >
      {cartItems.map((item) => {
        const {product, quantity} = item;
        const {image, _id, name, price} = product;
        return (
          <StyledBox key={_id}>
            <img 
              src={image}
              alt={`${name}`}
              width="70px"
              height="70px"
              style={{objectFit: "cover", borderRadius: 5}}
            />
            <Box sx={{paddingLeft: 3}}>
              <Typography>{name}</Typography>
              <Typography>Quantity: {quantity}</Typography>
              <Typography>Total Price: {price * quantity}</Typography>              
            </Box>
          </StyledBox>)
      })}
      <Box sx={{display: "flex", justifyContent: "space-around"}}>
        <Button onClick={() => {
          dispatch(clearCart());
          setIsCartDrowerOpen(false);
          onSaveCart(true);
        }}
        >clear cart</Button>
        {userInfo && <Button onClick={() => onSaveCart(false)}>save cart</Button>}        
      </Box>
    </Drawer>
  )
};
