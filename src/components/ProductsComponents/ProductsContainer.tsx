/** @format */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Input, Select, Space, message } from "antd";
import type { TablePaginationConfig } from "antd";

import { Title } from "@/components/StyledComponents/Title";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/features/products/productsAPI";
import type { Category } from "@/types/ProductsTypes";
import {
  setPagination,
  setSearch,
  setSelectedCategory,
} from "@/redux/features/products/productsSlice";
import ProductsTable from "./ProductsTable";
import TableSkeleton from "./TableSkeleton";
import styles from "@/scssstyle/CommonStyles.module.scss";

const ProductsContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [messageApi, contextHolder] = message.useMessage();

  const { page, pageSize, search, selectedCategory } = useSelector(
    (state: RootState) => state.products,
  );

  const queryParams = {
    limit: pageSize,
    skip: (page - 1) * pageSize,
    q: search || undefined,
    category: search ? undefined : selectedCategory,
  };

  const {
    data: productsData,
    isFetching,
    isLoading: isProductsLoading,
    isError,
  } = useGetProductsQuery(queryParams);
  const { data: categoriesData } = useGetCategoriesQuery();

  React.useEffect(() => {
    if (isError) {
      messageApi.error("Failed to fetch products");
    }
  }, [isError, messageApi]);

  const handleSearch = (value: string) => {
    if (value.trim()) {
      dispatch(setSelectedCategory(undefined));
    }
    dispatch(setSearch(value.trim()));
  };

  const handleCategoryChange = (value: string | undefined) => {
    dispatch(setSearch(""));
    dispatch(setSelectedCategory(value && value !== "all" ? value : undefined));
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    dispatch(
      setPagination({
        page: pagination.current ?? 1,
        pageSize: pagination.pageSize ?? pageSize,
      }),
    );
  };

  const categoryOptions = [
    { label: "All", value: "all" },
    ...(categoriesData ?? []).map((category: Category) => ({
      label: category.name,
      value: category.slug,
    })),
  ];

  const isTableLoading = isProductsLoading || isFetching;
  const tableData = productsData?.products ?? [];
  const tableTotal = productsData?.total ?? 0;

  return (
    <div className="w-full space-y-4">
      {/* This is the antd message component used to show error message when the products failed to load */}
      {contextHolder}

      {/* This is the title component which will show the title of the page */}
      <Title>Products List</Title>

      {/* This is the search and filter section */}
      <div className="flex w-full justify-end">
        <Space wrap>
          <Input.Search
            allowClear
            placeholder="Search products"
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            onSearch={handleSearch}
            style={{ width: 260 }}
            className={styles.searchFieldView}
          />

          <Select
            allowClear
            placeholder="Select category"
            options={categoryOptions}
            value={selectedCategory ?? "all"}
            onChange={handleCategoryChange}
            style={{ width: 220 }}
            className={styles.productViewButton}
          />
        </Space>
      </div>

      {isTableLoading ? (
        //This is the Table Skeleton component which will show the skeleton loading state when the products are loading
        <TableSkeleton />
      ) : (
        //This is the main table design component which will show the products in a table format with pagination and sorting functionality. It also has a view button which will navigate to the product details page when clicked.
        <ProductsTable
          data={tableData}
          loading={false}
          onView={(id) => router.push(`/products/${id}`)}
          onPaginationChange={handleTableChange}
          pagination={{
            current: page,
            pageSize,
            total: tableTotal,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
            placement: ["bottomEnd"],
            showTotal: (value) => `Total ${value} products`,
          }}
        />
      )}
    </div>
  );
};

export default ProductsContainer;
