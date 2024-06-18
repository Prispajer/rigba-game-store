export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export default function useLocalStorage(key: string) {
  const setItem = (cart: Product[]) =>
    localStorage.setItem(key, JSON.stringify(cart));

  const getItem = (): Product[] | undefined => {
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

  const removeProduct = (productId: number) => {
    const currentCart = getItem() || [];
    const updatedCart = currentCart.filter((item) => item.id !== productId);
    setItem(updatedCart);
  };

  const increaseQuantity = (productId: number) => {
    const currentCart = getItem() || [];
    const existingProductIndex = currentCart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      currentCart[existingProductIndex].quantity += 1;
      setItem(currentCart);
    }
  };

  const decreaseQuantity = (productId: number) => {
    const currentCart = getItem() || [];
    const existingProductIndex = currentCart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      const updatedQuantity = currentCart[existingProductIndex].quantity - 1;
      if (updatedQuantity > 0) {
        currentCart[existingProductIndex].quantity = updatedQuantity;
      } else {
        currentCart.splice(existingProductIndex, 1);
      }
      setItem(currentCart);
    }
  };

  const addProduct = (newProduct: Product) => {
    const currentCart = getItem() || [];
    const existingProductIndex = currentCart.findIndex(
      (item) => item.id === newProduct.id
    );

    if (existingProductIndex !== -1) {
      currentCart[existingProductIndex].quantity += 1;
    } else {
      newProduct.quantity = 1;
      currentCart.push(newProduct);
    }

    setItem(currentCart);
  };

  return {
    setItem,
    getItem,
    removeItem,
    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
  };
}
