import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "What is the teacher-to-student ratio?",
      a: "Our ratio is 1:12 for Playgroup & Nursery, and 1:18 for LKG/UKG and Primary. This ensures each child receives personal attention, care, and individual curriculum pacing."
    },
    {
      q: "Do you offer safe transport facilities?",
      a: "Yes! We run secure, GPS-tracked school vans covering Chanda Nagar, Ramachandrapuram, BHEL Township, Ashok Nagar, and surrounding Telangana communities with female supervisors onboard."
    },
    {
      q: "What are the age guidelines for admissions?",
      a: "Admissions depend on class tiers as follows:\n• Play Group: 1.5 to 2.5 Years\n• Nursery: 2.5 to 3.5 Years\n• LKG / UKG: 3.5 to 5.5 Years\n• Primary Classes I-VII: 5.5 Years and above."
    },
    {
      q: "Are the campus facilities air-conditioned & secured?",
      a: "Absolutely. Both of our campuses are child-proofed, secured with continuous CCTV monitoring, and fully climate-controlled (air-conditioned) to maintain active study comfort year-round."
    }
  ];

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="section-container">
        <div className="section-header scroll-reveal fade-up revealed">
          <h2 className="section-subtitle">Got Questions?</h2>
          <h3 className="section-title">Frequently Asked Questions</h3>
          <p className="section-desc">
            Find immediate answers regarding classroom operations, guidelines, fee structures, and registrations.
          </p>
        </div>

        <div className="faq-accordion-container scroll-reveal fade-up revealed">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item glass-card ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFAQ(idx)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  <button className="faq-toggle-icon" aria-label="Toggle answer">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                </div>
                
                <div 
                  className="faq-answer"
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? '1' : '0',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    overflow: 'hidden'
                  }}
                >
                  <p style={{ whiteSpace: 'pre-line' }}>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
