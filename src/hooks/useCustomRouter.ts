"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function useCustomRouter() {
  const router = useRouter();
  const params = useSearchParams();

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

  const pushGenresToUrl = (genresId: number[]): void => {
    return router.push(`/filters?genres=${genresId.join(",")}`);
  };

  const pushOrderingToUrl = (ordering: string): void => {
    return router.push(`/filters?ordering=${ordering}`);
  };

  const getUrlParams = (filterCategory: string): number[] => {
    return params.get(filterCategory)?.split(",").map(Number) || [];
  };

  return {
    redirectToReview,
    redirectToGame,
    getUrlParams,
    pushGenresToUrl,
    pushOrderingToUrl,
  };
}
