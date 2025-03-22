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

  // Inline CSS styles
  const styles = `
    /* Main Footer Styles */
    .footer {
      background-color: #1b5e20;
      color: white;
      padding: 2rem 0;
    }

    .footer-container {
      max-width: 72rem;
      margin: 0 auto;
      padding: 0 1rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 768px) {
      .footer-container {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .footer-section h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .footer-section p {
      color: #e8f5e9;
    }

    /* Contact Buttons */
    .contact-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
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
      transition: color 0.2s ease;
    }

    .contact-button:hover {
      color: #81c784;
    }

    .icon {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.5rem;
    }

    /* Social Links */
    .social-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .social-link {
      text-decoration: none;
      color: inherit;
      transition: color 0.2s ease;
    }

    .social-link:hover {
      color: #81c784;
    }

    /* Footer Bottom */
    .footer-bottom {
      border-top: 1px solid #2e7d32;
      margin-top: 2rem;
      padding-top: 1rem;
      text-align: center;
    }

    .footer-bottom p {
      color: #c8e6c9;
    }
  `;
  
  return (
    <>
      <style>{styles}</style>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Natural Hair Products</h3>
            <p>Quality products for your natural hair journey</p>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-buttons">
              <button onClick={handleEmailClick} className="contact-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Email Me</span>
              </button>
              
              <button onClick={handlePhoneClick} className="contact-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Call Us</span>
              </button>
              
              <button onClick={handleWhatsAppClick} className="contact-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://www.instagram.com/membu.naturals?igsh=ZGx6ZHA2amQzMDU2" className="social-link">Instagram</a>
              <a href="https://www.tiktok.com/@membu_naturals?_t=ZM-8usXJwxnnXR&_r=1" className="social-link">TikTok</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Natural Hair Products. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;