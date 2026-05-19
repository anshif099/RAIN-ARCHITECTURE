import gregorInt from '../assets/gregor_int.avif'
import gregorExt from '../assets/gregor_ext.avif'
import './ImagesSixthSection.css'

export default function ImagesSixthSection({ status, onNext }) {
  return (
    <div className={`images6-sec ${status}`}>
      {/* Left side: White content panel with interior image */}
      <div className="images6-panel">
        <div className="gregorInt-container">
          <img src={gregorInt} alt="Weinbergloft Houses Interior" className="gregorInt-img" />
        </div>
        
        {/* Project description text at bottom left */}
        <div className="images6-project-label">
          <span className="project-type-bold">Weinbergloft Houses</span>{' '}
          <span className="project-partner-regular">Gregor Pils</span>
        </div>
      </div>

      {/* Right side: Full-bleed exterior showcase */}
      <div className="images6-showcase">
        <img src={gregorExt} alt="Weinbergloft Houses Exterior" className="images6-bg-el" />
      </div>

      {/* Next page indicator */}
      <div className="images6-next-pill" onClick={onNext} id="images6-next-btn">
        <span className="images6-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
