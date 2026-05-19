import pugliaImage from '../assets/puglia.avif'
import './ImagesFourthSection.css'

export default function ImagesFourthSection({ status, onNext }) {
  return (
    <div className={`images4-sec ${status}`}>
      {/* Full-bleed puglia showcase */}
      <div className="images4-showcase">
        <img src={pugliaImage} alt="Villa in Puglia" className="images4-bg-el" />
        
        {/* Project description text at bottom left */}
        <div className="images4-project-label">
          <span className="project-type-bold-white">Villa in Puglia</span>{' '}
          <span className="project-partner-regular-white">Bergnes de las Casas</span>
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images4-next-pill" onClick={onNext} id="images4-next-btn">
        <span className="images4-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
