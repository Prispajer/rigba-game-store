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

  const customEncode = (word: string) => {
    return word.replace(/,/g, "%");
  };

  const redirectToGame = (
    name: string,
    callback?: (element: string) => void,
    element?: string
  ): void => {
    router.push(`/product/${name}`);
    if (callback) {
      callback(element || "");
    }
  };

  const redirectToReview = (name: string): void => {
    router.push(`/review/${name}`);
  };

  const updateUrlParams = (newParams: Record<string, string | number[]>) => {
    const currentUrl = new URL(window.location.href);

    console.log(
      currentUrl.searchParams.get("genres"),
      currentUrl.searchParams.get("platforms"),
      currentUrl.searchParams.get("publishers"),
      currentUrl.searchParams.get("stores")
    );
    Object.entries(newParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        currentUrl.searchParams.set(key, customEncode(value.join(",")));
      } else {
        currentUrl.searchParams.set(key, value);
      }
    });

    router.push(currentUrl.pathname + currentUrl.search);
  };

  const pushGenresToUrl = React.useCallback(
    (genresId: string | number[]): void => {
      updateUrlParams({ genres: genresId });
      router.push(`/filters/?genres=${genresId}`);
    },
    []
  );

  const pushOrderingToUrl = React.useCallback((ordering: string): void => {
    updateUrlParams({ ordering });
  }, []);

  return {
    params,
    getUrlParams,
    redirectToReview,
    redirectToGame,
    pushGenresToUrl,
    pushOrderingToUrl,
  };
}
