import React, { useState } from 'react';

export default function ContactForm({ onSubmitSuccess, onSubmitError }) {
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Helper validation functions
  const isNameValid = (name) => name.trim().length > 0;
  const isPhoneValid = (phone) => /^[0-9]{10}$/.test(phone);
  const isEmailValid = (email) => {
    if (!email) return true; // optional field
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isClassValid = (cls) => cls !== '';

  const getGroupClass = (field, isValid) => {
    return `form-group ${touched[field] && !isValid ? 'invalid' : ''}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all required fields as touched
    setTouched({
      parentName: true,
      parentPhone: true,
      childName: true,
      admissionClass: true
    });

    const valid = 
      isNameValid(formData.parentName) &&
      isPhoneValid(formData.parentPhone) &&
      isEmailValid(formData.parentEmail) &&
      isNameValid(formData.childName) &&
      isClassValid(formData.admissionClass);

    if (valid) {
      onSubmitSuccess("Application submitted successfully! Our team will contact you shortly.");
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
    } else {
      onSubmitError("Please fill in all required fields accurately.");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">
        <div className="contact-grid">
          {/* Text Area */}
          <div className="contact-info scroll-reveal fade-left revealed">
            <h2 className="section-subtitle">Admissions Open</h2>
            <h3>Ready to Begin the Journey?</h3>
            <p>
              Enrollment is quick and easy. Submit an inquiry through our secure web portal, and our admissions team will schedule a campus tour for you and your child.
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

          {/* Form Area */}
          <div className="contact-form-card scroll-reveal fade-right revealed">
            <h3>Quick Inquiry Form</h3>
            <form id="inquiryForm" className="inquiry-form" onSubmit={handleSubmit} noValidate>
              
              <div className={getGroupClass('parentName', isNameValid(formData.parentName))}>
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
                <div className={getGroupClass('parentPhone', isPhoneValid(formData.parentPhone))}>
                  <input 
                    type="tel" 
                    id="parentPhone" 
                    className="form-control" 
                    required 
                    placeholder=" " 
                    pattern="^[0-9]{10}$"
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

              <div className="form-row">
                <div className={getGroupClass('childName', isNameValid(formData.childName))}>
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

                <div className={getGroupClass('admissionClass', isClassValid(formData.admissionClass))}>
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
                  <label htmlFor="admissionClass" className="form-label select-label">Class of Interest *</label>
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
                <label htmlFor="parentMessage" className="form-label">Additional Messages / Questions</label>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                <span>Submit Application</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
