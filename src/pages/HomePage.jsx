import React, { useState, useEffect } from 'react';
import UserPanel from '../components/user/UserPanel';
import UserNavbar from '../components/user/UserNavbar';
import Footer from '../components/common/Footer';
import Loading from '../components/common/Loading';
import { CartProvider } from '../contexts/CartContext';
import { getAllProducts as getProducts } from '../firebase/firestore';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inline CSS styles
  const styles = `
    /* Main Layout Styles */
    .home-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #fcfaf7;
      font-family: 'Segoe UI', 'Roboto', sans-serif;
    }

    .main-content {
      flex: 1;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Hero Section Styles */
    .hero-section {
      background: linear-gradient(135deg, #8a5a44 0%, #5d4037 100%);
      color: white;
      padding: 80px 30px;
      margin-bottom: 40px;
      border-radius: 8px;
      text-align: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
      opacity: 0.6;
      z-index: 0;
    }

    .hero-section h1 {
      font-size: 3rem;
      margin-bottom: 15px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      position: relative;
      z-index: 1;
    }

    .hero-section p {
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      opacity: 0.9;
    }

    /* Error Message Styles */
    .error-message {
      background-color: #fff3f3;
      border-left: 4px solid #e74c3c;
      color: #c0392b;
      padding: 16px 20px;
      margin: 30px 0;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      font-size: 1rem;
      line-height: 1.5;
    }

    /* Animation for content load */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .main-content > * {
      animation: fadeIn 0.6s ease-out forwards;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
      .hero-section {
        padding: 50px 20px;
      }
      
      .hero-section h1 {
        font-size: 2.2rem;
      }
      
      .hero-section p {
        font-size: 1rem;
      }
    }

    @media (max-width: 480px) {
      .hero-section h1 {
        font-size: 1.8rem;
      }
      
      .main-content {
        padding: 0 15px;
      }
    }
  `;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProducts();
        // Filter to only show available products
        const availableProducts = productData.filter(product => product.available);
        setProducts(availableProducts);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <CartProvider>
      <style>{styles}</style>
      <div className="home-page">
        <UserNavbar />
        <div className="main-content">
          <div className="hero-section">
            <h1>Natural Hair Products</h1>
            <p>Discover the best natural products for your hair</p>
          </div>
          
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <UserPanel products={products} />
          )}
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default HomePage;