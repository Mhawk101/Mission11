import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (newItem) => {
    const existingItem = cart.find(item => item.bookId === newItem.bookId);

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.bookId === newItem.bookId
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter(item => item.bookId !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}