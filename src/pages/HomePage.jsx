import React, { useState, useEffect } from 'react';
import UserPanel from '../components/user/UserPanel';
import UserNavbar from '../components/user/UserNavbar';
import { CartProvider } from '../contexts/CartContext';
import { getAllProducts as getProducts } from '../firebase/firestore';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Redesigned CSS with earthy soil theme and green footer
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

    /* Hero Section Styles - Earthy Soil Theme */
    .hero-section {
      background: linear-gradient(135deg, #5e4126 0%, #3d2a17 100%);
      color: white;
      padding: 100px 40px;
      margin-bottom: 60px;
      border-radius: 16px;
      text-align: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(62, 43, 26, 0.3);
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10L82 4l17.32 10zm-80 80l-1 1.732-17.32-10L2 84l17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10L62 24l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM111 40h-2V20h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zM40 49v2H20v-2h20zm19.32 5l-1 1.732-17.32-10L42 44l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM91 60h-2V40h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM39.32 74l-1 1.732-17.32-10L22 64l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM71 80h-2V60h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM120 89v2h-20v-2h20zm-84.134 9.16l-1.732 1-10-17.32 1.732-1 10 17.32zM51 100h-2V80h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM100 109v2H80v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM31 120h-2v-20h2v20z' fill='%23d9c5a8' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
      z-index: 0;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 50%, rgba(62, 43, 26, 0) 0%, rgba(46, 32, 19, 0.7) 100%);
      z-index: 1;
    }

    /* Soil Texture Effect */
    .soil-texture {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 80px;
      background: url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 C 10 10, 15 0, 20 5 C 25 10, 30 15, 40 5 C 50 15, 60 0, 70 10 C 80 15, 90 5, 100 15 L 100 20 L 0 20 Z' fill='%237a573d'/%3E%3C/svg%3E");
      background-repeat: repeat-x;
      background-size: 100px 20px;
      opacity: 0.8;
      z-index: 2;
    }

    /* Soil Particles Animation */
    @keyframes floatParticle {
      0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
      50% { opacity: 0.8; }
      100% { transform: translate(var(--x), var(--y)) rotate(var(--r)); opacity: 0; }
    }

    .soil-particle {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #c2a87c;
      border-radius: 50%;
      z-index: 2;
      opacity: 0;
      animation: floatParticle 6s infinite;
    }

    .soil-particle:nth-child(1) {
      bottom: 20px;
      left: 10%;
      --x: 40px;
      --y: -60px;
      --r: 45deg;
      animation-delay: 0.5s;
    }

    .soil-particle:nth-child(2) {
      bottom: 40px;
      left: 30%;
      --x: -30px;
      --y: -80px;
      --r: -30deg;
      animation-delay: 1.5s;
    }

    .soil-particle:nth-child(3) {
      bottom: 30px;
      left: 50%;
      --x: 50px;
      --y: -70px;
      --r: 60deg;
      animation-delay: 0.8s;
    }

    .soil-particle:nth-child(4) {
      bottom: 50px;
      left: 70%;
      --x: -20px;
      --y: -50px;
      --r: -20deg;
      animation-delay: 2.2s;
    }

    .soil-particle:nth-child(5) {
      bottom: 25px;
      left: 85%;
      --x: 30px;
      --y: -90px;
      --r: 35deg;
      animation-delay: 1.2s;
    }

    .hero-content {
      position: relative;
      z-index: 3;
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
      background-color: #d4a96a;
      color: #3d2a17;
      padding: 16px 32px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 1.1rem;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
      margin-top: 10px;
      border: none;
      cursor: pointer;
    }

    .hero-cta:hover {
      background-color: #c79756;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    /* Features Section - Soil Inspired Cards */
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
      position: relative;
      overflow: hidden;
    }

    .feature-card::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 8px;
      background: linear-gradient(90deg, #7a573d, #9e7e5a, #7a573d);
      opacity: 0.7;
      transition: height 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }

    .feature-card:hover::after {
      height: 12px;
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      background-color: rgba(122, 87, 61, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      color: #7a573d;
    }

    .feature-card h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: #3d2a17;
    }

    .feature-card p {
      color: #666;
      line-height: 1.6;
    }

    /* Product Section */
    .products-section {
      margin-top: 40px;
      padding-bottom: 60px;
    }

    .section-title {
      text-align: center;
      margin-bottom: 40px;
      font-size: 2.2rem;
      font-weight: 700;
      color: #3d2a17;
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
      background: linear-gradient(90deg, #7a573d, #9e7e5a, #7a573d);
      border-radius: 2px;
    }

    /* Earth Divider */
    .earth-divider {
      height: 60px;
      margin: 50px 0;
      position: relative;
      background: linear-gradient(180deg, #f8f5f1 0%, rgba(248, 245, 241, 0) 100%);
      overflow: hidden;
    }

    .earth-divider::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 30px;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 C 20 0, 40 20, 60 5 C 80 15, 100 0, 120 10 C 140 20, 160 5, 180 15 C 200 0, 220 20, 240 5 C 260 15, 280 0, 300 10 L 300 30 L 0 30 Z' fill='%237a573d' fill-opacity='0.1'/%3E%3C/svg%3E");
      background-repeat: repeat-x;
      background-size: 300px 30px;
    }

    /* Footer - Green Jungle Theme */
    .footer {
      background-color: #006241;
      color: white;
      padding: 60px 20px;
      position: relative;
      overflow: hidden;
    }

    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 15px;
      background: linear-gradient(90deg, #007241, #004d33, #007241, #004d33, #007241);
      opacity: 0.7;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
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
      
      .footer-content {
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
      
      .soil-texture {
        height: 60px;
        background-size: 80px 15px;
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
      
      .footer-content {
        grid-template-columns: 1fr;
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
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        
      }
    };

    fetchProducts();
  }, []);

 

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
            <div className="soil-texture"></div>
            {/* Animated soil particles */}
            <div className="soil-particle"></div>
            <div className="soil-particle"></div>
            <div className="soil-particle"></div>
            <div className="soil-particle"></div>
            <div className="soil-particle"></div>
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
          
          <div className="earth-divider"></div>
          
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
        
        {/* Added Footer with jungle green theme */}
        <div className="footer">
          <div className="footer-content">
            {/* Footer content would go here */}
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default HomePage;