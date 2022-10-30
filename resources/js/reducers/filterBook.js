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
        params_detail:{
            category: null,
            author: null,
            rating: null
        },
        pagination: {
            current_page: 1,
            last_page: 1,
            from: 1,
            to: 1,
            total_items: 1
        }
    },
    reducers: {
        setCategory(state, action) {
            state.params.category = action.payload.id;
            state.params_detail.category = action.payload.name;
            state.params.page = 1;
        },
        setAuthor(state, action) {
            state.params.author = action.payload.id;
            state.params_detail.author = action.payload.name;
            state.params.page = 1;
        },
        setRating(state, action) {
            state.params.rating = action.payload;
            state.params_detail.rating = action.payload;
            state.params.page = 1;
        },
        setSortBy(state, action) {
            state.params.sort_by = action.payload;
            state.params.page = 1;
        },
        setNoItems(state, action) {
            state.params.no_items = action.payload;
            state.params.page = 1;
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
            state.params_detail = {
                category: null,
                author: null,
                rating: null
            };
            state.pagination = {
                current_page: 1,
                total_pages: 1,
                last_page: 0
            };
        }
    }
});

export const {setCategory, setAuthor, setRating, setSortBy, setNoItems, setPage, setPagination, resetFilter} = filterBookSlice.actions;
export default filterBookSlice.reducer;
