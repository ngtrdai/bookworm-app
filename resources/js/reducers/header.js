import {createSlice} from '@reduxjs/toolkit';

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        itemActive: ''
    },
    reducers: {
        setItemActive(state, action) {
            state.itemActive = action.payload;
        }
    }
});

export const {setItemActive} = headerSlice.actions;
export default headerSlice.reducer;