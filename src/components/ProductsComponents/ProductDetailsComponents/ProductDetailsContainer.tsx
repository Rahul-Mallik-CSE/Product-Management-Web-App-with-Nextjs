/** @format */

"use client";

import React from "react";
import { Alert, Button, Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetProductByIdQuery } from "@/redux/features/products/productsAPI";
import { setEditDrawerOpen } from "@/redux/features/products/productsSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import type {
  EditProductFormValues,
  ProductDetails,
  ProductDetailsContainerProps,
} from "@/types/ProductsTypes";
import Details from "./Details";
import EditDrawer from "./EditDrawer";
import ImageView from "./ImageView";
import DetailsPageSkeleton from "./DetailsPageSkeleton";
import styles from "@/scssstyle/CommonStyles.module.scss";
import { Title } from "@/components/StyledComponents/Title";

const ProductDetailsContainer = ({
  productId,
}: ProductDetailsContainerProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<EditProductFormValues>();

  const isEditDrawerOpen = useSelector(
    (state: RootState) => state.products.isEditDrawerOpen,
  );

  const { data, isLoading, isFetching, isError, error } =
    useGetProductByIdQuery(productId, {
      skip: Number.isNaN(productId) || productId <= 0,
    });

  React.useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        description: data.description,
        price: data.price,
        rating: data.rating,
        stock: data.stock,
      });
    }
  }, [data, form]);

  const product = data as ProductDetails | undefined;

  const handleOpenDrawer = () => {
    dispatch(setEditDrawerOpen(true));
  };

  const handleCloseDrawer = () => {
    dispatch(setEditDrawerOpen(false));
  };

  const handleSave = async () => {
    try {
      await form.validateFields();
      messageApi.success("Frontend-only edit validated successfully.");
      dispatch(setEditDrawerOpen(false));
    } catch (errorInfo: unknown) {
      if (
        typeof errorInfo === "object" &&
        errorInfo !== null &&
        "errorFields" in errorInfo &&
        Array.isArray((errorInfo as { errorFields?: unknown[] }).errorFields)
      ) {
        const fields = (
          errorInfo as { errorFields: Array<{ errors?: string[] }> }
        ).errorFields;
        const validationMessages = fields
          .flatMap((field) => field.errors ?? [])
          .filter(Boolean);

        messageApi.error(
          validationMessages.length > 0
            ? validationMessages[0]
            : "Please fix validation errors before saving.",
        );
        return;
      }

      messageApi.error("Please fix validation errors before saving.");
    }
  };

  if (isLoading || isFetching) {
    return <DetailsPageSkeleton />;
  }

  if (isError || !product) {
    const errorMessage =
      typeof error === "object" && error !== null && "status" in error
        ? `Failed to load product details (status: ${String(error.status)})`
        : "Failed to load product details.";

    return <Alert type="error" showIcon message={errorMessage} />;
  }

  return (
    <div className="w-full space-y-6">
      {contextHolder}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/products")}
            className={styles.productViewButton}
            aria-label="Back to products"
          />
          <Title>Product Details</Title>
        </div>
        <Button
          type="default"
          onClick={handleOpenDrawer}
          className={styles.productViewButton}
        >
          Edit Product
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ImageView
          title={product.title}
          thumbnail={product.thumbnail}
          images={product.images}
        />
        <Details product={product} />
      </div>

      <EditDrawer
        open={isEditDrawerOpen}
        form={form}
        onClose={handleCloseDrawer}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProductDetailsContainer;
