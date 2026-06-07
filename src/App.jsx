import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DecorBackground from './components/DecorBackground';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Programs from './components/Programs';
import Stats from './components/Stats';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import TeacherShowcase from './components/TeacherShowcase';
import FAQ from './components/FAQ';
import Campuses from './components/Campuses';
import AdmissionForm from './components/AdmissionForm';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';
import Toast from './components/Toast';

// Premium Utilities
import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import ChatAssistant from './components/ChatAssistant';
import FloatingActions from './components/FloatingActions';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [theme, setTheme] = useState(() => {
    // Read whatever the blocking inline script already set (defaults to 'dark')
    return localStorage.getItem('theme') || 'dark';
  });

  // Apply dark mode theme class to HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    // Clear the inline bg set by the blocking script — let CSS variables take over
    root.style.backgroundColor = '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Toast notifications handlers
  const triggerToast = (message, isError = false) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, isError }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Trigger virtual 3D tour
  const startVirtualTour = (campusName) => {
    triggerToast(`Launching 360° Virtual Tour of ${campusName}... Enjoy exploring our child-safe spaces!`, false);
  };

  // Scroll Reveal elements trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.scroll-reveal');
      
      if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const delay = el.getAttribute('data-delay');
              if (delay) {
                el.style.transitionDelay = `${delay * 0.15}s`;
              }
              el.classList.add('revealed');
              observer.unobserve(el);
            }
          });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const delay = el.getAttribute('data-delay');
            if (delay) {
              el.style.transitionDelay = `${delay * 0.15}s`;
            }
            el.classList.add('revealed');
          } else {
            revealObserver.observe(el);
          }
        });
      } else {
        revealElements.forEach((el) => el.classList.add('revealed'));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={theme === 'dark' ? 'dark-theme-wrapper' : 'light-theme-wrapper'}>
      {/* Top scroll loader progress */}
      <ScrollProgress />

      {/* Mouse tracker glow pointer */}
      <CursorGlow />

      {/* Dynamic Background bubble particles */}
      <DecorBackground />

      {/* Navigation header with sticky and theme switch */}
      <Header 
        theme={theme} 
        onThemeToggle={toggleTheme} 
        onInquiryClick={() => setIsModalOpen(true)} 
      />

      <main>
        {/* Sections */}
        <Hero onInquiryClick={() => setIsModalOpen(true)} />
        <Philosophy />
        <Programs />
        <Stats />
        <Timeline />
        <Gallery />
        <Testimonials />
        <TeacherShowcase />
        <FAQ />
        <Campuses onVirtualTourClick={startVirtualTour} />
        <AdmissionForm 
          onSubmitSuccess={(msg) => triggerToast(msg, false)}
          onSubmitError={(msg) => triggerToast(msg, true)}
        />
      </main>

      {/* Floating tools bar (WhatsApp query + Back to top) */}
      <FloatingActions />

      {/* Floating chatbot assistant */}
      <ChatAssistant />

      {/* Footer credits */}
      <Footer />

      {/* Inquiry modal popup */}
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={(msg) => triggerToast(msg, false)}
        onSubmitError={(msg) => triggerToast(msg, true)}
      />

      {/* Alert logs list */}
      <div className="toast-container" id="toastContainer">
        {toasts.map((toast) => (
          <Toast 
            key={toast.id}
            message={toast.message}
            isError={toast.isError}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}
