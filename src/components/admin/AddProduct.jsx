import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { realtimeDb, storage } from '../../firebase/config';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddProduct = ({ onBack }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Advanced inline styles
  const styles = {
    addProduct: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      padding: '30px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    formHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      paddingBottom: '15px',
      borderBottom: '1px solid #f0f0f0',
    },
    heading: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#333',
      margin: '0',
    },
    backButton: {
      backgroundColor: '#f8f9fa',
      color: '#495057',
      border: '1px solid #ddd',
      borderRadius: '6px',
      padding: '8px 16px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: '500',
    },
    errorMessage: {
      backgroundColor: '#ffebee',
      color: '#d32f2f',
      padding: '12px 16px',
      borderRadius: '6px',
      marginBottom: '20px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    successMessage: {
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
      padding: '12px 16px',
      borderRadius: '6px',
      marginBottom: '20px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      backgroundColor: '#f7f9fc',
      border: '1px solid #dde1e7',
      borderRadius: '8px',
      fontSize: '15px',
      transition: 'border 0.2s ease, background 0.2s ease',
      outline: 'none',
    },
    textarea: {
      width: '100%',
      padding: '12px 14px',
      backgroundColor: '#f7f9fc',
      border: '1px solid #dde1e7',
      borderRadius: '8px',
      fontSize: '15px',
      transition: 'border 0.2s ease, background 0.2s ease',
      outline: 'none',
      minHeight: '120px',
      resize: 'vertical',
    },
    select: {
      width: '100%',
      padding: '12px 14px',
      backgroundColor: '#f7f9fc',
      border: '1px solid #dde1e7',
      borderRadius: '8px',
      fontSize: '15px',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23555\' d=\'M6 8.825c-.2 0-.4-.1-.5-.2l-3.5-3.5c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.9 2.9 2.9-2.9c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.5 3.5c-.1.1-.3.2-.5.2z\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 14px center',
      outline: 'none',
    },
    fileInput: {
      display: 'block',
      width: '100%',
      padding: '10px',
      border: '1px dashed #dde1e7',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      cursor: 'pointer',
    },
    imagePreview: {
      marginBottom: '20px',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid #dde1e7',
    },
    previewImg: {
      width: '100%',
      maxHeight: '300px',
      objectFit: 'contain',
      backgroundColor: '#f8f9fa',
      padding: '10px',
    },
    submitButton: {
      width: '100%',
      background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '14px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 12px rgba(255, 126, 95, 0.2)',
    },
    submitButtonDisabled: {
      opacity: '0.7',
      cursor: 'not-allowed',
      background: 'linear-gradient(90deg, #ccc, #ddd)',
      boxShadow: 'none'
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError('');
  
      try {
        let imageUrl = '';
        
        if (image) {
          const imageRef = storageRef(storage, `products/${Date.now()}_${image.name}`);
          const snapshot = await uploadBytes(imageRef, image);
          imageUrl = await getDownloadURL(snapshot.ref);
        }
  
        const productsRef = ref(realtimeDb, 'products');
        const newProductRef = push(productsRef);
        
        await set(newProductRef, {
          id: newProductRef.key,
          name,
          description,
          price: parseFloat(price),
          available,
          imageUrl,
          createdAt: Date.now()
        });
  
        setSuccess('Product added successfully!');
        setTimeout(() => {
          onBack();
        }, 1500);
        
      } catch (err) {
        console.error('Error adding product:', err);
        setError('Failed to add product. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price (₦)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
            required
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Availability</label>
          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value === 'true')}
            className="w-full p-2 border rounded"
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Product Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            accept="image/*"
            required
          />
          {imagePreview && (
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="mt-2 max-w-xs rounded"
            />
          )}
        </div>
  
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };
  
  export default AddProduct;