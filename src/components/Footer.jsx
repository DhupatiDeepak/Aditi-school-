import React from 'react';

export default function Footer() {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-wave-container">
        <svg className="footer-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.43,26.85,153.37,44.57,222.21,67.06,321.39,56.44Z" 
            fill="#0f172a"
          ></path>
        </svg>
      </div>
      
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-about">
            <h4 className="footer-logo">⭐ Aditi Littils</h4>
            <p>
              Recognised by Government of Telangana State. Providing a standard educational base with primary schooling, early childhood care, and interactive growth facilities since 2010.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About Philosophy</a></li>
              <li><a href="#programs" onClick={(e) => handleLinkClick(e, 'programs')}>Class Curriculums</a></li>
              <li><a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')}>Memory Gallery</a></li>
              <li><a href="#campuses" onClick={(e) => handleLinkClick(e, 'campuses')}>Find Campus</a></li>
            </ul>
          </div>
          <div className="footer-legal">
            <h4>Recognition</h4>
            <p>Reg No. TS/2010/BHEL</p>
            <p>Recognised Primary & Pre-School under the Board of Secondary Education, Telangana.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Aditi Littils School. All Rights Reserved. Built with ❤️ for your loved ones.</p>
        </div>
      </div>
    </footer>
  );
}
