import antiparosB from '../assets/antiparos_b.avif'
import antiparosD from '../assets/antiparos_d.avif'
import './ImagesSeventhSection.css'

export default function ImagesSeventhSection({ status, onNext }) {
  return (
    <div className={`images7-sec ${status}`}>
      {/* Left side: Full-bleed exterior showcase */}
      <div className="images7-showcase">
        <img src={antiparosB} alt="Villas in Antiparos B" className="images7-bg-el" />
        
        {/* Project description text at bottom left */}
        <div className="images7-project-label">
          <span className="project-type-bold-white">Villas in Antiparos</span>{' '}
          <span className="project-partner-regular-white">West Valley</span>
        </div>
      </div>

      {/* Right side: White content panel with pool view */}
      <div className="images7-panel">
        <div className="antiparosD-container">
          <img src={antiparosD} alt="Villas in Antiparos D" className="antiparosD-img" />
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images7-next-pill" onClick={onNext} id="images7-next-btn">
        <span className="images7-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
