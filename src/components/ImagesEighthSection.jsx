import forestImage from '../assets/forest.avif'
import './ImagesEighthSection.css'

export default function ImagesEighthSection({ status, onNext }) {
  return (
    <div className={`images8-sec ${status}`}>
      {/* Full-bleed forest showcase */}
      <div className="images8-showcase">
        <img src={forestImage} alt="Forest House" className="images8-bg-el" />
        
        {/* Project description text at bottom left */}
        <div className="images8-project-label">
          <span className="project-type-bold-white">Forest House</span>{' '}
          <span className="project-partner-regular-white">JM Designs</span>
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images8-next-pill" onClick={onNext} id="images8-next-btn">
        <span className="images8-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
