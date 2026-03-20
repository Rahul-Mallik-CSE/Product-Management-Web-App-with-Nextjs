/** @format */
"use client";
import LoadingPage from "@/components/CommonComponents/LoadingPage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/products");
  }, [router]);

  return <LoadingPage />;
}
