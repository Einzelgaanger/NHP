import React from 'react';
import { Link } from 'react-router-dom';

const UserNavbar = ({ cartItemCount, toggleCart }) => {
  // Integrated styles
  const styles = {
    nav: {
      backgroundColor: '#15803d', // green-700 equivalent
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0.75rem 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: 'white',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    cartButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'white',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    cartBadge: {
      position: 'absolute',
      top: '-0.25rem',
      right: '-0.25rem',
      backgroundColor: '#ef4444', // red-500 equivalent
      color: 'white',
      fontSize: '0.75rem',
      borderRadius: '9999px',
      height: '1.25rem',
      width: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>Membu Naturals</Link>
        
        <div style={styles.rightSection}>
          <button 
            onClick={toggleCart}
            style={styles.cartButton}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              style={{ height: '1.5rem', width: '1.5rem' }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            {cartItemCount > 0 && (
              <span style={styles.cartBadge}>
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;