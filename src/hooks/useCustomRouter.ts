"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function useCustomRouter() {
  const router = useRouter();
  const params = useSearchParams();

  const getUrlParams = React.useCallback(
    (filterCategory: string): number[] => {
      return params.get(filterCategory)?.split(",").map(Number) || [];
    },
    [params]
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
    [params]
  );

  const redirectToReview = React.useCallback(
    (name: string): void => {
      router.push(`/review/${name}`);
    },
    [params]
  );

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
    [params]
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
    [params]
  );

  const pushDataToUrl = React.useCallback(
    (data: Record<string, string | number[]>): void => {
      updateUrlParams(data);
    },
    [params]
  );

  return {
    params,
    getUrlParams,
    redirectToReview,
    redirectToGame,
    redirectToFilters,
    pushDataToUrl,
  };
}
