import lakehouseInt from '../assets/lakehouse_int.avif'
import lakehouseExt from '../assets/lakehouse_ext.avif'
import './ImagesTwelfthSection.css'

export default function ImagesTwelfthSection({ status, onNext }) {
  return (
    <div className={`images12-sec ${status}`}>
      {/* Left side: White content panel with interior image */}
      <div className="images12-panel">
        <div className="lakehouseInt-container">
          <img src={lakehouseInt} alt="Lakehouse in Texas Interior" className="lakehouseInt-img" />
        </div>
        
        {/* Project description text at bottom left */}
        <div className="images12-project-label">
          <span className="project-type-bold">Lakehouse in Texas</span>{' '}
          <span className="project-partner-regular">Private Client</span>
        </div>
      </div>

      {/* Right side: Full-bleed exterior showcase */}
      <div className="images12-showcase">
        <img src={lakehouseExt} alt="Lakehouse in Texas Exterior" className="images12-bg-el" />
      </div>

      {/* Next page indicator */}
      <div className="images12-next-pill" onClick={onNext} id="images12-next-btn">
        <span className="images12-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
