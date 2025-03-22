import React, { useState, useEffect } from 'react';
import UserPanel from '../components/user/UserPanel';
import UserNavbar from '../components/user/UserNavbar';
import Loading from '../components/common/Loading';
import { CartProvider } from '../contexts/CartContext';
import { getAllProducts as getProducts } from '../firebase/firestore';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inline CSS styles with improved color scheme for natural hair oil website
  const styles = `
    /* Main Layout Styles */
    .home-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f8f5f1;
      font-family: 'Montserrat', 'Segoe UI', 'Roboto', sans-serif;
    }

    .main-content {
      flex: 1;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 20px;
    }

    /* Hero Section Styles */
    .hero-section {
      background: linear-gradient(135deg, #006241 0%, #004d33 100%);
      color: white;
      padding: 100px 40px;
      margin-bottom: 60px;
      border-radius: 16px;
      text-align: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 77, 51, 0.2);
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E");
      opacity: 0.7;
      z-index: 0;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 50%, rgba(0, 77, 51, 0) 0%, rgba(0, 77, 51, 0.6) 100%);
      z-index: 1;
    }

    .hero-content {
      position: relative;
      z-index: 2;
    }

    .hero-section h1 {
      font-size: 3.5rem;
      margin-bottom: 24px;
      font-weight: 800;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      letter-spacing: -0.5px;
      line-height: 1.2;
    }

    .hero-section p {
      font-size: 1.4rem;
      max-width: 650px;
      margin: 0 auto 30px;
      line-height: 1.6;
      font-weight: 300;
      opacity: 0.95;
    }

    .hero-cta {
      display: inline-block;
      background-color: #f0c14b;
      color: #111;
      padding: 16px 32px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 1.1rem;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
      margin-top: 10px;
    }

    .hero-cta:hover {
      background-color: #e6b93b;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    /* Features Section */
    .features-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-bottom: 60px;
    }

    .feature-card {
      background-color: white;
      border-radius: 12px;
      padding: 30px 25px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      background-color: rgba(0, 77, 51, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      color: #006241;
    }

    .feature-card h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: #333;
    }

    .feature-card p {
      color: #666;
      line-height: 1.6;
    }

    /* Product Section */
    .products-section {
      margin-top: 40px;
    }

    .section-title {
      text-align: center;
      margin-bottom: 40px;
      font-size: 2.2rem;
      font-weight: 700;
      color: #333;
      position: relative;
    }

    .section-title::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -15px;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background-color: #006241;
      border-radius: 2px;
    }

    /* Error Message Styles */
    .error-message {
      background-color: #fff3f3;
      border-left: 4px solid #e74c3c;
      color: #c0392b;
      padding: 20px 25px;
      margin: 40px 0;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      font-size: 1.1rem;
      line-height: 1.6;
      display: flex;
      align-items: center;
    }

    .error-icon {
      margin-right: 15px;
      color: #e74c3c;
      font-size: 24px;
    }

    /* Animation for content load */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fade-in {
      opacity: 0;
      animation: fadeIn 0.8s ease-out forwards;
    }

    .fade-in-delay-1 {
      animation-delay: 0.2s;
    }

    .fade-in-delay-2 {
      animation-delay: 0.4s;
    }

    .fade-in-delay-3 {
      animation-delay: 0.6s;
    }

    /* Responsive styles */
    @media (max-width: 992px) {
      .features-section {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 70px 30px;
      }
      
      .hero-section h1 {
        font-size: 2.5rem;
      }
      
      .hero-section p {
        font-size: 1.1rem;
      }

      .hero-cta {
        padding: 14px 28px;
        font-size: 1rem;
      }

      .features-section {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }

    @media (max-width: 480px) {
      .hero-section {
        padding: 50px 20px;
        margin-bottom: 40px;
      }

      .hero-section h1 {
        font-size: 2rem;
      }
      
      .main-content {
        padding: 15px;
      }

      .section-title {
        font-size: 1.8rem;
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

  const scrollToProducts = () => {
    document.getElementById('products-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <CartProvider>
      <style>{styles}</style>
      <div className="home-page">
        <UserNavbar />
        <div className="main-content">
          <div className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="fade-in">Membu Naturals</h1>
              <p className="fade-in fade-in-delay-1">Experience the power of nature with our premium hair oils and products designed to nourish, strengthen and beautify your natural hair</p>
              <button onClick={scrollToProducts} className="hero-cta fade-in fade-in-delay-2">Shop Now</button>
            </div>
          </div>
          
          <div className="features-section">
            <div className="feature-card fade-in fade-in-delay-1">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3>100% Natural</h3>
              <p>Our products are made with pure, natural ingredients that nourish your hair from root to tip.</p>
            </div>
            
            <div className="feature-card fade-in fade-in-delay-2">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Handcrafted</h3>
              <p>Each product is carefully handcrafted in small batches to ensure the highest quality.</p>
            </div>
            
            <div className="feature-card fade-in fade-in-delay-3">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3>Affordable</h3>
              <p>Luxury hair care at prices that won't break the bank. Quality doesn't have to be expensive.</p>
            </div>
          </div>
          
          <div id="products-section" className="products-section">
            <h2 className="section-title fade-in">Our Products</h2>
            
            {error ? (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            ) : (
              <UserPanel products={products} />
            )}
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default HomePage;