import React from "react";
import { GridComponent } from "../../shared";
import { ProductCard } from "../ProductCard";

export const CategoryProductList = ({products}) => {
  return (
    <GridComponent>
      {products?.map((product) => {
        return (
          <React.Fragment key={product._id}>
            <ProductCard {...product} product={product}/>
          </React.Fragment>
        )
      })}
    </GridComponent>
  )
};
