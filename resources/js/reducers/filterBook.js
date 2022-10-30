import { createSlice } from "@reduxjs/toolkit";

const filterBookSlice = createSlice({
    name: 'filterBook',
    initialState: {
        params: {
            category: null,
            author: null,
            rating: null,
            sort_by: "sale",
            no_items: 15,
            page: 1
        },
        pagination: {
            current_page: 1,
            total_pages: 1,
            total_items: 0
        }
    },
    reducers: {
        setCategory(state, action) {
            state.params.category = action.payload;
        },
        setAuthor(state, action) {
            state.params.author = action.payload;
        },
        setRating(state, action) {
            state.params.rating = action.payload;
        },
        setSortBy(state, action) {
            state.params.sort_by = action.payload;
        },
        setNoItems(state, action) {
            state.params.no_items = action.payload;
        },
        setPage(state, action) {
            state.params.page = action.payload;
        },
        setPagination(state, action) {
            state.pagination = action.payload;
        },
        resetFilter(state) {
            state.params = {
                category: null,
                author: null,
                rating: null,
                sort_by: "onsale",
                no_items: 15,
                page: 1
            };
            state.pagination = {
                current_page: 1,
                total_pages: 1,
                total_items: 0
            };
        }
    }
});

export const {setCategory, setAuthor, setRating, setSortBy, setNoItems, setPage, setPagination, resetFilter} = filterBookSlice.actions;
export default filterBookSlice.reducer;
