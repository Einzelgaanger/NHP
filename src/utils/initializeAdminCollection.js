import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const initializeAdminCollection = async () => {
  const adminCollectionRef = collection(db, 'admins');
  const adminSnapshot = await getDocs(adminCollectionRef);

  if (adminSnapshot.empty) {
    // Create default admin user
    await setDoc(doc(db, 'admins', 'default'), {
      email: 'admin@example.com',
      password: 'admin123' // In production, use hashed passwords
    });
  }
};