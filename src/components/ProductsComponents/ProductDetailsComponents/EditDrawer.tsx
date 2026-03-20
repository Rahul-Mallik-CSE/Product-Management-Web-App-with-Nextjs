/** @format */

"use client";

import React from "react";
import { Button, Drawer, Form, Input, InputNumber, Space } from "antd";
import type {
  EditDrawerProps,
  EditProductFormValues,
} from "@/types/ProductsTypes";
import styles from "@/scssstyle/CommonStyles.module.scss";

const EditDrawer = ({ open, form, onClose, onSave }: EditDrawerProps) => {
  return (
    <Drawer
      title="Edit Product"
      size={520}
      open={open}
      onClose={onClose}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose} className={styles.productViewButton}>
            Cancel
          </Button>
          <Button onClick={onSave} className={styles.SaveButton}>
            Save
          </Button>
        </Space>
      }
    >
      <Form<EditProductFormValues> form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Title is required" },
            { min: 3, message: "Title must be at least 3 characters" },
            {
              validator: async (_, value) => {
                if (typeof value !== "string") return;
                if (!/[a-zA-Z]/.test(value)) {
                  throw new Error("Title must include letters");
                }
              },
            },
          ]}
        >
          <Input placeholder="Enter product title" maxLength={80} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Description is required" },
            {
              min: 20,
              message: "Description must be at least 20 characters",
            },
            {
              validator: async (_, value) => {
                if (typeof value !== "string") return;
                const words = value.trim().split(/\s+/).filter(Boolean);
                if (words.length < 4) {
                  throw new Error(
                    "Description should contain at least 4 words",
                  );
                }
              },
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Price is required" },
            {
              validator: async (_, value) => {
                if (typeof value !== "number") return;
                if (value < 0) {
                  throw new Error("Price cannot be negative");
                }
              },
            },
          ]}
        >
          <InputNumber className="w-full!" step={0.01} />
        </Form.Item>

        <Form.Item
          label="Rating"
          name="rating"
          rules={[
            { required: true, message: "Rating is required" },
            {
              validator: async (_, value) => {
                if (typeof value !== "number") return;
                if (value < 0) {
                  throw new Error("Rating cannot be negative");
                }
              },
            },
            {
              validator: async (_, value) => {
                if (typeof value !== "number") return;
                if (value > 5) {
                  throw new Error("Rating cannot be more than 5");
                }
              },
            },
          ]}
        >
          <InputNumber className="w-full!" step={0.1} />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            { required: true, message: "Stock is required" },
            {
              validator: async (_, value) => {
                if (typeof value !== "number") return;
                if (value < 0) {
                  throw new Error("Stock cannot be negative");
                }
              },
            },
            {
              validator: async (_, value) => {
                if (typeof value !== "number") return;
                if (!Number.isInteger(value)) {
                  throw new Error("Stock must be a whole number");
                }
              },
            },
          ]}
        >
          <InputNumber className="w-full!" step={1} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditDrawer;
