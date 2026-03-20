/** @format */

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/StyledComponents/Container";

const ProductDetailsPage = () => {
  const params = useParams<{ "product-id": string }>();
  const productId = Number(params?.["product-id"]);

  return (
    <Container>
      <h1>Product Details</h1>
    </Container>
  );
};

export default ProductDetailsPage;
