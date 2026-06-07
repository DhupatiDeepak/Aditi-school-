import React, { useMemo } from 'react';

export default function DecorBackground() {
  // Generate bubbles and stars with useMemo to keep them stable across renders
  const bubbles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const size = Math.random() * 60 + 20; // Size from 20px to 80px
      const left = Math.random() * 95;      // Left position as percentage
      const delay = Math.random() * 20;     // Animation start delay
      const duration = Math.random() * 25 + 15; // Travel time from bottom to top (15s to 40s)
      const opacity = Math.random() * 0.45 + 0.1; // Bubble visibility opacity

      return {
        id: `bubble-${i}`,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          '--bubble-opacity': opacity
        }
      };
    });
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => {
      const size = Math.random() * 4 + 1.5;   // 1.5px to 5.5px
      const top = Math.random() * 95;    // Top position percentage
      const left = Math.random() * 95;   // Left position percentage
      const delay = Math.random() * 10;       // Animation delay
      const duration = Math.random() * 5 + 4;  // Twinkle frequency (4s to 9s)
      const glow = Math.random() > 0.5;       // Some stars glow more
      const type = i % 3 === 0 ? 'sparkle' : 'dot'; // 1 in 3 is a sparkle star

      return {
        id: `star-${i}`,
        type,
        style: {
          width: type === 'sparkle' ? `${size * 2}px` : `${size}px`,
          height: type === 'sparkle' ? `${size * 2}px` : `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          boxShadow: glow && type === 'dot' ? '0 0 6px 1px var(--clr-star-color)' : 'none'
        }
      };
    });
  }, []);

  return (
    <div className="decor-container">
      {/* Dynamic Rising Glass Bubbles */}
      {bubbles.map((bubble) => (
        <div 
          key={bubble.id} 
          className="floating-bubble" 
          style={bubble.style}
        />
      ))}

      {/* Dynamic Twinkling Space Stars */}
      {stars.map((star) => (
        <div 
          key={star.id} 
          className={`space-star ${star.type}`} 
          style={star.style}
        >
          {star.type === 'sparkle' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" fill="currentColor" />
            </svg>
          )}
        </div>
      ))}

      {/* Swaying Cloud SVGs */}
      <svg className="decor-svg cloud-1" viewBox="0 0 100 100" width="120" height="120">
        <path 
          d="M20 50 C20 40, 30 35, 40 38 C45 30, 60 30, 65 38 C75 35, 80 40, 80 50 C85 55, 85 65, 75 68 C70 72, 30 72, 25 68 C15 65, 15 55, 20 50 Z" 
          fill="rgba(255,255,255,0.45)"
        />
      </svg>
      <svg className="decor-svg cloud-2" viewBox="0 0 100 100" width="160" height="160">
        <path 
          d="M20 50 C20 40, 30 35, 40 38 C45 30, 60 30, 65 38 C75 35, 80 40, 80 50 C85 55, 85 65, 75 68 C70 72, 30 72, 25 68 C15 65, 15 55, 20 50 Z" 
          fill="rgba(255,255,255,0.3)"
        />
      </svg>

      {/* Swaying Balloons */}
      <div className="balloon balloon-1">🎈</div>
      <div className="balloon balloon-2">🎈</div>
    </div>
  );
}
