import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
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
 
  
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    // Hardcoded admin credentials
    const ADMIN_EMAIL = 'admin@example.com';
    const ADMIN_PASSWORD = 'admin123';
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AdminLogin;