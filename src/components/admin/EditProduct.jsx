import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditProduct = ({ product, onBack }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price ? product.price.toString() : '');
      setAvailable(product.available !== undefined ? product.available : true);
      setImagePreview(product.imageUrl || '');
    }
  }, [product]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product || !product.id) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let imageUrl = product.imageUrl || '';
      
      // Upload new image if selected
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `product-images/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Update product in Firestore
      const productRef = doc(db, 'products', product.id);
      await updateDoc(productRef, {
        name,
        description,
        price: parseFloat(price),
        available,
        imageUrl,
        updatedAt: new Date()
      });

      setSuccess('Product updated successfully!');
      
      setTimeout(() => {
        onBack(); // Return to product list after a delay
      }, 1500);
      
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div>No product selected for editing.</div>;

  return (
    <div className="edit-product">
      <style jsx>{`
        /* Edit Product Component Styles */
        .edit-product {
          padding: 1rem 0;
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-size: 1.5rem;
          color: #5f4339;
          margin: 0;
          position: relative;
        }

        .form-header h2::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 40px;
          height: 3px;
          background-color: #8d6e63;
        }

        .back-button {
          padding: 0.5rem 1rem;
          background-color: #4e342e;
          color: #f5f5f5;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .back-button:hover {
          background-color: #3e2723;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .error-message {
          background-color: #ffebee;
          color: #c62828;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          border-left: 4px solid #e57373;
        }

        .success-message {
          background-color: #e8f5e9;
          color: #2e7d32;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          border-left: 4px solid #81c784;
        }

        form {
          max-width: 800px;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #5f4339;
        }

        .form-group input[type="text"],
        .form-group input[type="number"],
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-group input[type="file"] {
          margin-bottom: 0.5rem;
        }

        .form-group small {
          display: block;
          color: #757575;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          border-color: #8d6e63;
          outline: none;
          box-shadow: 0 0 0 2px rgba(141, 110, 99, 0.2);
        }

        .form-group textarea {
          min-height: 120px;
          resize: vertical;
        }

        .image-preview {
          margin-bottom: 1.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 0.5rem;
          max-width: 300px;
        }

        .image-preview img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 4px;
        }

        .submit-button {
          background-color: #8d6e63;
          color: white;
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover:not(:disabled) {
          background-color: #6d4c41;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .submit-button:disabled {
          background-color: #d7ccc8;
          cursor: not-allowed;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .form-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .back-button {
            margin-top: 1rem;
          }
        }

        @media (max-width: 480px) {
          .form-group input,
          .form-group textarea,
          .form-group select {
            font-size: 16px; /* Prevents zoom on iOS */
          }
          
          .submit-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="form-header">
        <h2>Edit Product</h2>
        <button className="back-button" onClick={onBack}>
          Back to Products
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price (₦)</label>
          <input
            type="number"
            id="price"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <select
            id="availability"
            value={available.toString()}
            onChange={(e) => setAvailable(e.target.value === 'true')}
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <small>Leave blank to keep current image</small>
        </div>
        
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Product preview" />
          </div>
        )}
        
        <button 
          type="submit" 
          className="submit-button" 
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;