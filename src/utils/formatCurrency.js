/**
 * Formats a number as currency (ZAR - South African Rand)
 * @param {number} amount - The amount to format
 * @returns {string} The formatted currency string
 */
export const formatCurrency = (amount) => {
  // Using Intl.NumberFormat for proper currency formatting
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Formats a number as currency without the currency symbol
 * @param {number} amount - The amount to format
 * @returns {string} The formatted number string
 */
export const formatPriceValue = (amount) => {
  return new Intl.NumberFormat('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Parses a formatted currency string back to a number
 * @param {string} formattedAmount - The formatted currency string
 * @returns {number} The parsed number
 */
export const parseCurrencyValue = (formattedAmount) => {
  // Remove currency symbol, spaces, and commas
  const cleanedString = formattedAmount.replace(/[^\d.-]/g, '');
  return parseFloat(cleanedString);
};