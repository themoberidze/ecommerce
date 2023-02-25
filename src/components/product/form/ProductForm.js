import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { useForm } from "../../../application/hooks/useForm";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveProduct, useSelectedProduct, setSelectedProduct } from "../../../redux";

const generateAddProductFormValues = (selectedProduct) => {
  return {
    name: {
      value: selectedProduct?.name || "",
      required: true,
      error: "",
      validateInput: (name) => name.length > 1 ? null : "name should have at 2 character",
    },
    description: {
      value: selectedProduct?.description || "",
      required: true,
      error: "",
      validateInput: (description) => description.length > 1 ? null : "description should have at 2 character",
    },
    category: {
      value: selectedProduct?.category || "",
      required: true,
      error: "",
      validateInput: (category) => category.length > 1 ? null : "category should have at 2 character",
    },
    brand: {
      value: selectedProduct?.brand || "",
      required: true,
      error: "",
      validateInput: (brand) => brand.length > 1 ? null : "brand should have at 2 character",
    },
    price: {
      value: selectedProduct?.price || 0,
      required: true,
      error: "",
      validateInput: (price) => price > 0 ? null : "price should be positive number",
    },
  }
};

export const ProductForm = () => {
  const {formValues: productFormValues, onInputChange, setFormValues} = useForm({defaultFormValues: generateAddProductFormValues()});
  const selectedProduct = useSelectedProduct();
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSaveProduct = () => {
    const name = productFormValues.name.value;
    const description = productFormValues.description.value;
    const category = productFormValues.category.value;
    const brand = productFormValues.brand.value;
    const price = productFormValues.price.value;
    dispatch (
      saveProduct ({
      product: { name, description, category, brand, price, image, },
      isUpdating: !!selectedProduct,
      id: selectedProduct?._id,
      })
    )
      .unwrap()
      .then(() => navigate("/"))
  };

  useEffect(() => {
    if (selectedProduct) {
      setFormValues(generateAddProductFormValues(selectedProduct));
      setImage(selectedProduct.image);
    };
  }, [selectedProduct]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedProduct(null));
    }
  }, []);

  return (
    <FormControl>
      <TextField
        name="name"
        value={productFormValues.name.value}
        onChange={onInputChange}
        error={!!productFormValues.name.error}
        helperText={productFormValues.name.error}
        label="name"
      />
      <TextField
        name="description"
        value={productFormValues.description.value}
        onChange={onInputChange}
        error={!!productFormValues.description.error}
        helperText={productFormValues.description.error}
        label="description"
      />
      <TextField
        name="category"
        value={productFormValues.category.value}
        onChange={onInputChange}
        error={!!productFormValues.category.error}
        helperText={productFormValues.category.error}
        label="category"
      />
      <TextField
        name="brand"
        value={productFormValues.brand.value}
        onChange={onInputChange}
        error={!!productFormValues.brand.error}
        helperText={productFormValues.brand.error}
        label="brand"
      />
      <TextField
        name="price"
        value={productFormValues.price.value}
        onChange={onInputChange}
        error={!!productFormValues.price.error}
        helperText={productFormValues.price.error}
        label="price"
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={({base64}) => {setImage(base64)}}
      />
      <Button onClick={onSaveProduct}>save</Button>
    </FormControl>
  )
};
