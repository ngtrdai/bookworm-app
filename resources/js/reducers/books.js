import {createSlice} from '@reduxjs/toolkit';

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        loading: false,
        error: null
    },
    reducers: {
        fetchBooksRequest(state, action) {
            state.loading = true;
        },
        fetchBooksSuccess(state, action) {
            state.books = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchBooksFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {fetchBooksRequest, fetchBooksSuccess, fetchBooksFailure} = booksSlice.actions;
export default booksSlice.reducer;
