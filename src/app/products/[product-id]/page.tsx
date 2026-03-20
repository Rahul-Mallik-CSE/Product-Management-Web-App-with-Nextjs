/** @format */

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/StyledComponents/Container";
import ProductDetailsContainer from "@/components/ProductsComponents/ProductDetailsComponents/ProductDetailsContainer";

const ProductDetailsPage = () => {
  const params = useParams<{ "product-id": string }>();
  const productId = Number(params?.["product-id"]);

  return (
    <Container>
      {/* called the details page with product id */}
      <ProductDetailsContainer productId={productId} />
    </Container>
  );
};

export default ProductDetailsPage;
