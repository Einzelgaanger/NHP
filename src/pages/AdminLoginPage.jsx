// src/pages/AdminLoginPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from '../components/admin/AdminLogin';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import useAdminAuth from '../hooks/useAdminAuth';

const AdminLoginPage = () => {
  const { isAdmin, isLoading, error, loginWithGoogle } = useAdminAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAdmin && !isLoading) {
      navigate('/admin');
    }
  }, [isAdmin, isLoading, navigate]);

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
    loadingText: {
      color: '#6b7280',
      marginTop: '1rem',
    }
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
        {isLoading ? (
          <p style={styles.loadingText}>Loading...</p>
        ) : (
          <AdminLogin onGoogleLogin={handleGoogleLogin} error={error} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminLoginPage;