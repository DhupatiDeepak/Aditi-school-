import React, { useState, useEffect, useRef } from 'react';

export default function Hero({ onInquiryClick }) {
  const [typewriterText, setTypewriterText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const cardRef = useRef(null);

  const typewriterPhrases = [
    "for play-based growth.",
    "for creative learning.",
    "for safe childhood discovery.",
    "for strong academic beginnings."
  ];

  // Typewriter Loop
  useEffect(() => {
    let timer;
    const currentPhrase = typewriterPhrases[phraseIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypewriterText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 40);
    } else {
      timer = setTimeout(() => {
        setTypewriterText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 80);
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex(prev => (prev + 1) % typewriterPhrases.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  // Mouse Tilt handler
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 12; // max tilt degrees
    const rotateY = ((x - centerX) / centerX) * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s ease-out'
    });
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('programs');
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const headingWords = "Empowering Young Minds To Build The Future".split(" ");

  return (
    <section className="hero-section" id="hero">
      {/* Floating Blobs Background */}
      <div className="hero-floating-blobs">
        <div className="blob blob-indigo"></div>
        <div className="blob blob-purple"></div>
        <div className="blob blob-pink"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content scroll-reveal fade-left revealed">
          <div className="gov-tag">
            <span className="tag-star">★</span> Recognised by Govt. of T.S.
          </div>
          
          <h1 className="hero-title font-header">
            {headingWords.map((word, i) => (
              <span 
                key={i} 
                className="word-reveal gradient-text" 
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {word}&nbsp;
              </span>
            ))}
          </h1>

          <div className="hero-typewriter-container">
            <span className="hero-subtext">A nurturing place </span>
            <span className="typewriter-text" style={{ paddingRight: '2px' }}>
              {typewriterText}
            </span>
          </div>

          <p className="hero-desc">
            Since 2010, Aditi Littils School has provided a happy, secure environment that promotes curiosity, creativity, and cognitive development.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-inquiry-trigger btn-magnetic" onClick={onInquiryClick}>
              <span>Enroll Today</span>
              <svg className="arrow-icon" viewBox="0 0 24 24" width="18" height="18">
                <path 
                  d="M5 12h14M12 5l7 7-7 7" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <a href="#programs" className="btn btn-secondary btn-magnetic" onClick={handleExploreClick}>
              <span>Explore Classes</span>
            </a>
          </div>
        </div>
        
        {/* Right 3D Tilt Card Stack */}
        <div 
          className="hero-visual scroll-reveal fade-right revealed"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={tiltStyle}
        >
          <div className="hero-card-stack">
            <div className="hero-visual-card card-main">
              <div className="card-tag">Fun Activities</div>
              <div className="illustration-canvas">
                <div className="sun"></div>
                <div className="hill hill-1"></div>
                <div className="hill hill-2"></div>
                <div className="tree tree-1"></div>
                <div className="tree tree-2"></div>
                <div className="kite-fly">🪁</div>
              </div>
              <div className="card-caption">
                <h3>Active & Healthy Learning</h3>
                <p>Learning through games, nature, and social interactions.</p>
              </div>
            </div>
            <div className="hero-visual-card card-overlay shadow-floating">
              <div className="rating-badge">
                <span className="rating-star">⭐</span>
                <span className="rating-num">4.8</span>
              </div>
              <p className="rating-text">Loved by 200+ Families</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.43,26.85,153.37,44.57,222.21,67.06,321.39,56.44Z" 
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
}
