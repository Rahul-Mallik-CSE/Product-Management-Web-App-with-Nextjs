/** @format */

"use client";

import React from "react";
import { Skeleton, Table } from "antd";
import type { TableColumnsType } from "antd";
import type { SkeletonRow } from "@/types/ProductsTypes";
import { productTableColumns } from "./ProductsTable";

const TableSkeleton = () => {
  const columns: TableColumnsType<SkeletonRow> = productTableColumns.map(
    (column) => {
      const isAction = column.key === "action";

      return {
        title: column.title,
        dataIndex: column.dataIndex,
        key: column.key,
        width: column.width,
        render: () =>
          isAction ? (
            <Skeleton.Button active size="small" style={{ width: 90 }} />
          ) : (
            <Skeleton.Input active size="small" style={{ width: 140 }} />
          ),
      };
    },
  );

  const dataSource = Array.from({ length: 12 }, (_, index) => ({
    key: index + 1,
  }));

  return (
    <Table<SkeletonRow>
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      scroll={{ x: 900 }}
    />
  );
};

export default TableSkeleton;
