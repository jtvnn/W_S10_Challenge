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

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>

      {isLoading && <div>Loading orders...</div>}
      {error && <div className="failure">Error loading orders</div>}

      <ol>
        {filteredOrders.map((order, idx) => (
          <li key={idx}>
            <div>
              <strong>{order.customer}</strong> ordered a {order.size} pizza
              with:
              <ul>
                <li>
                  {Array.isArray(order.toppings) && order.toppings.length > 0
                    ? order.toppings
                        .map((t) => {
                          const toppingMap = {
                            1: "Pepperoni",
                            2: "Green Peppers",
                            3: "Pineapple",
                            4: "Mushrooms",
                            5: "Ham",
                          };
                    
                          return toppingMap[t] || toppingMap[parseInt(t)] || t;
                        })
                        .join(", ")
                    : "No toppings"}
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          const className = `button-filter${size === "All" ? " active" : ""}`;
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
