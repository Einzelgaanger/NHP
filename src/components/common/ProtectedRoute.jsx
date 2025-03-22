// src/components/admin/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
  const { isAdmin, isLoading } = useAdminAuth();
  const location = useLocation();

  // Styles for protected route component
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      transition: 'all 0.3s ease',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Render the protected content if authenticated
  return children;
};

export default ProtectedRoute;