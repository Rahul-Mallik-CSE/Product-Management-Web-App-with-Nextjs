/** @format */

"use client";

import React from "react";
import { Image } from "antd";
import type { ImageViewProps } from "@/types/ProductsTypes";

const ImageView = ({ title, thumbnail, images }: ImageViewProps) => {
  const fallbackImage = "/file.svg";
  const resolvedImages = (
    images && images.length > 0 ? images : [thumbnail]
  ).filter(Boolean) as string[];
  const primaryImage = thumbnail || resolvedImages[0] || fallbackImage;

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="h-80 w-full overflow-hidden rounded-lg bg-muted/40 md:h-95 lg:h-105">
        {/* Display image using antd image */}
        <Image
          src={primaryImage}
          alt={title}
          width="100%"
          height="100%"
          className="h-full! w-full!"
          style={{ objectFit: "contain" }}
          fallback={fallbackImage}
          preview
        />
      </div>
      {/* If the image is more than 1 then show the image gallery  */}
      {resolvedImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {resolvedImages.slice(0, 4).map((img, index) => (
            <div
              key={`${img}-${index}`}
              className="h-20 overflow-hidden rounded-md border border-border bg-muted/30"
            >
              <Image
                src={img}
                alt={`${title}-${index + 1}`}
                width="100%"
                height="100%"
                className="h-full! w-full!"
                style={{ objectFit: "cover" }}
                fallback={fallbackImage}
                preview
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageView;
