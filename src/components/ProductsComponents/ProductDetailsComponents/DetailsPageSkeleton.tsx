/** @format */

"use client";

import React from "react";
import { Skeleton } from "antd";

const DetailsPageSkeleton = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton.Button active size="small" className="w-9! min-w-9!" />
          <Skeleton.Input active size="small" className="w-56!" />
        </div>
        <Skeleton.Button active size="small" className="w-28!" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <Skeleton.Image
            active
            className="h-full! w-full!"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5 md:p-6">
          <div className="space-y-4">
            <Skeleton.Input active className="w-40!" />
            <Skeleton.Input active className="w-full!" />
            <Skeleton.Input active className="w-24!" />
            <Skeleton.Input active className="w-36!" />
            <Skeleton.Input active className="w-28!" />
            <Skeleton active paragraph={{ rows: 4 }} title={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPageSkeleton;
