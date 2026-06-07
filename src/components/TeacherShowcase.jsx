import React, { useState } from 'react';
import { Mail, GraduationCap, Star } from 'lucide-react';

export default function TeacherShowcase() {
  const teachers = [
    {
      photo: "/teacher_aditi.png",
      initials: "AR",
      name: "Mrs. Aditi Reddy",
      role: "Founder & Director",
      specialty: "Child Psychology & Early Care",
      email: "director@aditilittils.edu.in",
      experience: "18+ Years",
      accentColor: "var(--clr-secondary)"
    },
    {
      photo: "/teacher_sarah.png",
      initials: "SK",
      name: "Ms. Sarah Khan",
      role: "Pre-Primary Head",
      specialty: "Sensory Play & Phonics Reading",
      email: "sarah.k@aditilittils.edu.in",
      experience: "11 Years",
      accentColor: "var(--clr-primary)"
    },
    {
      photo: "/teacher_ramesh.png",
      initials: "RN",
      name: "Mr. Ramesh Naidu",
      role: "Primary Coordinator",
      specialty: "Analytical Math & Logic Blocks",
      email: "ramesh.n@aditilittils.edu.in",
      experience: "14 Years",
      accentColor: "var(--clr-teal)"
    },
    {
      photo: "/teacher_lakshmi.png",
      initials: "LD",
      name: "Mrs. Lakshmi Devi",
      role: "Senior Science Mentor",
      specialty: "Practical Science & Environment",
      email: "lakshmi.d@aditilittils.edu.in",
      experience: "20+ Years",
      accentColor: "var(--clr-violet)"
    }
  ];

  return (
    <section className="teacher-section" id="teachers">
      <div className="section-container">
        <div className="section-header scroll-reveal fade-up revealed">
          <h2 className="section-subtitle">Our Mentors</h2>
          <h3 className="section-title">Dedicated, Caring Educators</h3>
          <p className="section-desc">
            Our certified teachers are trained in child psychology, early pedagogical models, and interactive learning methodologies.
          </p>
        </div>

        <div className="teachers-grid">
          {teachers.map((teach, idx) => (
            <TeacherCard key={idx} teach={teach} delay={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeacherCard({ teach, delay }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="teacher-card glass-card scroll-reveal fade-up revealed"
      data-delay={delay}
    >
      <div className="shine-sweep"></div>

      {/* Photo ring */}
      <div className="teacher-photo-ring" style={{ '--accent': teach.accentColor }}>
        {!imgError ? (
          <img
            src={teach.photo}
            alt={teach.name}
            className="teacher-photo"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="teacher-initials-fallback" style={{ background: teach.accentColor }}>
            {teach.initials}
          </div>
        )}
        {/* Experience badge */}
        <div className="teacher-exp-badge" style={{ background: teach.accentColor }}>
          <Star size={9} fill="currentColor" />
          <span>{teach.experience}</span>
        </div>
      </div>

      <div className="teacher-info">
        <h4>{teach.name}</h4>
        <span className="teacher-role" style={{ color: teach.accentColor }}>{teach.role}</span>

        <div className="teacher-details">
          <div className="detail-item">
            <GraduationCap size={15} />
            <span>{teach.specialty}</span>
          </div>
          <div className="detail-item">
            <Mail size={15} />
            <span>{teach.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
