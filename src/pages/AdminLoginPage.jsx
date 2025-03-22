// src/pages/AdminLoginPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from '../components/admin/AdminLogin';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import useAdminAuth from '../hooks/useAdminAuth';

const AdminLoginPage = () => {
  const { isAdmin, error, loginWithGoogle } = useAdminAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAdmin ) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  // Integrated styles
  const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    container: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      maxWidth: '480px',
      margin: '0 auto',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      color: '#15803d', // green-700
      textAlign: 'center',
    },
    
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      navigate('/admin');
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>Admin Login</h1>
        
      </div>
      <Footer />
    </div>
  );
};

export default AdminLoginPage;