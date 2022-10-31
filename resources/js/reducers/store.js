import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import headerReducer from "./header";
import booksReducer from "./books";
import filterBookReducer from "./filterBook";
const store = configureStore({
    reducer: {
        cartReducer: cartReducer,
        headerReducer: headerReducer,
        booksReducer: booksReducer,
        filterBookReducer: filterBookReducer
    }
});

export default store;