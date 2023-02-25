import React from "react";
import { Box, Grid, Card, styled, Typography, CardActions, Rating, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isUserAdmin } from "../../application";
import { addToCart, rateProduct, removeFromCart, setSelectedProduct, useCart, useUserInfo } from "../../redux";
import { useDispatch } from "react-redux";

const StyledCardContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "0 10px",
}));

const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const ProductCard = ({
  _id,
  name,
  description,
  category,
  brand,
  price,
  image,
  avarageRating,
  product,
}) => {
  const userInfo = useUserInfo();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useCart();
  const isProductInCart = cartItems?.find((item) => item.product._id === _id);
  
  const onEdit = () => {
    dispatch(setSelectedProduct(product));
    navigate(`/products/edit/${name}`);
  };

  const onAddToCart = () => {
    dispatch(addToCart(product));
  };

  const {pathname, search} = useLocation();
  const onRatingChange = (e) => {
    dispatch(
      rateProduct({
        productId: _id,
        userId: userInfo?._id,
        url: `${category}${search}&size=1`,
        isHome: pathname === "/",
        rating: e.target.value,
      })
    )
  };

  return (
    <Grid item>
      <Card sx={{width: 400, borderRadius: 3, boxShadow: "0 0 10px #000000", padding: "10px"}}>
        <Link 
          to={`/products/categories/${category}/${name}`}
          style={{textDecoration: "none"}}
          state={{id:_id}}
        >
          <Box >
          <img 
            src={image}
            alt={`${category}-${name}`}
            height="200px"
            style={{objectFit: "cover"}}
          /></Box>
          <StyledCardContent>
            <Typography>{name}</Typography>
            <Typography>{price} $</Typography>
          </StyledCardContent>
        </Link>
        <CardActions>
          <Rating 
            value={avarageRating}
            disabled={!userInfo}
            onChange={onRatingChange}
          />
          <StyledBox>
            {isProductInCart ? (
              <StyledBox>
                <Button onClick={() => dispatch(removeFromCart(_id))}>-</Button>
                <Typography>{isProductInCart.quantity}</Typography>
                <Button onClick={onAddToCart}>+</Button>
              </StyledBox>
            ) : (
              <Button onClick={onAddToCart}>add to cart</Button>
            )}
            {isUserAdmin(userInfo) && <Button onClick={onEdit}>edit</Button>}
          </StyledBox>
        </CardActions>
      </Card>
    </Grid>
  )
};
