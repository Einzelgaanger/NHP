import React, { useState } from 'react';
import { db } from '../../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

const ProductList = ({ products, onEdit, onRefresh }) => {
  const [deleteId, setDeleteId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setConfirmDelete(false);
  };

  const confirmDeleteProduct = async () => {
    if (!deleteId) return;
    
    try {
      await deleteDoc(doc(db, 'products', deleteId));
      setConfirmDelete(false);
      setDeleteId(null);
      onRefresh(); // Refresh products list
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    } 
  };

  

  if (products.length === 0) {
    return <div className="no-products">No products found. Add your first product!</div>;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="product-list">
      <style jsx>{`
        /* ProductList Component Styles */
        .product-list {
          padding: 1rem 0;
        }
        
        .product-list h2 {
          font-size: 1.5rem;
          color: #5f4339;
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .product-list h2::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 40px;
          height: 3px;
          background-color: #8d6e63;
        }
        
       
        
        .delete-confirmation {
          background-color: #fff3e0;
          border: 1px solid #ffe0b2;
          border-left: 4px solid #ff9800;
          border-radius: 4px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .delete-confirmation p {
          margin: 0 0 1rem 0;
          color: #e65100;
        }
        
        .confirmation-buttons {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
        }
        
        .products-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .products-table th, 
        .products-table td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        .products-table th {
          background-color: #efebe9;
          color: #5f4339;
          font-weight: 500;
        }
        
        .products-table tr:hover {
          background-color: #fafafa;
        }
        
        .products-table tr:last-child td {
          border-bottom: none;
        }
        
        .product-image {
          width: 80px;
        }
        
        .product-image img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
        }
        
        .no-image {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          border-radius: 4px;
          border: 1px dashed #ccc;
          color: #9e9e9e;
          font-size: 0.75rem;
          text-align: center;
        }
        
        .status {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .in-stock {
          background-color: #e8f5e9;
          color: #2e7d32;
        }
        
        .out-of-stock {
          background-color: #ffebee;
          color: #c62828;
        }
        
        .actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .edit-button, .cancel-button {
          background-color: #8d6e63;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 0.75rem;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .edit-button:hover, .cancel-button:hover {
          background-color: #6d4c41;
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .delete-button {
          background-color: #ef5350;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 0.75rem;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .delete-button:hover:not(:disabled) {
          background-color: #d32f2f;
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .edit-button:disabled,
        .delete-button:disabled,
        .cancel-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .products-table {
            display: block;
            overflow-x: auto;
          }
          
          .confirmation-buttons {
            flex-direction: column;
            align-items: flex-end;
          }
          
          .confirmation-buttons button {
            width: 100px;
          }
        }
        
        @media (max-width: 480px) {
          .product-image {
            width: 60px;
          }
          
          .product-image img,
          .no-image {
            width: 50px;
            height: 50px;
          }
          
          .products-table th, 
          .products-table td {
            padding: 0.5rem;
            font-size: 0.9rem;
          }
          
          .actions {
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .actions button {
            width: 100%;
          }
        }
      `}</style>

      <h2>Products ({products.length})</h2>
      
      {confirmDelete && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this product?</p>
          <div className="confirmation-buttons">
            <button 
              className="cancel-button" 
              onClick={cancelDelete}
            >
              Cancel
            </button>
            <button 
              className="delete-button" 
              onClick={confirmDeleteProduct}
            >
            </button>
          </div>
        </div>
      )}
      
      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="product-image">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} />
                ) : (
                  <div className="no-image">No image</div>
                )}
              </td>
              <td>{product.name}</td>
              <td>{formatPrice(product.price)}</td>
              <td>
                <span className={`status ${product.available ? 'in-stock' : 'out-of-stock'}`}>
                  {product.available ? 'In Stock' : 'Out of Stock'}
                </span>
              </td>
              <td className="actions">
                <button 
                  className="edit-button" 
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                <button 
                  className="delete-button" 
                  onClick={() => handleDeleteClick(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;