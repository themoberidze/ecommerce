import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { useSelector } from "react-redux";
import { productReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";

const perisitConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
};

const rootReduser = combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
});

const persistedReducer = persistReducer(perisitConfig, rootReduser);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);

// User
export { authenticateUser, logoutUser } from "./slices/userSlice";

export const useUserInfo = () => useSelector((state) => state.user.userInfo);

// Product
export {
    saveProduct,
    fetchHomePageProducts,
    fetchCategoryProducts,
    queryProducts,
    rateProduct,
    fetchSingleProduct,
    setSelectedProduct,
    setSearchProducts,
} from "./slices/productSlice";

export const useSelectedProduct = () => useSelector((state) => state.product.selectedProduct);

export const useHomePageProducts = () => useSelector((state) => state.product.homePageProducts);

export const useCaregories = () => useSelector((state) => state.product.categories);

export const useCategoryProducts = () => useSelector((state) => state.product.categoryProducts);

export const useSearchResults = () => useSelector((state) => state.product.searchResults);

export const useSingleProduct = () => useSelector((state) => state.product.singleProduct);

export const useProductLoading = () => useSelector((state) => state.product.loading);

// Cart
export {
    addToCart,
    removeFromCart,
    clearCart,
    fetchCart,
    saveCart
} from "./slices/cartSlice";

export const useCart = () => useSelector((state) => state.cart.cartItems);
