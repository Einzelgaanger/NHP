import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, image, description, price } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <style jsx>{`
        /* ProductCard Component Styles */
        .product-card {
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        
        .product-card:hover {
          transform: scale(1.05);
        }
        
        .product-image-container {
          height: 12rem;
          overflow: hidden;
        }
        
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .product-details {
          padding: 1rem;
        }
        
        .product-name {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: #5f4339;
        }
        
        .product-description {
          color: #666;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.75rem;
        }
        
        .product-price {
          font-weight: 700;
          font-size: 1.125rem;
          color: #5f4339;
        }
        
        .add-to-cart-button {
          background-color: #4caf50;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .add-to-cart-button:hover {
          background-color: #3d8b40;
        }
        
        @media (max-width: 640px) {
          .product-image-container {
            height: 10rem;
          }
          
          .product-name {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="product-image-container">
        <img 
          src={image} 
          alt={name} 
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder.jpg';
          }}
        />
      </div>
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">{formatCurrency(price)}</span>
          <button 
            onClick={handleAddToCart}
            className="add-to-cart-button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;