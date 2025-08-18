import { configureStore } from "@reduxjs/toolkit";
import { pizzaApi } from "./pizzaApi";
import orderReducer from "./orderSlice";

const exampleReducer = (state = { count: 0 }) => {
  return state;
};

const store =
  configureStore({
    reducer: {
      example: exampleReducer,
      // add your reducer(s) here
      orders: orderReducer,
    },
    middleware: (getDefault) =>
      getDefault()
        .concat(pizzaApi.middleware),
        // if using RTK Query for your networking: add your middleware here
        // if using Redux Thunk for your networking: you can ignore this
        
  });


export default store;