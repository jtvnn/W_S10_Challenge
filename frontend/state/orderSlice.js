import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "All",
};
// make a slice for orders
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: { // my reducer updates the state directly
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = orderSlice.actions;
export default orderSlice.reducer;
