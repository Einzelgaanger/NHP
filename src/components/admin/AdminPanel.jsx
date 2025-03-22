import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import AdminNavbar from './AdminNavbar';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeView, setActiveView] = useState('list'); // 'list', 'add', 'edit'

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
    } 
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveView('edit');
  };

  const handleAddNewClick = () => {
    setActiveView('add');
    setEditingProduct(null);
  };

  const handleBackToList = () => {
    setActiveView('list');
    setEditingProduct(null);
    fetchProducts(); // Refresh the list after editing/adding
  };

  return (
    <div className="admin-panel">
      <style jsx>{`
        /* CSS Variables */
        :root {
          --primary-color: #8d6e63;
          --primary-light: #be9c91;
          --primary-dark: #5f4339;
          --accent-color: #81c784;
          --text-light: #f5f5f5;
          --text-dark: #263238;
          --danger-color: #e57373;
          --warning-color: #ffb74d;
          --success-color: #81c784;
          --background-light: #f9f5f2;
          --background-dark: #4e342e;
          --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.1);
          --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.15);
          --border-radius: 8px;
          --transition-speed: 0.3s;
        }

        /* Main Admin Panel Layout */
        .admin-panel {
          min-height: 100vh;
          background-color: var(--background-light);
          display: flex;
          flex-direction: column;
        }

        .admin-container {
          max-width: 1200px;
          width: 95%;
          margin: 2rem auto;
          padding: 2rem;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-light);
        }

        .admin-container h1 {
          color: var(--primary-dark);
          margin-bottom: 2rem;
          font-size: 2rem;
          font-weight: 600;
          position: relative;
          padding-bottom: 0.75rem;
        }

        .admin-container h1::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 3px;
          width: 60px;
          background-color: var(--primary-color);
        }

        /* Button Styles */
        .admin-button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--border-radius);
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-speed) ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.9rem;
        }

        .admin-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .add-button {
          background-color: var(--primary-color);
          color: var(--text-light);
          margin-bottom: 2rem;
        }

        .add-button:hover {
          background-color: var(--primary-dark);
        }

        .edit-button {
          background-color: var(--primary-light);
          color: var(--text-dark);
          margin-right: 0.5rem;
        }

        .delete-button {
          background-color: var(--danger-color);
          color: var(--text-light);
        }

        .back-button {
          background-color: var(--background-dark);
          color: var(--text-light);
          margin-bottom: 1.5rem;
        }

      

      

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Product List Styles */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .product-card {
          background-color: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow-light);
          transition: transform var(--transition-speed) ease;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-medium);
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .product-details {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .product-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: 0.5rem;
        }

        .product-description {
          color: var(--text-dark);
          opacity: 0.8;
          margin-bottom: 1rem;
          flex-grow: 1;
          line-height: 1.6;
        }

        .product-price {
          font-weight: 600;
          color: var(--primary-dark);
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .product-status {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }

        .status-available {
          background-color: var(--success-color);
          color: var(--text-dark);
        }

        .status-unavailable {
          background-color: var(--danger-color);
          color: var(--text-light);
        }

        .product-actions {
          display: flex;
          justify-content: flex-start;
          margin-top: 1rem;
        }

        /* Form Styles */
        .admin-form {
          max-width: 800px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--primary-dark);
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          background-color: white;
          font-size: 1rem;
          transition: border-color var(--transition-speed) ease;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          border-color: var(--primary-color);
          outline: none;
          box-shadow: 0 0 0 2px rgba(141, 110, 99, 0.2);
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .form-submit {
          background-color: var(--primary-color);
          color: var(--text-light);
          padding: 0.75rem 2rem;
          border: none;
          border-radius: var(--border-radius);
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-speed) ease;
          display: inline-block;
          margin-top: 1rem;
        }

        .form-submit:hover {
          background-color: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .form-error {
          color: var(--danger-color);
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .admin-container {
            padding: 1.5rem;
            width: 90%;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .admin-container {
            padding: 1rem;
            width: 95%;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .product-actions {
            flex-direction: column;
            gap: 0.5rem;
          }

          .admin-button {
            width: 100%;
          }

          .edit-button {
            margin-right: 0;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>

      <AdminNavbar />
      <div className="admin-container">
        <h1>Admin Panel</h1>
        
        {activeView === 'list' && (
          <>
            <button 
              className="admin-button add-button" 
              onClick={handleAddNewClick}
            >
              Add New Product
            </button>
            <ProductList 
              products={products}  
              onEdit={handleEditProduct} 
              onRefresh={fetchProducts} 
            />
          </>
        )}
        
        {activeView === 'add' && (
          <AddProduct onBack={handleBackToList} />
        )}
        
        {activeView === 'edit' && editingProduct && (
          <EditProduct 
            product={editingProduct} 
            onBack={handleBackToList} 
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;