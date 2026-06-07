import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const reviews = [
    {
      stars: 5,
      quote: "My daughter started Play Group here last year. The educators are incredibly patient, and the interactive daily activities kept us completely assured about her early social growth.",
      author: "Anitha Reddy",
      relation: "Mother of Viha (Nursery Class)"
    },
    {
      stars: 5,
      quote: "The government recognition combined with structure gives long-term peace of mind. The primary classes introducing computer literacy and analytical labs early is truly commendable.",
      author: "Srinivas Rao K.",
      relation: "Father of Aravind (Class III)"
    },
    {
      stars: 5,
      quote: "Block B junior campus is a absolute children's paradise. Extremely clean, 100% child-safe, and the creative clay-modeling/phonic programs are highly structured.",
      author: "Dr. Priya Sharma",
      relation: "Mother of Kabir (LKG Class)"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-container">
        <div className="section-header scroll-reveal fade-up revealed">
          <h2 className="section-subtitle">Parent Feedback</h2>
          <h3 className="section-title">What Families Say About Us</h3>
          <p className="section-desc">
            Read real reviews and success stories from parents who chose Aditi Littils School for early developmental milestones.
          </p>
        </div>

        <div className="testimonials-slider-wrapper scroll-reveal fade-up revealed">
          <div className="quote-icon-decor">
            <Quote size={80} />
          </div>

          <div className="testimonials-track">
            {reviews.map((rev, idx) => (
              <div 
                key={idx} 
                className={`testimonial-slide-card glass-card ${idx === activeIdx ? 'active' : ''}`}
                style={{
                  display: idx === activeIdx ? 'block' : 'none',
                  animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}
              >
                <div className="stars-row">
                  {Array.from({ length: rev.stars }).map((_, sIdx) => (
                    <Star key={sIdx} size={20} className="star-icon fill-amber" />
                  ))}
                </div>
                <p className="testimonial-quote">"{rev.quote}"</p>
                <div className="testimonial-author">
                  <span className="author-avatar">⭐</span>
                  <div>
                    <h4>{rev.author}</h4>
                    <span>{rev.relation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress loader dots */}
          <div className="carousel-dots">
            {reviews.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === activeIdx ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
