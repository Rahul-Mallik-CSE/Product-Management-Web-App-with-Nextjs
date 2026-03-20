/** @format */

"use client";

import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Result } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import styles from "@/scssstyle/CommonStyles.module.scss";

const NotFoundPage = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    document.body.classList.add("hide-layout");
    return () => {
      document.body.classList.remove("hide-layout");
    };
  }, []);

  return (
    <div className="not-found-page flex items-center justify-center min-h-screen bg-background">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="default"
            icon={<HomeOutlined />}
            onClick={() => router.push("/products")}
            className={styles.productViewButton}
            size="large"
          >
            Back to Products
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
