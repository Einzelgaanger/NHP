import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { createWhatsAppLink as generateWhatsAppLink } from '../../utils/whatsappLink';

const Cart = ({ onClose }) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    const whatsappUrl = generateWhatsAppLink(cartItems, total);
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  return (
    <div className="cart-overlay">
      <style jsx>{`
        /* Cart Component Styles */
        .cart-overlay {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 50;
          display: flex;
          justify-content: flex-end;
        }

        .cart-sidebar {
          background-color: white;
          width: 100%;
          max-width: 28rem;
          height: 100%;
          overflow-y: auto;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
        }

        .cart-header {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-header h2 {
          font-size: 1.25rem;
          font-weight: bold;
          color: #5f4339;
          margin: 0;
        }

        .close-button {
          font-size: 1.75rem;
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          line-height: 1;
          padding: 0;
        }

        .close-button:hover {
          color: #333;
        }

        .cart-items {
          flex: 1;
          padding: 1rem;
        }

        .empty-cart {
          text-align: center;
          padding: 2rem 0;
        }

        .empty-cart p {
          color: #666;
        }

        .cart-item-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .cart-item {
          padding: 1rem 0;
          display: flex;
          border-bottom: 1px solid #eee;
        }

        .cart-item:last-child {
          border-bottom: none;
        }

        .item-image-container {
          width: 4rem;
          height: 4rem;
          overflow: hidden;
          border-radius: 0.25rem;
        }

        .item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details {
          margin-left: 1rem;
          flex: 1;
        }

        .item-name {
          font-weight: 500;
          margin: 0 0 0.25rem 0;
        }

        .item-price {
          color: #666;
          font-size: 0.875rem;
          margin: 0 0 0.5rem 0;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          margin-top: 0.5rem;
        }

        .quantity-button {
          width: 1.5rem;
          height: 1.5rem;
          background-color: #f2f2f2;
          text-align: center;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
        }

        .quantity-button:hover {
          background-color: #e2e2e2;
        }

        .quantity-value {
          margin: 0 0.5rem;
        }

        .remove-button {
          background: none;
          border: none;
          color: #ef5350;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .remove-button:hover {
          color: #d32f2f;
        }

        .cart-footer {
          padding: 1rem;
          border-top: 1px solid #eee;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .total-label, .total-amount {
          font-weight: bold;
          color: #5f4339;
        }

        .checkout-button {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          text-align: center;
          font-weight: 500;
          color: white;
          border: none;
          cursor: pointer;
          background-color: #4caf50;
          transition: background-color 0.3s ease;
        }

        .checkout-button:hover:not(:disabled) {
          background-color: #3d8b40;
        }

        .checkout-button:disabled {
          background-color: #9e9e9e;
          cursor: not-allowed;
        }

        .clear-cart-button {
          width: 100%;
          margin-top: 0.5rem;
          padding: 0.5rem 1rem;
          border: 1px solid #ef5350;
          color: #ef5350;
          border-radius: 0.375rem;
          text-align: center;
          background-color: transparent;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .clear-cart-button:hover {
          background-color: #ffebee;
        }

        @media (max-width: 640px) {
          .cart-sidebar {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button 
            onClick={onClose}
            className="close-button"
          >
            &times;
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className="cart-item-list">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="item-image-container">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="item-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">{formatCurrency(item.price)}</p>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="quantity-button"
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cart-footer">
          <div className="total-row">
            <span className="total-label">Total:</span>
            <span className="total-amount">{formatCurrency(total)}</span>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="checkout-button"
          >
            Proceed via WhatsApp
          </button>
          {cartItems.length > 0 && (
            <button 
              onClick={clearCart}
              className="clear-cart-button"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;