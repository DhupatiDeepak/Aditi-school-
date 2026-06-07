import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header({ theme, onThemeToggle, onInquiryClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section indicator tracker
      const sections = ['about', 'programs', 'gallery', 'campuses', 'contact'];
      let currentSection = 'home';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
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
    }
  };

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`} id="mainHeader">
      <div className="header-container">
        <a href="#" className="logo" onClick={(e) => handleLinkClick(e, 'home')}>
          <span className="logo-icon">⭐</span>
          <div className="logo-text">
            <span className="logo-title">Aditi Littils</span>
            <span className="logo-subtitle">School</span>
          </div>
        </a>

        <nav className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`} id="navMenu">
          <ul className="nav-list">
            <li>
              <a 
                href="#" 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'about')}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="#programs" 
                className={`nav-link ${activeSection === 'programs' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'programs')}
              >
                Programs
              </a>
            </li>
            <li>
              <a 
                href="#gallery" 
                className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'gallery')}
              >
                Gallery
              </a>
            </li>
            <li>
              <a 
                href="#campuses" 
                className={`nav-link ${activeSection === 'campuses' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'campuses')}
              >
                Campuses
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="nav-link btn-inquiry-trigger"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  onInquiryClick();
                }}
              >
                Enquire Now
              </a>
            </li>
          </ul>
        </nav>

        {/* Actions bar (Theme Switch + Drawer buttons) */}
        <div className="header-actions-group">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            id="mobileMenuBtn" 
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
