// src/firebase/firestore.js
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';

const PRODUCTS_COLLECTION = 'products';
const ADMINS_COLLECTION = 'admins';

// Product Operations
export const getAllProducts = async () => {
  try {
    const productsCollection = collection(db, PRODUCTS_COLLECTION);
    const productsSnapshot = await getDocs(productsCollection);
    return productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getAvailableProducts = async () => {
  try {
    const productsCollection = collection(db, PRODUCTS_COLLECTION);
    const q = query(
      productsCollection,
      where("available", "==", true),
      orderBy("name")
    );
    const productsSnapshot = await getDocs(q);
    return productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching available products:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const productDoc = doc(db, PRODUCTS_COLLECTION, productId);
    const productSnapshot = await getDoc(productDoc);
    
    if (productSnapshot.exists()) {
      return {
        id: productSnapshot.id,
        ...productSnapshot.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const addProduct = async (productData, imageFile) => {
  try {
    // Upload image if provided
    let imageUrl = null;
    if (imageFile) {
      const storageRef = ref(storage, `product-images/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    // Add the product with image URL if available
    const productToAdd = {
      ...productData,
      imageUrl,
      createdAt: new Date()
    };

    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productToAdd);
    return {
      id: docRef.id,
      ...productToAdd
    };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (productId, productData, imageFile) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    const productSnapshot = await getDoc(productRef);
    
    if (!productSnapshot.exists()) {
      throw new Error("Product not found");
    }
    
    const currentData = productSnapshot.data();
    let imageUrl = currentData.imageUrl;
    
    // Handle image upload/update if a new image is provided
    if (imageFile) {
      // Delete previous image if exists
      if (currentData.imageUrl) {
        try {
          const oldImageRef = ref(storage, currentData.imageUrl);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.warn("Error deleting old image, it might not exist:", error);
        }
      }
      
      // Upload new image
      const storageRef = ref(storage, `product-images/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }
    
    // Update product data
    const updatedProduct = {
      ...productData,
      imageUrl,
      updatedAt: new Date()
    };
    
    await updateDoc(productRef, updatedProduct);
    
    return {
      id: productId,
      ...updatedProduct
    };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    // Get product data to check for image
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    const productSnapshot = await getDoc(productRef);
    
    if (productSnapshot.exists()) {
      const productData = productSnapshot.data();
      
      // Delete image if exists
      if (productData.imageUrl) {
        try {
          const imageRef = ref(storage, productData.imageUrl);
          await deleteObject(imageRef);
        } catch (error) {
          console.warn("Error deleting image, it might not exist:", error);
        }
      }
      
      // Delete product document
      await deleteDoc(productRef);
      return true;
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Admin Authentication Functions
export const checkAdminStatus = async (email) => {
  try {
    if (!email) return false;
    
    const adminCollection = collection(db, ADMINS_COLLECTION);
    const q = query(adminCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking admin status:", error);
    throw error;
  }
};

// For migrating existing admin data or adding new admins
export const addAdminUser = async (adminData) => {
  try {
    const adminCollection = collection(db, ADMINS_COLLECTION);
    const q = query(adminCollection, where("email", "==", adminData.email));
    const querySnapshot = await getDocs(q);
    
    // Check if admin already exists
    if (!querySnapshot.empty) {
      return {
        success: false,
        message: "Admin already exists"
      };
    }
    
    // Add new admin
    const newAdmin = {
      email: adminData.email,
      name: adminData.name || '',
      role: adminData.role || 'admin',
      createdAt: new Date()
    };
    
    const docRef = await addDoc(adminCollection, newAdmin);
    return {
      success: true,
      admin: {
        id: docRef.id,
        ...newAdmin
      }
    };
  } catch (error) {
    console.error("Error adding admin user:", error);
    throw error;
  }
};