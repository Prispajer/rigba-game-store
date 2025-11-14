import React from "react"

export default async function executeWithLoading<
  T,
  K extends Record<string, boolean>
>(
  key: keyof K,
  setLoading: React.Dispatch<React.SetStateAction<K>>,
  callback: () => Promise<T>
): Promise<T | undefined> {
  setLoading((prev) => ({ ...prev, [key]: true }));
  try {
    await callback();
  } catch (error) {
    console.error(`Error in "${key.toString()}" operation:`, error);
    return undefined;
  } finally {
    setLoading((prev) => ({ ...prev, [key]: false }));
  }
}
