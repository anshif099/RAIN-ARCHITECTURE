import walkeA from '../assets/walkeweg_a.avif'
import walkeB from '../assets/walkeweg_b.avif'
import './ImagesFifthSection.css'

export default function ImagesFifthSection({ status, onNext }) {
  return (
    <div className={`images5-sec ${status}`}>
      {/* Left side: Full-bleed walkeweg A showcase */}
      <div className="images5-showcase">
        <img src={walkeA} alt="Areal Walkeweg Nord Basel A" className="images5-bg-el" />
        
        {/* Project description text and badge at bottom left */}
        <div className="images5-project-label">
          <span className="project-badge">1st Prize</span>
          <span className="project-type-bold-white">Areal Walkeweg Nord Basel</span>
          <span className="project-partner-regular-white">Parabase</span>
        </div>
      </div>

      {/* Right side: White content panel with walkeweg B image */}
      <div className="images5-panel">
        <div className="walkeB-container">
          <img src={walkeB} alt="Areal Walkeweg Nord Basel B" className="walkeB-img" />
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images5-next-pill" onClick={onNext} id="images5-next-btn">
        <span className="images5-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
