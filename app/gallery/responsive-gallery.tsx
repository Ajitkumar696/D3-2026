"use client";

import React, { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import type { Product } from "@/lib/products";

const LazySpiralGallery = dynamic(
  () => import("./spiral-gallery").then((mod) => mod.SpiralGallery),
  { ssr: false }
);

const LazyGridGallery = dynamic(
  () => import("./grid-gallery").then((mod) => mod.GridGallery),
  { ssr: false }
);

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(max-width: 767px)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function getServerSnapshot() {
  return false;
}

export function ResponsiveGallery({
  products,
}: {
  products: Product[];
}) {
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return isMobile ? (
    <LazyGridGallery products={products} />
  ) : (
    <LazySpiralGallery products={products} />
  );
}