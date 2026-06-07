import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = [
    { 
      id: 0, 
      type: 'image', 
      src: '/image.png', 
      category: 'activities', 
      title: '7th Annual Day Celebrations', 
      desc: 'Our students dancing and celebrating key milestones on stage.' 
    },
    { 
      id: 1, 
      type: 'image', 
      src: '/image copy.png', 
      category: 'festivals', 
      title: 'Independence Day Pageant', 
      desc: 'Kids dressed in traditional attire celebrating national festivals.' 
    },
    { 
      id: 2, 
      type: 'image', 
      src: '/image copy 2.png', 
      category: 'festivals', 
      title: 'Annual Fun Festivities', 
      desc: 'Creative activities and Rangoli competitions celebrating cultural roots.' 
    },
    { 
      id: 3, 
      type: 'image', 
      src: '/image copy 3.png', 
      category: 'academic', 
      title: 'Academic Award Ceremony', 
      desc: 'Recognizing the dedication and brilliance of our little stars.' 
    },
    { 
      id: 4, 
      type: 'image', 
      src: '/image copy 4.png', 
      category: 'academic', 
      title: 'Science Discovery Lab', 
      desc: 'Interactive child science experiments and environmental studies.' 
    },
    { 
      id: 5, 
      type: 'image', 
      src: '/image.png', 
      category: 'activities', 
      title: 'Clay Play & Crafts', 
      desc: 'Improving motor skills and creativity with clay modeling.' 
    },
    { 
      id: 6, 
      type: 'image', 
      src: '/image copy.png', 
      category: 'activities', 
      title: 'Annual Sports Meet', 
      desc: 'Healthy physical games and athletic sprint awards.' 
    },
    { 
      id: 7, 
      type: 'image', 
      src: '/image copy 2.png', 
      category: 'academic', 
      title: 'Kids Tech & Coding', 
      desc: 'Introduction to tech basics and logical problem-solving blocks.' 
    }
  ];

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'activities', label: 'Activities' },
    { id: 'festivals', label: 'Festivals' },
    { id: 'academic', label: 'Academic' }
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-container">
        <div className="section-header scroll-reveal fade-up revealed">
          <h2 className="section-subtitle">Moments & Celebrations</h2>
          <h3 className="section-title">Life at Aditi Littils School</h3>
          <p className="section-desc">
            Explore snapshots of our student events, annual day performances, festival days, and laboratory workshops.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="gallery-filters scroll-reveal fade-up revealed">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => { setFilter(cat.id); setLightboxIndex(null); }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="gallery-masonry-grid scroll-reveal fade-up revealed">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="gallery-masonry-item card-magnetic"
              onClick={() => setLightboxIndex(index)}
            >
              <div className="gallery-masonry-card">
                {item.type === 'image' ? (
                  <img src={item.src} alt={item.title} loading="lazy" />
                ) : (
                  <div className={`gallery-masonry-illustration ${item.colorClass}`}>
                    <span className="gallery-masonry-art">{item.art}</span>
                  </div>
                )}
                
                <div className="gallery-masonry-overlay">
                  <Eye className="gallery-overlay-icon" size={24} />
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Overlay */}
      {lightboxIndex !== null && activeItem && (
        <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close-btn" onClick={() => setLightboxIndex(null)}>
            <X size={32} />
          </button>

          <button className="lightbox-nav-btn prev" onClick={handlePrev}>
            <ChevronLeft size={40} />
          </button>

          <div className="lightbox-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-media-wrapper">
              {activeItem.type === 'image' ? (
                <img src={activeItem.src} alt={activeItem.title} />
              ) : (
                <div className={`lightbox-illustration-view ${activeItem.colorClass}`}>
                  <span className="lightbox-large-art">{activeItem.art}</span>
                </div>
              )}
            </div>
            <div className="lightbox-caption">
              <h4>{activeItem.title}</h4>
              <p>{activeItem.desc}</p>
            </div>
          </div>

          <button className="lightbox-nav-btn next" onClick={handleNext}>
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
}
