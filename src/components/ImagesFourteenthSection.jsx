import poolImage from '../assets/pool.avif'
import './ImagesFourteenthSection.css'

export default function ImagesFourteenthSection({ status, onNext }) {
  return (
    <div className={`images14-sec ${status}`}>
      {/* Full-bleed pool showcase */}
      <div className="images14-showcase">
        <img src={poolImage} alt="N House Pool" className="images14-bg-el" />
        
        {/* Project description text at bottom left */}
        <div className="images14-project-label">
          <span className="project-type-bold-white">N House</span>{' '}
          <span className="project-partner-regular-white">JM Designs</span>
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images14-next-pill" onClick={onNext} id="images14-next-btn">
        <span className="images14-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
