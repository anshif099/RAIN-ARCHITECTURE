import terImage from '../assets/ter.avif'
import williamsburgImage from '../assets/williamsburg.avif'
import './ImagesTenthSection.css'

export default function ImagesTenthSection({ status, onNext }) {
  return (
    <div className={`images10-sec ${status}`}>
      {/* Left side: White content panel with Ter House image */}
      <div className="images10-panel">
        <div className="ter-container">
          <img src={terImage} alt="Ter House" className="ter-img" />
        </div>
        
        {/* Project description text at bottom left */}
        <div className="images10-project-label">
          <span className="project-type-bold">Ter House</span>{' '}
          <span className="project-partner-regular">Mesura</span>
        </div>
      </div>

      {/* Right side: Full-bleed exterior showcase of Hotel in Williamsburg */}
      <div className="images10-showcase">
        <img src={williamsburgImage} alt="Hotel in Williamsburg" className="images10-bg-el" />
        
        {/* Project description text at bottom left inside right panel */}
        <div className="images10-showcase-label">
          <span className="project-type-bold-white">Hotel in Williamsburg (NY)</span>{' '}
          <span className="project-partner-regular-white">The Collective</span>
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images10-next-pill" onClick={onNext} id="images10-next-btn">
        <span className="images10-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
