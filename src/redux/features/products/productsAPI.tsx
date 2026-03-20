/** @format */

import baseApi from "@/redux/api/baseAPI";
import type {
  Category,
  ProductDetails,
  ProductsQueryParams,
  ProductsResponse,
} from "@/types/ProductsTypes";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsQueryParams>({
      query: ({ limit, skip, q, category }) => {
        const trimmedQuery = q?.trim();

        if (trimmedQuery) {
          return {
            url: "/products/search",
            params: { q: trimmedQuery, limit, skip },
          };
        }

        if (category) {
          return {
            url: `/products/category/${category}`,
            params: { limit, skip },
          };
        }

        return {
          url: "/products",
          params: { limit, skip },
        };
      },
      keepUnusedDataFor: 300,
      providesTags: ["Products"],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/products/categories",
      }),
      providesTags: ["Categories"],
    }),
    getProductById: builder.query<ProductDetails, number>({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      keepUnusedDataFor: 300,
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
} = productsApi;
export default productsApi;
