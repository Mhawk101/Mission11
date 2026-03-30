import { createContext, useContext, useState, ReactNode } from 'react';
import type { CartContextValue, CartItem } from '../types';

// Create a context object to store cart data
const CartContext = createContext<CartContextValue | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

// CartProvider component - wraps the app and provides cart data to all children
export function CartProvider({ children }: CartProviderProps) {
  // State to hold all items in the cart
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addToCart = (newItem: CartItem) => {
    // Check if this book is already in the cart
    const existingItem = cart.find((item) => item.bookId === newItem.bookId);

    // If the item already exists, increase its quantity
    if (existingItem) {
      // Map through cart and update the matching item's quantity
      const updatedCart = cart.map((item) =>
        item.bookId === newItem.bookId
          ? { ...item, quantity: item.quantity + newItem.quantity }  // Add quantities together
          : item  // Keep other items unchanged
      );
      setCart(updatedCart);
    } else {
      // If item doesn't exist, add it as a new item to the cart
      setCart([...cart, newItem]);
    }
  };

  // Function to remove an item from the cart by bookId
  const removeFromCart = (bookId: number) => {
    // Keep only items that DON'T match the bookId being removed
    setCart(cart.filter((item) => item.bookId !== bookId));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Return the provider that wraps children and shares cart data
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to safely access cart data from any component
export function useCart(): CartContextValue {
  // Get the cart context
  const context = useContext(CartContext);

  // If context is undefined, user is not inside CartProvider - throw error
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  // Return the cart data and functions
  return context;
}
