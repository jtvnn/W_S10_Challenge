import { configureStore } from "@reduxjs/toolkit";
import { pizzaApi } from "./pizzaApi";
import orderReducer from "./orderSlice";

const exampleReducer = (state = { count: 0 }) => state;

// create the store
export function resetStore() {
  const store = configureStore({
    reducer: { // maps state keys to respective reducers
      // add reducers here
      example: exampleReducer,
      [pizzaApi.reducerPath]: pizzaApi.reducer, // RTK Query reducer
      orders: orderReducer, // my order slice reducer 
    },
    middleware: (getDefault) => getDefault().concat(pizzaApi.middleware), // add RTK Query middleware
  });
  return store;
}

// create the store when the app starts
const store = resetStore();
export default store;
