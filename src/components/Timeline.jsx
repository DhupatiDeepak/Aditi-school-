import React from 'react';

export default function Timeline() {
  const steps = [
    {
      year: "Step 1: Early Discovery",
      title: "Play Group (1.5 - 2.5 Years)",
      desc: "Tactile playing, sensory discovery, baby games, motor coordination skills, and initial peer interactions in a cozy environment.",
      icon: "🧸"
    },
    {
      year: "Step 2: Creative Roots",
      title: "Nursery (2.5 - 3.5 Years)",
      desc: "Language enrichment, interactive rhyming recitations, arts and crafts, counting blocks, and basic daily routines.",
      icon: "🎨"
    },
    {
      year: "Step 3: Foundational Literacy",
      title: "LKG & UKG (3.5 - 5.5 Years)",
      desc: "Early phonics, letter writes, reading, basic math addition concepts, speech workshops, and environmental walks.",
      icon: "🔤"
    },
    {
      year: "Step 4: Academic Launchpad",
      title: "Primary (Classes I to VII)",
      desc: "Telangana Govt. recognized curriculum focusing on analytical studies, computer sciences, laboratory experiments, sports, and annual debate events.",
      icon: "📚"
    }
  ];

  return (
    <section className="timeline-section" id="timeline">
      <div className="section-container">
        <div className="section-header scroll-reveal fade-up revealed">
          <h2 className="section-subtitle">Academic Timeline</h2>
          <h3 className="section-title">The Student Journey</h3>
          <p className="section-desc">
            See how your child grows from early motor-sensory play to primary grade leadership and technology literacy.
          </p>
        </div>

        <div className="timeline-wrapper">
          <div className="timeline-line"></div>
          
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'} scroll-reveal fade-up revealed`}
              data-delay={idx}
            >
              <div className="timeline-dot font-number">{idx + 1}</div>
              
              <div className="timeline-card glass-card">
                <div className="shine-sweep"></div>
                <div className="timeline-card-header">
                  <span className="timeline-icon">{step.icon}</span>
                  <span className="timeline-year font-number">{step.year}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
