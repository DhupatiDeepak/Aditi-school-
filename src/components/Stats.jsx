import React, { useState, useEffect, useRef } from 'react';

function Counter({ target, isTriggered }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isTriggered) {
      setCount(0);
      return;
    }

    let startTimestamp = null;
    const duration = 1800; // Counter animation speed (1.8 seconds)

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, isTriggered]);

  return <span>{count}</span>;
}

export default function Stats() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { target: 500, suffix: "+", label: "Happy Students" },
    { target: 15, suffix: "+", label: "Years Excellence" },
    { target: 50, suffix: "+", label: "Expert Teachers" },
    { target: 2, suffix: "", label: "Modern Campuses" }
  ];

  return (
    <section className="stats-section" id="stats" ref={sectionRef}>
      <div className="stats-overlay"></div>
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((item, idx) => (
            <div key={idx} className="stat-item scroll-reveal fade-up revealed">
              <div className="stat-number font-number">
                <Counter target={item.target} isTriggered={isInView} />
                {item.suffix}
              </div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
