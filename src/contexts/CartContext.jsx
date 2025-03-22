import React, { createContext, useContext, useState } from 'react';

/**
 * Cart Context
 * Provides state and functions for managing the shopping cart throughout the application
 */
export const CartContext = createContext({
  cart: [],                    // Array of cart items with product info and quantity
  addToCart: () => {},         // Function to add product to cart
  removeFromCart: () => {},    // Function to remove product from cart
  updateQuantity: () => {},    // Function to update quantity directly
  clearCart: () => {},         // Function to empty the cart
  products: [],                // Array of all available products
  getCartTotal: () => 0,       // Function to calculate total price
  getCartItemCount: () => 0    // Function to get total number of items
});

/**
 * Custom hook to use the cart context
 * @returns {Object} Cart context value with cart state and methods
 * @throws {Error} If used outside of CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

/**
 * Cart Provider component
 * Wraps around components that need access to cart functionality
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const CartProvider = ({ children }) => {
  // Cart state contains array of products with quantities
  const [cart, setCart] = useState([]);
  
  // Products state for all available products
  const [products, setProducts] = useState([]);
  
  /**
   * Add a product to the cart
   * If product already exists, increases quantity by 1
   * @param {Object} product - The product to add
   */
  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Item exists, update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // New item, add to cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  /**
   * Remove a product from the cart
   * Decreases quantity by 1, or removes entirely if quantity becomes 0
   * @param {string} productId - ID of the product to remove
   */
  const removeFromCart = (productId) => {
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      
      if (updatedCart[existingItemIndex].quantity > 1) {
        // Decrease quantity if more than 1
        updatedCart[existingItemIndex].quantity -= 1;
        setCart(updatedCart);
      } else {
        // Remove item completely if quantity is 1
        setCart(cart.filter(item => item.id !== productId));
      }
    }
  };
  
  /**
   * Update quantity of a product directly
   * Removes product if quantity is set to 0 or less
   * @param {string} productId - ID of the product to update
   * @param {number} quantity - New quantity value
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      // Remove item if quantity is zero or negative
      setCart(cart.filter(item => item.id !== productId));
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId
        ? { ...item, quantity }
        : item
    ));
  };
  
  /**
   * Clear all items from the cart
   */
  const clearCart = () => {
    setCart([]);
  };
  
  /**
   * Calculate total price of all items in cart
   * @returns {number} Total price
   */
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  /**
   * Get total count of all items in cart
   * @returns {number} Total item count
   */
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  
  // Context value object with all cart state and functions
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    products,
    setProducts,
    getCartTotal,
    getCartItemCount
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;