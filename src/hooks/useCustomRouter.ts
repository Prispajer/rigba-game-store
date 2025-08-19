"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function useCustomRouter() {
  const router = useRouter();
  const url = useSearchParams();

  const getUrlParams = React.useCallback(
    (filterCategory: string): number[] => {
      return url?.get(filterCategory)?.split(",").map(Number) || [];
    },
    [url]
  );

  const redirectToGame = React.useCallback(
    (
      name: string,
      callback?: (element: string) => void,
      element?: string
    ): void => {
      router.push(`/product/${name}`);
      if (callback) {
        callback(element || "");
      }
    },
    [url]
  );

  const redirectToKey = React.useCallback(
    (key: string): void => {
      router.push(`/checkout/redeem/${key}`);
    },
    [url]
  );

  const redirectToOrder = React.useCallback(
    (order: string): void => {
      router.push(`/order/${order}`);
    },
    [url]
  );

  const redirectToReview = React.useCallback(
    (name: string): void => {
      router.push(`/review/${name}`);
    },
    [url]
  );

  const redirectToCheckout = React.useCallback((): void => {
    router.push("/checkout");
  }, [url]);

  const redirectToFilters = React.useCallback(
    (data: number[] | string): void => {
      if (typeof data === "string") {
        updateUrlParams({ ordering: data });
        router.push(`/filters/?ordering=${data}`);
      } else {
        updateUrlParams({ genres: data });
        router.push(`/filters/?genres=${data}`);
      }
    },
    [url]
  );

  const updateUrlParams = React.useCallback(
    (newParams: Record<string, string | number[]>) => {
      const currentUrl = new URL(window.location.href);

      Object.entries(newParams).forEach(([key, value]) => {
        if ((Array.isArray(value) && value.length === 0) || value === "") {
          currentUrl.searchParams.delete(key);
        } else if (typeof value === "string") {
          currentUrl.searchParams.set(key, value);
        } else {
          currentUrl.searchParams.set(key, value.join(","));
        }
      });

      router.push(currentUrl.pathname + currentUrl.search);
    },
    [url]
  );

  const pushDataToUrl = React.useCallback(
    (data: Record<string, string | number[]>): void => {
      updateUrlParams(data);
    },
    [url]
  );

  return {
    url,
    getUrlParams,
    redirectToReview,
    redirectToGame,
    redirectToKey,
    redirectToOrder,
    redirectToCheckout,
    redirectToFilters,
    pushDataToUrl,
  };
}
