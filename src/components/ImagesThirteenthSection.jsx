import zurichExt from '../assets/zurich_ext.avif'
import zurichInt from '../assets/zurich_int.avif'
import './ImagesThirteenthSection.css'

export default function ImagesThirteenthSection({ status, onNext }) {
  return (
    <div className={`images13-sec ${status}`}>
      {/* Left side: Full-bleed exterior showcase */}
      <div className="images13-showcase">
        <img src={zurichExt} alt="Hinwil Courthouse, Zurich Exterior" className="images13-bg-el" />
        
        {/* Project description text at bottom left */}
        <div className="images13-project-label">
          <span className="project-type-bold-white">Hinwil Courthouse, Zurich</span>{' '}
          <span className="project-partner-regular-white">Parabase</span>
        </div>
      </div>

      {/* Right side: White content panel with courthouse interior */}
      <div className="images13-panel">
        <div className="zurichInt-container">
          <img src={zurichInt} alt="Hinwil Courthouse, Zurich Interior" className="zurichInt-img" />
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images13-next-pill" onClick={onNext} id="images13-next-btn">
        <span className="images13-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
