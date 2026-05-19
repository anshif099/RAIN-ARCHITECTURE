import dohaImage from '../assets/doha.avif'
import officesImage from '../assets/offices.avif'
import './ImagesFifteenthSection.css'

export default function ImagesFifteenthSection({ status, onNext }) {
  return (
    <div className={`images15-sec ${status}`}>
      {/* Left side: Full-bleed doha showcase */}
      <div className="images15-showcase">
        <img src={dohaImage} alt="Conference Street Park (Doha)" className="images15-bg-el" />
        
        {/* Project description text at bottom left */}
        <div className="images15-showcase-label">
          <span className="project-type-bold-white">Conference Street Park (Doha)</span>{' '}
          <span className="project-partner-regular-white">Yaseen Raad</span>
        </div>
      </div>

      {/* Right side: White content panel with Basel offices */}
      <div className="images15-panel">
        <div className="offices-container">
          <img src={officesImage} alt="BRCCH Offices, Basel" className="offices-img" />
        </div>
        
        {/* Project description text at bottom left */}
        <div className="images15-project-label">
          <span className="project-type-bold">BRCCH Offices, Basel</span>{' '}
          <span className="project-partner-regular">Parabase</span>
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images15-next-pill" onClick={onNext} id="images15-next-btn">
        <span className="images15-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
