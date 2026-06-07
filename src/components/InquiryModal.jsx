import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Send } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose, onSubmitSuccess, onSubmitError }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    admissionClass: ''
  });

  const [touched, setTouched] = useState({
    parentName: false,
    parentPhone: false,
    admissionClass: false
  });

  // Esc key closure
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isNameValid = (name) => name.trim().length > 0;
  const isPhoneValid = (phone) => /^[0-9]{10}$/.test(phone);
  const isClassValid = (cls) => cls !== '';

  const handleNext = (e) => {
    e.preventDefault();
    setTouched((prev) => ({ ...prev, parentName: true, parentPhone: true }));
    if (isNameValid(formData.parentName) && isPhoneValid(formData.parentPhone)) {
      setStep(2);
    } else {
      onSubmitError("Please complete your contact details.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched((prev) => ({ ...prev, admissionClass: true }));

    if (isNameValid(formData.parentName) && isPhoneValid(formData.parentPhone) && isClassValid(formData.admissionClass)) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onSubmitSuccess("Screening request sent! Look out for a confirmation text.");
        setFormData({
          parentName: '',
          parentPhone: '',
          admissionClass: ''
        });
        setTouched({
          parentName: false,
          parentPhone: false,
          admissionClass: false
        });
        setStep(1);
        onClose();
      }, 1200);
    } else {
      onSubmitError("Please select a classroom tier.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={handleOverlayClick} id="inquiryModal">
      <div className="modal-card glass-card">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        
        <div className="modal-header">
          <h2>Admissions Open 2026-27</h2>
          <p>Submit details below to reserve an interactive screening slot!</p>
          
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

        <div className="modal-body">
          <form id="modalInquiryForm" className="inquiry-form" onSubmit={handleSubmit} noValidate>
            
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
                  <span className="error-msg">Enter valid 10-digit number</span>
                </div>

                <button className="btn btn-primary btn-block" onClick={handleNext}>
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-step-content animate-fade-in">
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
                  <span className="error-msg">Select classroom tier</span>
                </div>

                <div className="form-step-actions">
                  <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); setStep(1); }}>
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
                        <span>Submit Details</span>
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
  );
}
