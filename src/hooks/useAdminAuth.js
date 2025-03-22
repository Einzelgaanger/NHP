// src/hooks/useAdminAuth.js
import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { checkAdminStatus } from '../firebase/firestore';

/**
 * Custom hook for handling admin authentication with Google
 * @returns {Object} Authentication utilities and state
 */
const useAdminAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Check if user email is in admin collection
          const adminStatus = await checkAdminStatus(user.email);
          setIsAdmin(adminStatus);
        } catch (err) {
          console.error("Error checking admin status:", err);
          setIsAdmin(false);
          setError("Error verifying admin privileges");
        }
      } else {
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);
  
  // Handle Google sign in
  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user is an authorized admin
      const adminStatus = await checkAdminStatus(user.email);
      
      if (!adminStatus) {
        // Sign out if not an admin
        await signOut(auth);
        setError("Not authorized as admin");
        setIsAdmin(false);
        return false;
      }
      
      setIsAdmin(true);
      return true;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle sign out
  const logoutAdmin = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      setCurrentUser(null);
      return true;
    } catch (err) {
      console.error("Logout error:", err);
      setError(err.message || "Failed to logout");
      return false;
    }
  };
  
  return {
    currentUser,
    isAdmin,
    isLoading,
    error,
    loginWithGoogle,
    logoutAdmin
  };
};

export default useAdminAuth;