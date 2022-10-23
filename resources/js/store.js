import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import headerReducer from "./reducers/header";
import booksReducer from "./reducers/books";

const store = configureStore({
    reducer: {
        cartReducer: cartReducer,
        headerReducer: headerReducer,
        booksReducer: booksReducer
    }
});

export default store;