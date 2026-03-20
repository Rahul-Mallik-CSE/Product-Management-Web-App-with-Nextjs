/** @format */

"use client";

import React from "react";
import { StarFilled } from "@ant-design/icons";
import type { DetailsProps } from "@/types/ProductsTypes";
import { Title } from "@/components/StyledComponents/Title";

const Details = ({ product }: DetailsProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6">
      <div className="space-y-1 md:space-y-2 lg:space-y-4">
        <div>
          <p className="text-sm md:text-base lg:text-xl font-medium text-secondary">
            Product Information
          </p>
          {/* use the title styled component here */}
          <Title>{product.title}</Title>
        </div>
        <div className="flex items-center gap-2 text-base md:text-lg lg:text-xl font-medium text-primary">
          <StarFilled className="text-[#EAB308]" />
          <span>{product.rating.toFixed(1)}</span>
        </div>

        <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-none text-[#2781E3]">
          ${product.price.toFixed(2)}
        </p>

        <div className="text-base md:text-lg lg:text-xl text-primary">
          <span className="font-medium">Stock: </span>
          <span className="font-semibold">{product.stock} units</span>
        </div>

        <hr className="border-border" />

        <div className="lg:space-y-2">
          <h4 className="text-xl md:text-xl font-semibold text-primary">
            Description
          </h4>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-secondary">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
