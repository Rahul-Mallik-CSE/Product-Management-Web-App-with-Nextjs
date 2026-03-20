/** @format */

import type { FormInstance, TablePaginationConfig } from "antd";

/** Basic product fields used in listings and summary views. */
export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
}

/** Detailed product information for product details view. */
export interface ProductDetails extends Product {
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

/** API response shape for paginated products query results. */
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/** Product category metadata used for filtering and categorization. */
export interface Category {
  slug: string;
  name: string;
  url: string;
}

/** Query parameters for fetching products from the API. */
export interface ProductsQueryParams {
  limit: number;
  skip: number;
  q?: string;
  category?: string;
}

/** Redux state shape for products management and filtering. */
export interface ProductsState {
  products: Product[];
  categories: Category[];
  total: number;
  page: number;
  pageSize: number;
  search: string;
  selectedCategory: string | undefined;
  isEditDrawerOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

/** Props for the products table component. */
export interface ProductsTableProps {
  data: Product[];
  loading: boolean;
  pagination: TablePaginationConfig;
  onPaginationChange: (pagination: TablePaginationConfig) => void;
  onView: (id: number) => void;
}

/** Column definition for product table display. */
export interface ProductTableColumnDef {
  title: string;
  key: "title" | "price" | "rating" | "stock" | "category" | "action";
  dataIndex?: keyof Product;
  width?: number;
  ellipsis?: boolean;
}

/** Interface for the skeleton row used in the products table component. */
export interface SkeletonRow {
  key: number;
}

// This is the props interface for the product details component
export interface DetailsProps {
  product: ProductDetails;
}

// This is the props interface for the image view component used in product details
export interface ImageViewProps {
  title: string;
  thumbnail?: string;
  images?: string[];
}

//this is the edit form values interface for the edit product drawer component
export interface EditProductFormValues {
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
}

//this is the props interface for the edit product drawer component
export interface EditDrawerProps {
  open: boolean;
  form: FormInstance<EditProductFormValues>;
  onClose: () => void;
  onSave: () => void;
}
