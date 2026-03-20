/** @format */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import productsApi from "@/redux/features/products/productsAPI";
import type { ProductsState } from "@/types/ProductsTypes";

const initialState: ProductsState = {
  products: [],
  categories: [],
  total: 0,
  page: 1,
  pageSize: 10,
  search: "",
  selectedCategory: undefined,
  isEditDrawerOpen: false,
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setSelectedCategory: (state, action: PayloadAction<string | undefined>) => {
      state.selectedCategory = action.payload;
      state.page = 1;
    },
    setPagination: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>,
    ) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setEditDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditDrawerOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(productsApi.endpoints.getProducts.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        productsApi.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.products = action.payload.products;
          state.total = action.payload.total;
        },
      )
      .addMatcher(
        productsApi.endpoints.getProducts.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message ?? "Failed to fetch products";
        },
      )
      .addMatcher(
        productsApi.endpoints.getCategories.matchFulfilled,
        (state, action) => {
          state.categories = action.payload;
        },
      );
  },
});

export const {
  setSearch,
  setSelectedCategory,
  setPagination,
  setEditDrawerOpen,
} = productsSlice.actions;

export default productsSlice.reducer;
