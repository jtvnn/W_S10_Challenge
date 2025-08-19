import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetOrdersQuery } from "../state/pizzaApi";
import { setFilter } from "../state/orderSlice";

export default function OrderList() {
  const { data: orders = [], isLoading, error } = useGetOrdersQuery();
  const filter = useSelector((state) => state.orders.filter);
  const dispatch = useDispatch();

  const filteredOrders =
    filter === "All" ? orders : orders.filter((order) => order.size === filter);
  console.log('filteredOrders:', filteredOrders);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>

      {isLoading && <div>Loading orders...</div>}
      {error && <div className="failure">Error loading orders</div>}

      <ol>
        {filteredOrders.map((order, idx) => (
          <li key={order.id || idx}>
            {`${order.customer} ordered a size ${order.size} with ${
              Array.isArray(order.toppings) && order.toppings.length > 0
                ? order.toppings.length === 1
                  ? "1 topping"
                  : `${order.toppings.length} toppings`
                : "no toppings"
            }`}
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          const className = `button-filter${size === filter ? " active" : ""}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => dispatch(setFilter(size))}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
