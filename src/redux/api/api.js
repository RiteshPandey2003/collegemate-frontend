import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Product", "User"],

  endpoints: (builder) => ({
    registerProduct: builder.mutation({
      query: (data) => ({
        url: "product/register",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    getPosts: builder.query({
      query: () => ({
        url: "product",
        credentials: "include",
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "user/logout",
        credentials: "include",
      }),
    }),
    getProductsByUserId: builder.query({
      query: ({ productId, userId }) => ({
        url: `product/sellerproduct/${productId}/${userId}`, // Adjusted URL structure
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export default api;
export const {
  useRegisterProductMutation,
  useGetPostsQuery,
  useLogoutQuery,
  useGetProductsByUserIdQuery,
} = api;
