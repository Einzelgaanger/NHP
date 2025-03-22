// src/utils/initializeAdminCollection.js
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const ADMINS_COLLECTION = 'admins';

/**
 * Initializes the admin collection with the first admin user
 * Run this once during application setup or deployment
 */
export const initializeAdminCollection = async () => {
  try {
    // Check if collection exists and has documents
    const adminCollection = collection(db, ADMINS_COLLECTION);
    const snapshot = await getDocs(adminCollection);
    
    if (snapshot.empty) {
      console.log('Admins collection is empty. Adding initial admin...');
      
      // Add the initial admin user
      const initialAdmin = {
        email: 'binfred.ke@gmail.com', // Replace with your email
        name: 'Admin User',
        role: 'superadmin',
        createdAt: new Date()
      };
      
      const docRef = await addDoc(adminCollection, initialAdmin);
      console.log('Initial admin added with ID:', docRef.id);
      return true;
    } else {
      console.log('Admins collection already exists with data');
      return false;
    }
  } catch (error) {
    console.error('Error initializing admin collection:', error);
    return false;
  }
};