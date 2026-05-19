import robotA from '../assets/robot_a.avif'
import robotB from '../assets/robot_b.avif'
import './ImagesSixteenthSection.css'

export default function ImagesSixteenthSection({ status, onNext }) {
  return (
    <div className={`images16-sec ${status}`}>
      {/* Left side: White content panel with robot A image */}
      <div className="images16-panel">
        <div className="robotA-container">
          <img src={robotA} alt="Wooden Pavilions Render A" className="robotA-img" />
        </div>
        
        {/* Project description text at bottom left */}
        <div className="images16-project-label">
          <span className="project-type-bold">Wooden Pavilions</span>{' '}
          <span className="project-partner-regular">Josep Alcover</span>
        </div>
      </div>

      {/* Right side: Full-bleed exterior showcase */}
      <div className="images16-showcase">
        <img src={robotB} alt="Wooden Pavilions Render B" className="images16-bg-el" />
      </div>

      {/* Next page indicator */}
      <div className="images16-next-pill" onClick={onNext} id="images16-next-btn">
        <span className="images16-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
