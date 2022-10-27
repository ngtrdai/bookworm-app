import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import headerReducer from "./header";
import booksReducer from "./books";

const store = configureStore({
    reducer: {
        cartReducer: cartReducer,
        headerReducer: headerReducer,
        booksReducer: booksReducer
    }
});

export default store;