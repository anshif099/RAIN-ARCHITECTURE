import filmsVideo from '../assets/video_films_3mbps.mp4'
import './FilmsSection.css'

export default function FilmsSection({ active, onNext }) {
  return (
    <div className={`films-section ${active ? 'films-section--active' : ''}`}>
      {/* Left side: White content panel */}
      <div className="films-panel">
        <span className="films-label">FILMS</span>
        <h1 className="films-title">Cinematic<br />Walkthroughs</h1>
        <p className="films-desc">
          Experience spaces in motion. We create{' '}
          <em>high-fidelity cinematic video tours and walkthroughs</em>{' '}
          that bring architectural designs to life with realistic movement, lighting, and scale.
        </p>
      </div>

      {/* Right side: Autoplay silent video */}
      <div className="films-video-container">
        <video
          src={filmsVideo}
          autoPlay
          loop
          muted
          playsInline
          className="films-video-el"
        />
      </div>

      {/* Premium Pill next page indicator */}
      <div className="films-next-pill" onClick={onNext} id="films-next-btn">
        <span className="films-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
