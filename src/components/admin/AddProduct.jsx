import React, { useState } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddProduct = ({ onBack }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    }
  };

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
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let imageUrl = '';
      
      // Upload image if selected
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `product-images/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Add product to Firestore
      await addDoc(collection(db, 'products'), {
        name,
        description,
        price: parseFloat(price),
        available,
        imageUrl,
        createdAt: new Date()
      });

      setSuccess('Product added successfully!');
      
      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setAvailable(true);
      setImage(null);
      setImagePreview('');
      
      setTimeout(() => {
        onBack(); // Return to product list after a delay
      }, 1500);
      
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.addProduct}>
      <div style={styles.formHeader}>
        <h2 style={styles.heading}>Add New Product</h2>
        <button 
          style={styles.backButton} 
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#e9ecef';
            e.currentTarget.style.borderColor = '#ced4da';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
            e.currentTarget.style.borderColor = '#ddd';
          }}
        >
          Back to Products
        </button>
      </div>
      
      {error && <div style={styles.errorMessage}>⚠️ {error}</div>}
      {success && <div style={styles.successMessage}>✅ {success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">Product Name</label>
          <input
            style={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            onFocus={(e) => {
              e.target.style.borderColor = '#feb47b';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(254, 180, 123, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#dde1e7';
              e.target.style.backgroundColor = '#f7f9fc';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="description">Description</label>
          <textarea
            style={styles.textarea}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            onFocus={(e) => {
              e.target.style.borderColor = '#feb47b';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(254, 180, 123, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#dde1e7';
              e.target.style.backgroundColor = '#f7f9fc';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="price">Price (₦)</label>
          <input
            style={styles.input}
            type="number"
            id="price"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            onFocus={(e) => {
              e.target.style.borderColor = '#feb47b';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(254, 180, 123, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#dde1e7';
              e.target.style.backgroundColor = '#f7f9fc';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="availability">Availability</label>
          <select
            style={styles.select}
            id="availability"
            value={available}
            onChange={(e) => setAvailable(e.target.value === 'true')}
            onFocus={(e) => {
              e.target.style.borderColor = '#feb47b';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(254, 180, 123, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#dde1e7';
              e.target.style.backgroundColor = '#f7f9fc';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="image">Product Image</label>
          <input
            style={styles.fileInput}
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        
        {imagePreview && (
          <div style={styles.imagePreview}>
            <img 
              src={imagePreview} 
              alt="Product preview" 
              style={styles.previewImg}
            />
          </div>
        )}
        
        <button 
          type="submit" 
          style={{
            ...styles.submitButton,
            ...(loading ? styles.submitButtonDisabled : {})
          }}
          disabled={loading}
          onMouseOver={(e) => {
            if (!loading) {
              e.currentTarget.style.background = 'linear-gradient(90deg, #ff7054, #fea968)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 126, 95, 0.3)';
            }
          }}
          onMouseOut={(e) => {
            if (!loading) {
              e.currentTarget.style.background = 'linear-gradient(90deg, #ff7e5f, #feb47b)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 126, 95, 0.2)';
            }
          }}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;