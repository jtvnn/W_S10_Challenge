import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";

const exampleReducer = (state = { count: 0 }) => {
  return state;
};

export const resetStore = () =>
  configureStore({
    reducer: {
      example: exampleReducer,
      // add your reducer(s) here
      orders: orderReducer,
    },
    middleware: (getDefault) =>
      getDefault()
        .concat
        // if using RTK Query for your networking: add your middleware here
        // if using Redux Thunk for your networking: you can ignore this
        (),
  });

export const store = resetStore();
