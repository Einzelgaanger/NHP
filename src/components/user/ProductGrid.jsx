import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Integrated CSS styles as an object
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1.5rem',
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      marginBottom: '1.5rem',
      border: '1px solid #e2e8f0',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      outline: 'none',
    },
    emptyMessage: {
      textAlign: 'center',
      padding: '2rem 0',
    },
    emptyMessageText: {
      fontSize: '1.125rem',
      color: '#718096',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '1.5rem',
    },
    // Media query styles will be handled with conditional rendering
    // since inline styles don't support media queries directly
  };

  // Responsive grid adjustment based on window width
  const getGridStyle = () => {
    const width = window.innerWidth;
    let columns = '1fr';
    
    if (width >= 1024) columns = 'repeat(4, 1fr)';
    else if (width >= 768) columns = 'repeat(3, 1fr)';
    else if (width >= 640) columns = 'repeat(2, 1fr)';
    
    return {
      ...styles.grid,
      gridTemplateColumns: columns
    };
  };

  return (
    <div style={styles.container}>
      <div>
        <input
          type="text"
          placeholder="Search products..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div style={styles.emptyMessage}>
          <p style={styles.emptyMessageText}>No products found matching "{searchTerm}"</p>
        </div>
      ) : (
        <div style={getGridStyle()}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;