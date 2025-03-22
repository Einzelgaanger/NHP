import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';

const Navbar = () => {
  const location = useLocation();
  const { isAdmin, logout } = useAdminAuth();
  const isAdminPage = location.pathname.includes('/admin');
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Inline CSS styles with improved color scheme
  const styles = `
    /* Navbar Styles */
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: #fff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      padding: 1rem 0;
      transition: all 0.3s ease;
    }

    .navbar-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .navbar-logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #006241;
      text-decoration: none;
      transition: color 0.3s ease;
      display: flex;
      align-items: center;
    }

    .navbar-logo:hover {
      color: #004d33;
    }

    .logo-icon {
      margin-right: 8px;
    }

    .navbar-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      position: relative;
      color: #333;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 0;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .nav-link:hover, .nav-link.active {
      color: #006241;
    }

    .nav-link:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #006241;
      transition: width 0.3s ease;
      border-radius: 2px;
    }

    .nav-link:hover:after, .nav-link.active:after {
      width: 100%;
    }

    .nav-button {
      background-color: #006241;
      color: white;
      border: none;
      border-radius: 50px;
      padding: 0.6rem 1.2rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 98, 65, 0.2);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .nav-button:hover {
      background-color: #004d33;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 98, 65, 0.25);
    }

    .nav-button:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(0, 98, 65, 0.2);
    }

    .cart-link {
      position: relative;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .cart-count {
      position: absolute;
      top: -8px;
      right: -10px;
      background-color: #f0c14b;
      color: #333;
      font-size: 0.7rem;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .cart-icon {
      font-size: 1.3rem;
    }

    /* Mobile menu button */
    .menu-button {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
    }

    .menu-icon {
      width: 24px;
      height: 24px;
      position: relative;
      transition: transform 0.3s ease;
    }

    .menu-line {
      display: block;
      width: 100%;
      height: 2px;
      background-color: #333;
      margin: 5px 0;
      transition: all 0.3s ease;
    }

    .menu-open .menu-line:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .menu-open .menu-line:nth-child(2) {
      opacity: 0;
    }

    .menu-open .menu-line:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .menu-button {
        display: block;
      }

      .navbar-links {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #fff;
        flex-direction: column;
        padding: 1rem 0;
        gap: 1rem;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-20px);
        transition: all 0.3s ease;
      }

      .navbar-links.open {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .nav-link {
        width: 100%;
        text-align: center;
        padding: 0.75rem 0;
      }

      .nav-button {
        margin: 0.5rem 0;
        width: 80%;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .navbar-container {
        padding: 0 1rem;
      }
      
      .navbar-logo {
        font-size: 1.3rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"></path>
              <path d="M9 9c1.5 0 3.5-2 3.5-2"></path>
              <path d="M9 14c1.5 0 3.5-2 3.5-2"></path>
              <circle cx="5" cy="18" r="3"></circle>
              <circle cx="17" cy="16" r="3"></circle>
            </svg>
            Membu Naturals
          </Link>
          
          <button 
            className={`menu-button ${menuOpen ? 'menu-open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="menu-icon">
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
            </div>
          </button>
          
          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            {isAdminPage ? (
              // Admin navigation links
              <>
                {isAdmin ? (
                  <>
                    <Link 
                      to="/admin/dashboard" 
                      className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/admin/products" 
                      className={`nav-link ${location.pathname === '/admin/products' ? 'active' : ''}`}
                    >
                      Products
                    </Link>
                    <Link 
                      to="/admin/orders" 
                      className={`nav-link ${location.pathname === '/admin/orders' ? 'active' : ''}`}
                    >
                      Orders
                    </Link>
                    <button onClick={logout} className="nav-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/admin/login" className="nav-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    Login
                  </Link>
                )}
              </>
            ) : (
              // User navigation links
              <>
                <Link 
                  to="/" 
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                >
                  Products
                </Link>
                <Link 
                  to="/about" 
                  className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                >
                  Contact
                </Link>
                <Link 
                  to="/cart" 
                  className={`nav-link cart-link ${location.pathname === '/cart' ? 'active' : ''}`}
                >
                  <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Cart
                  <span className="cart-count">3</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;