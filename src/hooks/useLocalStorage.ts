export default function useLocalStorage(key: string) {
  const setItem = (cart: unknown) =>
    localStorage.setItem(key, JSON.stringify(cart));

  const getItem = () => {
    try {
      const product = localStorage.getItem(key);
      return product ? JSON.parse(product) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  return { setItem, getItem, removeItem };
}
