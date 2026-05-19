import heroVideo from '../assets/video_hero_3mbps.mp4'
import './HeroSection.css'

export default function HeroSection({ onNext }) {

  return (
    <section className="hero-section" id="hero">
      {/* Left — video panel */}
      <div className="hero-video-panel">
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Right — content panel */}
      <div className="hero-content-panel">
        <div className="hero-content-inner">
          <span className="hero-label">3D RENDERINGS</span>
          <h1 className="hero-title">
            Architectural<br />Visualization
          </h1>
          <p className="hero-description">
            Rain Architecture produces <em>high quality Images, Animations,
            Walkthroughs and 360 Virtual reality Tours</em> for Architecture
            and Real Estate.
          </p>
        </div>

        <div className="hero-next" onClick={onNext} id="hero-next-btn">
          <div className="next-arrow">
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="12" y1="0" x2="12" y2="34" />
              <polyline points="4,26 12,36 20,26" />
            </svg>
          </div>
          <span className="next-label">next page</span>
        </div>
      </div>
    </section>
  )
}
