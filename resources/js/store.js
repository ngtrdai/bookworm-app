import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import headerReducer from "./reducers/header";

const store = configureStore({
    reducer: {
        cartReducer: cartReducer,
        headerReducer: headerReducer
    }
});

export default store;