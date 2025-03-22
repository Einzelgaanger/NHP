// src/components/admin/AdminLogin.js
import React from 'react';
import { FcGoogle } from 'react-icons/fc'; // Make sure to install react-icons

const AdminLogin = ({ onGoogleLogin, error }) => {
  // Integrated styles
  const styles = {
    container: {
      width: '100%',
      maxWidth: '400px',
      padding: '1.5rem',
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    googleButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: '4px',
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      color: '#1f2937',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    googleIcon: {
      marginRight: '0.75rem',
      fontSize: '1.25rem',
    },
    error: {
      color: '#dc2626',
      marginTop: '0.75rem',
      fontSize: '0.875rem',
    },
    infoText: {
      color: '#6b7280',
      fontSize: '0.875rem',
      marginTop: '1rem',
      textAlign: 'center',
    }
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.googleButton} 
        onClick={onGoogleLogin}
      >
        <FcGoogle style={styles.googleIcon} />
        Sign in with Google
      </button>
      
      {error && <p style={styles.error}>{error}</p>}
      
      <p style={styles.infoText}>
        Only authorized administrators can sign in.
      </p>
    </div>
  );
};

export default AdminLogin;