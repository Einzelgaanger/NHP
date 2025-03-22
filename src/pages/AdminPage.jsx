import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../components/admin/AdminPanel';
import AdminNavbar from '../components/admin/AdminNavbar';
import Footer from '../components/common/Footer';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Integrated styles
  const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    content: {
      flex: '1',
      padding: '2rem',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      color: '#15803d', // green-700
      borderBottom: '2px solid #e5e7eb',
      paddingBottom: '0.5rem',
    }
  };

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth || adminAuth !== 'true') {
      navigate('/admin/login');
      return;
    }

    setIsAuthenticated(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  

  return (
    <div style={styles.page}>
      <AdminNavbar onLogout={handleLogout} />
      <div style={styles.content}>
        <h1 style={styles.heading}>Admin Panel</h1>
        {isAuthenticated && <AdminPanel />}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;