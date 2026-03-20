/** @format */

"use client";

import React from "react";
import { Container } from "@/components/StyledComponents/Container";
import ProductsContainer from "@/components/ProductsComponents/ProductsContainer";
const ProductsPage = () => {
  return (
    <Container>
      {/* called the products container component here so that it can be rendered on the products page */}
      <ProductsContainer />
    </Container>
  );
};

export default ProductsPage;
