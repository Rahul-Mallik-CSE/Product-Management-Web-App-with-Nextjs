/** @format */

"use client";

import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import type {
  Product,
  ProductTableColumnDef,
  ProductsTableProps,
} from "@/types/ProductsTypes";
import styles from "@/scssstyle/CommonStyles.module.scss";

/** This is the product table columns definition */
export const productTableColumns: ProductTableColumnDef[] = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Action",
    key: "action",
    width: 120,
  },
];

const ProductsTable = ({
  data,
  loading,
  pagination,
  onPaginationChange,
  onView,
}: ProductsTableProps) => {
  const columns: TableColumnsType<Product> = productTableColumns.map(
    (column) => {
      if (column.key === "price") {
        return {
          ...column,
          render: (value: number) => `$${value.toFixed(2)}`,
        };
      }

      if (column.key === "rating") {
        return {
          ...column,
          render: (value: number) => value.toFixed(2),
        };
      }

      if (column.key === "category") {
        return {
          ...column,
          render: (value: string) => value.replace(/-/g, " "),
        };
      }
      // This is the view button design with scss styles
      if (column.key === "action") {
        return {
          ...column,
          render: (_: unknown, record: Product) => (
            <Space>
              <Button
                type="default"
                icon={<EyeOutlined />}
                onClick={() => onView(record.id)}
                className={styles.productViewButton}
              >
                View
              </Button>
            </Space>
          ),
        };
      }

      return column;
    },
  );

  return (
    // designed the table using antd table component with pagination
    <Table<Product>
      className={styles.paginationButton}
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={pagination}
      onChange={onPaginationChange}
      scroll={{ x: 900 }}
    />
  );
};

export default ProductsTable;
