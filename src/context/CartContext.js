import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Add to cart (increment quantity if already exists)
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // ✅ Remove one quantity from cart, or remove item if quantity = 1
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const item = prev.find(i => i.id === productId);
      if (!item) return prev;

      if (item.quantity === 1) {
        return prev.filter(i => i.id !== productId);
      }

      return prev.map(i =>
        i.id === productId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    });
  };

  // ✅ Optional: Clear item entirely
  const removeItemCompletely = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      removeItemCompletely
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);