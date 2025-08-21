import React from "react";

export default function useAsyncActionWithLoading<K extends string>() {
  const [isLoading, setIsLoading] = React.useState<Record<K, boolean>>(
    {} as Record<K, boolean>
  );

  const executeWithLoading = async <T>(
    key: K,
    callback: () => Promise<T>
  ): Promise<T | null> => {
    setIsLoading((prev) => ({ ...prev, [key]: true }));
    try {
      return await callback();
    } catch (error) {
      console.error(`Error in "${key}" operation:`, error);
      return null;
    } finally {
      setIsLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  return { isLoading, executeWithLoading };
}
