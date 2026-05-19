import aboutImg from '../assets/about_lines.avif'
import './AboutSection.css'

export default function AboutSection({ onNext }) {
  return (
    <section className="about-section" id="about">
      {/* Left — text content */}
      <div className="about-content-panel">
        <div className="about-content-inner">
          <span className="about-label">ABOUT</span>
          <h1 className="about-title">
            Bringing ideas<br />to Life
          </h1>
          <p className="about-description">
            We provide our clients with{' '}
            <em>top-class photorealistic 3D rendering services</em>{' '}
            including animations, still images, walkthroughs and{' '}
            <em>virtual reality tours</em>. We bring designs to{' '}
            <em>life with the latest technologies</em>.
          </p>
        </div>

        {/* Next page */}
        <div className="about-next" onClick={onNext} id="about-next-btn">
          <span className="about-next-label">next page</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </div>
      </div>

      {/* Right — image */}
      <div className="about-image-panel">
        <img
          src={aboutImg}
          alt="Architectural line drawing"
          className="about-image"
        />
      </div>
    </section>
  )
}
