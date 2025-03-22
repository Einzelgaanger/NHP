import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { getAllProducts } from '../../firebase/firestore';
import Loading from '../common/Loading';

function UserPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Integrated styles
  const styles = {
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '2rem 1rem',
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
    },
    productCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '1rem',
    },
    productTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
    },
    productDescription: {
      color: '#4b5563',
    },
    productPrice: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      marginTop: '0.5rem',
    },
    addButton: {
      marginTop: '1rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      border: 'none',
      cursor: 'pointer',
    },
    emptyMessage: {
      textAlign: 'center',
      color: '#4b5563',
    },
  };

  // Media query handling
  const getGridStyle = () => {
    const width = window.innerWidth;
    let columns = '1fr';
    
    if (width >= 1024) columns = 'repeat(3, 1fr)'; // lg
    else if (width >= 768) columns = 'repeat(2, 1fr)'; // md
    
    return {
      ...styles.productsGrid,
      gridTemplateColumns: columns
    };
  };

  // Button hover effect
  const [hoveredButton, setHoveredButton] = useState(null);
  
  const getButtonStyle = (productId) => {
    return {
      ...styles.addButton,
      backgroundColor: hoveredButton === productId ? '#2563eb' : '#3b82f6', // darker blue on hover
    };
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData || []); // Ensure we always have an array
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Products</h2>
      {products && products.length > 0 ? (
        <div style={getGridStyle()}>
          {products.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <h3 style={styles.productTitle}>{product.name}</h3>
              <p style={styles.productDescription}>{product.description}</p>
              <p style={styles.productPrice}>R{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                onMouseEnter={() => setHoveredButton(product.id)}
                onMouseLeave={() => setHoveredButton(null)}
                style={getButtonStyle(product.id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.emptyMessage}>No products available.</p>
      )}
    </div>
  );
}

export default UserPanel;