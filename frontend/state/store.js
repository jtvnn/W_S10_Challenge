import { configureStore } from "@reduxjs/toolkit";
import { pizzaApi } from "./pizzaApi";
import orderReducer from "./orderSlice";

const exampleReducer = (state = { count: 0 }) => state;

export function resetStore() {
  return configureStore({
    reducer: {
      example: exampleReducer,
      [pizzaApi.reducerPath]: pizzaApi.reducer,
      orders: orderReducer,
    },
    middleware: (getDefault) =>
      getDefault().concat(pizzaApi.middleware),
  });
}

const store = resetStore();
export default store;