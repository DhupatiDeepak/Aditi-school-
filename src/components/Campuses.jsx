import React from 'react';
import { MapPin, Phone, Mail, Navigation, ExternalLink, HelpCircle } from 'lucide-react';

export default function Campuses({ onVirtualTourClick }) {
  const locations = [
    {
      title: "Block A (Main Campus)",
      subtitle: "Primary & Pre-School Classes",
      address: "No 7/N, 1-40/2, 3/2, Shankar Nagar Rd, New Shankar Nagar, Chanda Nagar, Ramachandrapuram (BHEL Township), Hyderabad, Telangana 500050.",
      phones: ["+91 97005 94766", "+91 91330 13035"],
      mapLink: "https://www.google.com/maps/search/?api=1&query=Aditi+littils+school+Shankar+Nagar+Rd+Hyderabad",
      colorClass: "card-color-1"
    },
    {
      title: "Block B (Junior Campus)",
      subtitle: "Dedicated Play Group & Nursery",
      address: "Plot No 64, Behind Ashok Nagar, Near Avis Pharmacy, Shankar Nagar, Ashok Nagar-Ramachandra Puram, Hyderabad-502032, Telangana.",
      phones: ["+91 91330 13035"],
      email: "info@aditilittils.edu.in",
      mapLink: "https://www.google.com/maps/search/?api=1&query=Aditi+Littils+Play+School+Ashok+Nagar+Hyderabad",
      colorClass: "card-color-3"
    }
  ];

  return (
    <section className="campuses-section" id="campuses">
      <div className="section-divider-top">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.43,26.85,153.37,44.57,222.21,67.06,321.39,56.44Z" 
            className="shape-fill" 
          ></path>
        </svg>
      </div>

      <div className="section-container">
        <div className="section-header scroll-reveal fade-up revealed">
          <h2 className="section-subtitle">Locations</h2>
          <h3 className="section-title">Our Interactive Campuses</h3>
          <p className="section-desc">
            Conveniently situated in BHEL Township and Ashok Nagar, Hyderabad. Tap below to navigate or explore campus tours.
          </p>
        </div>

        <div className="campuses-grid">
          {locations.map((loc, idx) => (
            <div 
              key={idx} 
              className="campus-card glass-card scroll-reveal fade-up revealed"
              data-delay={idx}
            >
              <div className="shine-sweep"></div>
              
              <div className={`campus-header ${loc.colorClass}`}>
                <h4>{loc.title}</h4>
                <span>{loc.subtitle}</span>
              </div>
              
              <div className="campus-body">
                <p className="campus-address">
                  <MapPin size={18} className="map-pin-icon" />
                  <span>{loc.address}</span>
                </p>
                
                <div className="campus-contact">
                  {loc.phones.map((phone, pIdx) => (
                    <span key={pIdx}>📞 {phone}</span>
                  ))}
                  {loc.email && (
                    <span>📧 {loc.email}</span>
                  )}
                </div>

                <div className="campus-card-actions">
                  <a 
                    href={loc.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline"
                  >
                    <Navigation size={16} />
                    <span>Get Directions</span>
                  </a>
                  
                  <button 
                    className="btn btn-secondary"
                    onClick={() => onVirtualTourClick(loc.title)}
                  >
                    <ExternalLink size={16} />
                    <span>3D Virtual Tour</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
