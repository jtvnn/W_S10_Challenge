import React from "react";
import PizzaForm from "./PizzaForm";
import OrderList from "./OrderList";

// wrap the app div with provider to connect react to redux store
export default function App() {
  return (
      <div id="app">
        <PizzaForm />
        <OrderList />
      </div>
  );
}
