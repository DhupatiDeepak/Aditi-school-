import React from 'react';
import { Baby, Palette, Blocks, GraduationCap, ArrowRight } from 'lucide-react';

export default function Programs() {
  const tracks = [
    {
      age: "Age: 1.5 - 2.5 Years",
      icon: <Baby size={28} />,
      title: "Play Group",
      desc: "Focuses on tactile play, sensory discovery, motor coordination, and simple social interactions in a warm environment.",
      features: ["Story Telling Sessions", "Sensory Games", "Motor Skill Activities"],
      colorClass: "card-pink"
    },
    {
      age: "Age: 2.5 - 3.5 Years",
      icon: <Palette size={28} />,
      title: "Nursery",
      desc: "Early vocabulary enrichment, interactive arts and crafts, counting games, and structured routine awareness.",
      features: ["Creative Art & Clay Play", "Rhyme Recitations", "Interactive Puzzle Building"],
      colorClass: "card-yellow"
    },
    {
      age: "Age: 3.5 - 5.5 Years",
      icon: <Blocks size={28} />,
      title: "LKG & UKG",
      desc: "Foundations of reading (phonics), writing, mathematical readiness, basic science concepts, and speech confidence.",
      features: ["Phonics Reading Programs", "Logical Math Games", "Nature walks & Environment"],
      colorClass: "card-teal"
    },
    {
      age: "Age: 5.5 - 12 Years",
      icon: <GraduationCap size={28} />,
      title: "Primary (Classes I to VII)",
      desc: "Comprehensive primary education recognized by Govt. of T.S. focusing on analytical reasoning, social studies, and projects.",
      features: ["Computer Literacy", "Science Lab Projects", "Annual Sports & Speech Events"],
      colorClass: "card-violet"
    }
  ];

  return (
    <section className="programs-section" id="programs">
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
          <h2 className="section-subtitle">Academic Tracks</h2>
          <h3 className="section-title">Programs Designed For Every Stage</h3>
          <p className="section-desc">
            From early childhood motor-skills development to primary grade analytical science, our tracks are tailored to ignite potential.
          </p>
        </div>

        <div className="programs-grid">
          {tracks.map((track, idx) => (
            <div 
              key={idx} 
              className={`program-card scroll-reveal fade-up revealed ${track.colorClass}`} 
              data-delay={idx}
            >
              {/* Shine Sweep animation overlay */}
              <div className="shine-sweep"></div>
              
              <div className="program-badge font-number">{track.age}</div>
              <div className="program-content">
                <div className="program-icon-wrapper">
                  {track.icon}
                </div>
                <h3>{track.title}</h3>
                <p>{track.desc}</p>
                
                <ul className="program-features">
                  {track.features.map((feat, fIdx) => (
                    <li key={fIdx}>{feat}</li>
                  ))}
                </ul>

                <div className="program-card-footer">
                  <span className="learn-more-text">Explore Curriculum</span>
                  <ArrowRight className="learn-more-arrow" size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.14c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86C222.21,67.06,153.37,44.57,88.43,26.85,57.05,18.3,26.9,8.75,0,0V120H1200V92.83Z" 
            className="shape-fill" 
          ></path>
        </svg>
      </div>
    </section>
  );
}
