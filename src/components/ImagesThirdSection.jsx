import bedroomImage from '../assets/bedroom.avif'
import diningImage from '../assets/dining.avif'
import './ImagesThirdSection.css'

export default function ImagesThirdSection({ status, onNext }) {
  return (
    <div className={`images3-sec ${status}`}>
      {/* Left side: Full-bleed bedroom showcase */}
      <div className="images3-showcase">
        <img src={bedroomImage} alt="Apartment in Berlin Bedroom" className="images3-bg-el" />
        
        {/* Project description text at bottom left */}
        <div className="images3-project-label">
          <span className="project-type-bold-white">Apartment in Berlin</span>{' '}
          <span className="project-partner-regular-white">JM Designs</span>
        </div>
      </div>

      {/* Right side: White content panel with dining image */}
      <div className="images3-panel">
        <div className="dining-container">
          <img src={diningImage} alt="Apartment in Berlin Dining" className="dining-img" />
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images3-next-pill" onClick={onNext} id="images3-next-btn">
        <span className="images3-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
