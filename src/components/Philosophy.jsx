import React from 'react';
import { ShieldCheck, Smile, Award, Users } from 'lucide-react';

export default function Philosophy() {
  const values = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Safe & Happy Environment",
      desc: "Secured campus with continuous child supervision, clean facilities, and child-safe materials.",
      colorClass: "card-color-1"
    },
    {
      icon: <Smile size={32} />,
      title: "Play-Based Foundations",
      desc: "Engaging activities, arts and crafts, role-play and puzzles that keep children laughing while learning.",
      colorClass: "card-color-2"
    },
    {
      icon: <Award size={32} />,
      title: "Govt. Recognized Curriculum",
      desc: "Officially recognized by the Govt of Telangana State, maintaining structured academic excellence.",
      colorClass: "card-color-3"
    },
    {
      icon: <Users size={32} />,
      title: "Experienced Mentors",
      desc: "Caring educators trained in child psychology and interactive pedagogy to guide your kids' growth.",
      colorClass: "card-color-4"
    }
  ];

  return (
    <section className="about-section" id="about">
      <div className="section-container">
        <div className="section-header scroll-reveal fade-up revealed">
          <h2 className="section-subtitle">Our Philosophy</h2>
          <h3 className="section-title">Where Big Dreams Start Small</h3>
          <p className="section-desc">
            We combine structured primary school curriculum with playful nursery practices to build a strong cognitive, social, and physical foundation.
          </p>
        </div>

        <div className="about-grid">
          {values.map((val, idx) => (
            <div 
              key={idx} 
              className={`about-card glass-card scroll-reveal fade-up revealed ${val.colorClass}`} 
              data-delay={idx}
            >
              {/* Shine sweep divider */}
              <div className="shine-sweep"></div>
              
              <div className="card-icon-wrapper bounce-icon-wrapper">
                {val.icon}
              </div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
