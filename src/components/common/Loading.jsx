import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  // Define styles directly in the component
  const styles = {
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(5px)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    },
    loadingAnimation: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80px',
      height: '80px',
      position: 'relative',
    },
    loadingText: {
      marginTop: '24px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: '18px',
      fontWeight: 500,
      color: '#333',
      textAlign: 'center',
      animation: 'textPulse 1.5s ease-in-out infinite',
      letterSpacing: '1px',
    },
  };

  // CSS for the loading circles and animations using a style tag
  const cssString = `
    .loading-circle {
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #4a9f7b;
      animation: loadingKeyframes 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }
    
    .loading-circle:nth-child(1) {
      animation-delay: 0s;
      top: 0;
      left: 0;
    }
    
    .loading-circle:nth-child(2) {
      animation-delay: -0.3s;
      top: 0;
      right: 0;
    }
    
    .loading-circle:nth-child(3) {
      animation-delay: -0.6s;
      bottom: 0;
      right: 0;
    }
    
    .loading-circle:nth-child(4) {
      animation-delay: -0.9s;
      bottom: 0;
      left: 0;
    }
    
    @keyframes loadingKeyframes {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      20% {
        transform: scale(1);
        opacity: 0.8;
      }
      100% {
        transform: scale(0);
        opacity: 1;
      }
    }
    
    @keyframes textPulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.6;
      }
    }
    
    @media (max-width: 768px) {
      .loading-animation {
        width: 60px;
        height: 60px;
      }
      
      .loading-circle {
        width: 12px;
        height: 12px;
      }
      
      .loading-text {
        font-size: 16px;
      }
    }
    
    @media (prefers-color-scheme: dark) {
      .loading-container {
        background-color: rgba(20, 20, 20, 0.8);
      }
      
      .loading-circle {
        background: #5ebf9b;
      }
      
      .loading-text {
        color: #e0e0e0;
      }
    }
  `;

  return (
    <>
      {/* Inject the CSS animations */}
      <style>{cssString}</style>
      
      <div style={styles.loadingContainer} className="loading-container">
        <div style={styles.loadingAnimation} className="loading-animation">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
        <p style={styles.loadingText} className="loading-text">{message}</p>
      </div>
    </>
  );
};

export default Loading;