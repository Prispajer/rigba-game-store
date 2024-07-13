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

  const getUrlParams = (filterCategory: string): number[] => {
    return params.get(filterCategory)?.split(",").map(Number) || [];
  };

  return { redirectToGame, getUrlParams };
}
