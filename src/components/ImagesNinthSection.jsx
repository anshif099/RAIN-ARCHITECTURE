import baselA from '../assets/basel_a.avif'
import baselB from '../assets/basel_b.avif'
import './ImagesNinthSection.css'

export default function ImagesNinthSection({ status, onNext }) {
  return (
    <div className={`images9-sec ${status}`}>
      {/* Left side: Full-bleed exterior showcase */}
      <div className="images9-showcase">
        <img src={baselA} alt="Burgfelderstrasse Housing, Basel A" className="images9-bg-el" />
        
        {/* Project description text at bottom left */}
        <div className="images9-project-label">
          <span className="project-type-bold-white">Burgfelderstrasse Housing, Basel</span>{' '}
          <span className="project-partner-regular-white">Parabase</span>
        </div>
      </div>

      {/* Right side: White content panel with vertical rendering */}
      <div className="images9-panel">
        <div className="baselB-container">
          <img src={baselB} alt="Burgfelderstrasse Housing, Basel B" className="baselB-img" />
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images9-next-pill" onClick={onNext} id="images9-next-btn">
        <span className="images9-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
