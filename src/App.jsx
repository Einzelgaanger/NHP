import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartContext } from './contexts/CartContext';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import { getAllProducts as getProducts } from './firebase/firestore';
import useAdminAuth from './hooks/useAdminAuth'; // Import the new auth hook
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  
  // Use the new admin auth hook instead of local state
  const { isAdmin, logoutAdmin } = useAdminAuth();
  
  // Initialize admin collection on first load
  useEffect(() => {
    const setupAdmin = async () => {
      // Check if we've already tried to initialize
      const adminInitialized = localStorage.getItem('adminInitialized');
      
      if (!adminInitialized) {
        await initializeAdminCollection();
        localStorage.setItem('adminInitialized', 'true');
      }
    };
    
    setupAdmin();
  }, []);
  
  // Load products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } 
    };
    
    fetchProducts();
  }, []);
  
  // Cart functions
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    }
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
 
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart,
      products
    }}>
      <Router>
        <Navbar isAdmin={isAdmin} onAdminLogout={logoutAdmin} />
        <main className="container mx-auto px-4 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/admin-login" 
              element={
                isAdmin ? 
                <Navigate to="/admin" replace /> : 
                <AdminLoginPage />
              } 
            />
            <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartContext.Provider>
  );
}

export default App;