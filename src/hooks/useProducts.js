import { useState, useEffect } from 'react';
import { 
  getProducts, 
  addProduct as addProductToFirestore, 
  updateProduct as updateProductInFirestore, 
  deleteProduct as deleteProductFromFirestore 
} from '../firebase/firestore';

/**
 * Custom hook for managing products with Firestore
 * @returns {Object} Product state and CRUD functions
 */
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  
  // Fetch products on hook initialization
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } 
    };
    
    fetchProducts();
  }, []);
  
  // Add a new product
  const addProduct = async (productData) => {
    try {
      // Make sure image is a string (URL)
      if (!productData.image) {
        productData.image = 'https://via.placeholder.com/300?text=No+Image';
      }
      
      // Add product to Firestore
      const newProduct = await addProductToFirestore(productData);
      
      // Update local state
      setProducts(prevProducts => [...prevProducts, newProduct]);
      return { success: true, product: newProduct };
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
      return { success: false, error: err.message };
    } 
  };
  
  // Update an existing product
  const updateProduct = async (productId, productData) => {
    try {
      
      
      // Update product in Firestore
      await updateProductInFirestore(productId, productData);
      
      // Update local state
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId 
            ? { ...product, ...productData, id: productId } 
            : product
        )
      );
      
      return { success: true };
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.');
      return { success: false, error: err.message };
    } 
  };
  
  // Delete a product
  const deleteProduct = async (productId) => {
    try {
      
      // Delete product from Firestore
      await deleteProductFromFirestore(productId);
      
      // Update local state
      setProducts(prevProducts => 
        prevProducts.filter(product => product.id !== productId)
      );
      
      return { success: true };
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
      return { success: false, error: err.message };
    } 
  };
  
  // Refresh products list
  const refreshProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
      setError(null);
      return { success: true };
    } catch (err) {
      console.error('Error refreshing products:', err);
      setError('Failed to refresh products. Please try again.');
      return { success: false, error: err.message };
    } 
  };
  
  // Get a single product by ID
  const getProductById = (productId) => {
    return products.find(product => product.id === productId);
  };
  
  return {
    products,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
    getProductById
  };
};

export default useProducts;