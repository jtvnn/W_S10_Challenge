import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filter: 'All',
};
// make a slice for order
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { setFilter } = orderSlice.actions;
export default orderSlice.reducer;