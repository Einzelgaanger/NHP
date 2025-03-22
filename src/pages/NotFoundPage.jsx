import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const NotFoundPage = () => {
  // Integrated styles
  const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    content: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 2rem',
      textAlign: 'center',
    },
    errorCode: {
      fontSize: '6rem',
      fontWeight: 'bold',
      color: '#15803d', // green-700
      marginBottom: '1rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    message: {
      fontSize: '1.125rem',
      color: '#4b5563', // gray-600
      marginBottom: '2rem',
    },
    button: {
      display: 'inline-block',
      backgroundColor: '#15803d', // green-700
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'background-color 0.2s ease',
    },
  };

  // Button hover state
  const [isHovered, setIsHovered] = React.useState(false);
  
  const buttonStyle = {
    ...styles.button,
    backgroundColor: isHovered ? '#166534' : '#15803d', // green-800 : green-700
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.content}>
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.title}>Page Not Found</h2>
        <p style={styles.message}>The page you are looking for does not exist.</p>
        <Link 
          to="/" 
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Return to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;