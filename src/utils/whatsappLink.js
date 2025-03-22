import { formatPriceValue } from './formatCurrency';

/**
 * Creates a WhatsApp link with a pre-populated message containing order details
 * @param {Array} cartItems - Array of items in the cart
 * @param {number} totalAmount - Total order amount
 * @returns {string} WhatsApp URL with message
 */
export const createWhatsAppLink = (cartItems, totalAmount) => {
  // Your business phone number with country code (replace with your actual number)
  const phoneNumber = '254708758500'; // Example: South Africa (+27)
  
  // Create order message
  let message = 'Hello! I would like to place an order for:%0A%0A';
  
  // Add each cart item to the message
  cartItems.forEach(item => {
    const itemTotal = item.price * item.quantity;
    message += `${item.quantity}x ${item.name} - R${formatPriceValue(itemTotal)}%0A`;
  });
  
  // Add the total amount
  message += `%0A*Total: R${formatPriceValue(totalAmount)}*%0A%0A`;
  
  // Add optional delivery information prompt
  message += 'Please let me know the delivery options and payment details.';
  
  // Create the WhatsApp URL with the message
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

/**
 * Opens the WhatsApp link in a new tab
 * @param {Array} cartItems - Array of items in the cart
 * @param {number} totalAmount - Total order amount
 */
export const openWhatsAppOrder = (cartItems, totalAmount) => {
  const whatsappUrl = createWhatsAppLink(cartItems, totalAmount);
  window.open(whatsappUrl, '_blank');
};

/**
 * Calculates the total amount for all items in the cart
 * @param {Array} cartItems - Array of items in the cart
 * @returns {number} Total amount
 */
export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};