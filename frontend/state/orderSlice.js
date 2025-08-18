import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: [],
    filter: 'All',
    loading: false,
    error: null,
};
// make a slice for order
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { addOrder, setFilter } = orderSlice.actions;
export default orderSlice.reducer;