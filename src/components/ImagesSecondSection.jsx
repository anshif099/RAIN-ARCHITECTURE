import aerialImage from '../assets/washington_aerial.avif'
import streetImage from '../assets/washington_street.avif'
import './ImagesSecondSection.css'

export default function ImagesSecondSection({ status, onNext }) {
  return (
    <div className={`images2-section ${status}`}>
      {/* Left side: White content panel with aerial image */}
      <div className="images2-panel">
        <div className="aerial-container">
          <img src={aerialImage} alt="Multifunctional Building Aerial" className="aerial-img" />
        </div>
        
        {/* Project text at the bottom left of the left panel */}
        <div className="images2-project-label">
          <span className="project-type-bold">Multifunctional Building</span>{' '}
          <span className="project-partner-regular">Partnership with Pictury</span>
        </div>
      </div>

      {/* Right side: Street-level showcase */}
      <div className="images2-showcase">
        <img src={streetImage} alt="Multifunctional Building Street" className="images2-bg-el" />
      </div>

      {/* Next page indicator */}
      <div className="images2-next-pill" onClick={onNext} id="images2-next-btn">
        <span className="images2-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
