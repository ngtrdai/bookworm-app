import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
const store = configureStore({
    reducer: {
        cartReducer: cartReducer
    }
});

export default store;