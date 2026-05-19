import codinesA from '../assets/codines_a.avif'
import codinesB from '../assets/codines_b.avif'
import './ImagesEleventhSection.css'

export default function ImagesEleventhSection({ status, onNext }) {
  return (
    <div className={`images11-sec ${status}`}>
      {/* Left side: Full-bleed exterior showcase */}
      <div className="images11-showcase">
        <img src={codinesA} alt="House in St. F. Codines A" className="images11-bg-el" />
        
        {/* Project description text at bottom left */}
        <div className="images11-project-label">
          <span className="project-type-bold-white">House in St. F. Codines</span>{' '}
          <span className="project-partner-regular-white">Bergnes de las Casas</span>
        </div>
      </div>

      {/* Right side: White content panel with pool/garden view */}
      <div className="images11-panel">
        <div className="codinesB-container">
          <img src={codinesB} alt="House in St. F. Codines B" className="codinesB-img" />
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images11-next-pill" onClick={onNext} id="images11-next-btn">
        <span className="images11-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
