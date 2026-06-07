import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare } from 'lucide-react';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-actions-bar">
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/919133013035?text=Hello%2C%20I%20am%20interested%20in%20admissions%20at%20Aditi%20Littils%20School."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-action-btn whatsapp-float-btn shadow-floating"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={22} />
      </a>

      {/* Back to Top */}
      <button 
        className={`floating-action-btn back-to-top-btn shadow-floating ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}
