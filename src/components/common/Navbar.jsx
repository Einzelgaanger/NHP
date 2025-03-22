import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';

const Navbar = () => {
  const location = useLocation();
  const { isAdmin, logout } = useAdminAuth();
  const isAdminPage = location.pathname.includes('/admin');

  // Inline CSS styles
  const styles = `
    /* Navbar Styles */
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 0.75rem 0;
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
      font-size: 1.3rem;
      font-weight: 700;
      color: #3c6e71;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .navbar-logo:hover {
      color: #2c5356;
    }

    .navbar-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .nav-link {
      position: relative;
      color: #4a5568;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 0;
      transition: color 0.2s ease;
    }

    .nav-link:hover {
      color: #3c6e71;
    }

    .nav-link:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #3c6e71;
      transition: width 0.3s ease;
    }

    .nav-link:hover:after {
      width: 100%;
    }

    .nav-button {
      background-color: #e53e3e;
      color: white;
      border: none;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .nav-button:hover {
      background-color: #c53030;
    }

    .cart-icon {
      display: inline-block;
      margin-left: 0.375rem;
      position: relative;
      top: 1px;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
      .navbar-container {
        flex-direction: column;
        gap: 1rem;
        padding: 0.75rem;
      }

      .navbar-links {
        width: 100%;
        justify-content: space-around;
        gap: 0.75rem;
      }

      .nav-link {
        font-size: 0.875rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            Natural Hair Products
          </Link>
          
          <div className="navbar-links">
            {isAdminPage ? (
              // Admin navigation links
              <>
                {isAdmin ? (
                  <>
                    <Link to="/admin/products" className="nav-link">Products</Link>
                    <button onClick={logout} className="nav-button">Logout</button>
                  </>
                ) : (
                  <Link to="/admin/login" className="nav-link">Login</Link>
                )}
              </>
            ) : (
              // User navigation links
              <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/products" className="nav-link">Products</Link>
                <Link to="/cart" className="nav-link">
                  Cart
                  <span className="cart-icon">🛒</span>
                </Link>
                <Link to="/admin">Admin Panel</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;