import voltaA from '../assets/volta_a.avif'
import voltaB from '../assets/volta_b.avif'
import './ImagesSeventeenthSection.css'

export default function ImagesSeventeenthSection({ status, onNext }) {
  return (
    <div className={`images17-sec ${status}`}>
      {/* Left side: Full-bleed volta showcase */}
      <div className="images17-showcase">
        <img src={voltaA} alt="Stadtbaustein Volta Nord Exterior" className="images17-bg-el" />
        
        {/* Project description text at bottom left */}
        <div className="images17-project-label">
          <span className="project-type-bold-white">Stadtbaustein Volta Nord</span>{' '}
          <span className="project-partner-regular-white">Parabase</span>
        </div>
      </div>

      {/* Right side: White content panel with volta B */}
      <div className="images17-panel">
        <div className="voltaB-container">
          <img src={voltaB} alt="Stadtbaustein Volta Nord Roof Terrace" className="voltaB-img" />
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images17-next-pill" onClick={onNext} id="images17-next-btn">
        <span className="images17-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
