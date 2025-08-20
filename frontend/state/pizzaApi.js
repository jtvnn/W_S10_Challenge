import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// define API slice for pizza orders
export const pizzaApi = createApi({
  reducerPath: "pizzaApi", //
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9009/api/pizza/" }), // base URL for API requests
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({ // service to GET
      query: () => "history",
      providesTags: ["Orders"],
    }),
    addOrder: builder.mutation({ // service to POST
      query: (newOrder) => ({
        url: "order",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useAddOrderMutation } = pizzaApi;
