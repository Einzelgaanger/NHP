import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  // Advanced inline styles
  const styles = {
    adminNavbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    navbarBrand: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    brandTitle: {
      margin: 0,
      fontSize: '22px',
      fontWeight: '700',
      color: '#333',
      backgroundImage: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    adminBadge: {
      backgroundColor: '#f1f3f5',
      color: '#495057',
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 8px',
      borderRadius: '4px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    navbarMenu: {
      display: 'flex',
      alignItems: 'center',
    },
    logoutButton: {
      backgroundColor: '#f8f9fa',
      color: '#495057',
      border: '1px solid #ddd',
      borderRadius: '6px',
      padding: '8px 16px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: '500',
    },
  };

  const handleLogout = () => {
    // Clear admin authentication
    localStorage.removeItem('adminAuthenticated');
    // Redirect to login page
    navigate('/admin/login');
  };

  return (
    <nav style={styles.adminNavbar}>
      <div style={styles.navbarBrand}>
        <h1 style={styles.brandTitle}>Natural Hair Products</h1>
        <span style={styles.adminBadge}>Admin Panel</span>
      </div>
      
      <div style={styles.navbarMenu}>
        <button 
          style={styles.logoutButton} 
          onClick={handleLogout}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#e9ecef';
            e.currentTarget.style.borderColor = '#ced4da';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
            e.currentTarget.style.borderColor = '#ddd';
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;