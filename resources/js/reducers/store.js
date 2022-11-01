import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import headerReducer from "./header";
const store = configureStore({
    reducer: {
        cartReducer: cartReducer,
        headerReducer: headerReducer
    }
});

export default store;