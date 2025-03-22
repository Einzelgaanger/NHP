import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleEmailClick = () => {
    window.location.href = 'mailto:binfred.ke@gmail.com';
  };
  
  const handlePhoneClick = () => {
    window.location.href = 'tel:+254708758500';
  };
  
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/254708758500', '_blank');
  };

  // Inline CSS styles with jungle green color scheme
  const styles = `
    /* Main Footer Styles */
    .footer {
      background-color: #00321B; /* Jungle green dark shade */
      color: white;
      padding: 2.5rem 0 1.5rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .footer-container {
      max-width: 72rem;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    /* Responsive grid adjustments */
    @media (min-width: 640px) {
      .footer-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .footer-container {
        grid-template-columns: 1.5fr 1fr 1fr;
        gap: 3rem;
      }
    }

    .footer-section h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
      position: relative;
      padding-bottom: 0.75rem;
    }

    .footer-section h3::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      width: 40px;
      background-color: #0D996F; /* Jungle green medium shade */
    }

    .footer-section p {
      color: #E0E0E0;
      line-height: 1.6;
    }

    /* Contact Buttons */
    .contact-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .contact-button {
      display: flex;
      align-items: center;
      text-align: left;
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 0;
      font: inherit;
      transition: all 0.3s ease;
    }

    .contact-button:hover {
      color: #25D366; /* WhatsApp green for all contact hover states */
      transform: translateX(5px);
    }

    .icon {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.75rem;
    }

    /* Social Links */
    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 0.75rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background-color: #0D996F; /* Jungle green medium shade */
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .social-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    /* Footer Bottom */
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: 2.5rem;
      padding-top: 1.5rem;
      text-align: center;
    }

    .footer-bottom p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.875rem;
    }

    /* Logo section styling */
    .brand-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .brand-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
    }

    .brand-tagline {
      font-style: italic;
      color: #E0E0E0;
    }
  `;
  
  return (
    <>
      <style>{styles}</style>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section brand-section">
            <h3>Membu Naturals</h3>
            <p className="brand-tagline">Quality products for your natural hair journey</p>
            <p>We are dedicated to providing premium natural hair care products that nourish and celebrate your natural beauty.</p>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-buttons">
              <button onClick={handleEmailClick} className="contact-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Email</span>
              </button>
              
              <button onClick={handlePhoneClick} className="contact-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Call</span>
              </button>
              
              <button onClick={handleWhatsAppClick} className="contact-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Chat</span>
              </button>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Follow Us</h3>
            <p>Join our community for tips, updates, and special offers.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/membu.naturals?igsh=ZGx6ZHA2amQzMDU2" className="social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@membu_naturals?_t=ZM-8usXJwxnnXR&_r=1" className="social-link" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/share/1BNTY9bGpE/" className="social-link" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <svg xmlns="http://www.w3.org/2000/svg" className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Membu Naturals. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;