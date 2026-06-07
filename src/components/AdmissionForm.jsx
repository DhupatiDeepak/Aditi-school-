import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, Send } from 'lucide-react';

export default function AdmissionForm({ onSubmitSuccess, onSubmitError }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    childName: '',
    admissionClass: '',
    parentMessage: ''
  });

  const [touched, setTouched] = useState({
    parentName: false,
    parentPhone: false,
    childName: false,
    admissionClass: false
  });

  const canvasRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isNameValid = (name) => name.trim().length > 0;
  const isPhoneValid = (phone) => /^[0-9]{10}$/.test(phone);
  const isEmailValid = (email) => {
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isClassValid = (cls) => cls !== '';

  const isStep1Valid = () => {
    return isNameValid(formData.parentName) && isPhoneValid(formData.parentPhone) && isEmailValid(formData.parentEmail);
  };

  const isStep2Valid = () => {
    return isNameValid(formData.childName) && isClassValid(formData.admissionClass);
  };

  const nextStep = (e) => {
    e.preventDefault();
    setTouched({
      parentName: true,
      parentPhone: true,
      childName: false,
      admissionClass: false
    });

    if (isStep1Valid()) {
      setStep(2);
    } else {
      onSubmitError("Please complete all parent contact fields correctly.");
    }
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const fireConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#3B82F6', '#06B6D4', '#F59E0B', '#10B981'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18 - 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        gravity: 0.25,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;
      particles.forEach((p) => {
        if (p.alpha > 0) {
          active = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.alpha -= p.decay;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      if (active) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      parentName: true,
      parentPhone: true,
      childName: true,
      admissionClass: true
    });

    if (isStep1Valid() && isStep2Valid()) {
      setIsSubmitting(true);
      
      // Simulate API submit latency
      setTimeout(() => {
        setIsSubmitting(false);
        fireConfetti();
        onSubmitSuccess("Application submitted successfully! Check your inbox.");
        
        // Reset form data
        setFormData({
          parentName: '',
          parentPhone: '',
          parentEmail: '',
          childName: '',
          admissionClass: '',
          parentMessage: ''
        });
        setTouched({
          parentName: false,
          parentPhone: false,
          childName: false,
          admissionClass: false
        });
        setStep(1);
      }, 1500);
    } else {
      onSubmitError("Please complete the required details correctly.");
    }
  };

  return (
    <section className="contact-section" id="contact">
      {/* Confetti overlay canvas */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 10000
        }}
      />

      <div className="section-container">
        <div className="contact-grid">
          {/* Info coordinates */}
          <div className="contact-info scroll-reveal fade-left revealed">
            <h2 className="section-subtitle">Admissions Open 2026-27</h2>
            <h3>Ready to Begin the Journey?</h3>
            <p>
              Enrollment is quick and easy. Submit an inquiry through our secure multi-step portal, and our admissions team will schedule a campus tour for you and your child.
            </p>
            <div className="contact-meta">
              <div className="meta-item">
                <span className="meta-icon">⏰</span>
                <div>
                  <h4>Timings</h4>
                  <p>Mon - Sat: 8:15 AM - 4:00 PM</p>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>admissions@aditilittils.edu.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form wrapper */}
          <div className="contact-form-card scroll-reveal fade-right revealed">
            <div className="form-card-header">
              <h3>Quick Inquiry Form</h3>
              
              {/* Progressive indicator bar */}
              <div className="form-progress-indicator">
                <div 
                  className="progress-line-fill" 
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
                <span className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</span>
                <span className={`step-dot ${step === 2 ? 'active' : ''}`}>2</span>
              </div>
            </div>

            <form id="inquiryForm" className="inquiry-form" onSubmit={handleSubmit} noValidate>
              
              {step === 1 && (
                <div className="form-step-content animate-fade-in">
                  <div className={`form-group ${touched.parentName && !isNameValid(formData.parentName) ? 'invalid' : ''}`}>
                    <input 
                      type="text" 
                      id="parentName" 
                      className="form-control" 
                      required 
                      placeholder=" "
                      value={formData.parentName}
                      onChange={handleChange}
                      onBlur={() => handleBlur('parentName')}
                    />
                    <label htmlFor="parentName" className="form-label">Parent's Name *</label>
                    <span className="error-msg">Please enter your name</span>
                  </div>

                  <div className="form-row">
                    <div className={`form-group ${touched.parentPhone && !isPhoneValid(formData.parentPhone) ? 'invalid' : ''}`}>
                      <input 
                        type="tel" 
                        id="parentPhone" 
                        className="form-control" 
                        required 
                        placeholder=" " 
                        value={formData.parentPhone}
                        onChange={handleChange}
                        onBlur={() => handleBlur('parentPhone')}
                      />
                      <label htmlFor="parentPhone" className="form-label">Phone Number *</label>
                      <span className="error-msg">Enter a valid 10-digit number</span>
                    </div>

                    <div className={`form-group ${formData.parentEmail && !isEmailValid(formData.parentEmail) ? 'invalid' : ''}`}>
                      <input 
                        type="email" 
                        id="parentEmail" 
                        className="form-control" 
                        placeholder=" "
                        value={formData.parentEmail}
                        onChange={handleChange}
                      />
                      <label htmlFor="parentEmail" className="form-label">Email Address</label>
                      <span className="error-msg">Enter a valid email address</span>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-block" onClick={nextStep}>
                    <span>Continue Details</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="form-step-content animate-fade-in">
                  <div className="form-row">
                    <div className={`form-group ${touched.childName && !isNameValid(formData.childName) ? 'invalid' : ''}`}>
                      <input 
                        type="text" 
                        id="childName" 
                        className="form-control" 
                        required 
                        placeholder=" "
                        value={formData.childName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('childName')}
                      />
                      <label htmlFor="childName" className="form-label">Child's Name *</label>
                      <span className="error-msg">Child's name is required</span>
                    </div>

                    <div className={`form-group ${touched.admissionClass && !isClassValid(formData.admissionClass) ? 'invalid' : ''}`}>
                      <select 
                        id="admissionClass" 
                        className="form-control" 
                        required
                        value={formData.admissionClass}
                        onChange={handleChange}
                        onBlur={() => handleBlur('admissionClass')}
                      >
                        <option value="" disabled hidden></option>
                        <option value="playgroup">Play Group</option>
                        <option value="nursery">Nursery</option>
                        <option value="lkg_ukg">LKG / UKG</option>
                        <option value="primary">Primary (Class I-VII)</option>
                      </select>
                      <label htmlFor="admissionClass" className="form-label select-label">Class *</label>
                      <span className="error-msg">Please select a class</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea 
                      id="parentMessage" 
                      className="form-control" 
                      placeholder=" " 
                      rows="3"
                      value={formData.parentMessage}
                      onChange={handleChange}
                    ></textarea>
                    <label htmlFor="parentMessage" className="form-label">Messages / Questions</label>
                  </div>

                  <div className="form-step-actions">
                    <button className="btn btn-secondary" onClick={prevStep}>
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>
                    
                    <button 
                      type="submit" 
                      className={`btn btn-primary btn-block ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loader-spinner"></span>
                          <span>Booking...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
