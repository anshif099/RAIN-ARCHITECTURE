import gymImage from '../assets/gym.avif'
import './ImagesSection.css'

export default function ImagesSection({ status, onNext }) {
  return (
    <div className={`images-section ${status}`}>
      {/* Left side: White content panel */}
      <div className="images-panel">
        <span className="images-label">IMAGES</span>
        <h1 className="images-title">We take photos<br />of the unbuilt</h1>
        <p className="images-desc">
          We create striking 3D rendered still images of your projects,
          visualizing unbuilt architecture and design as if it had already
          been created. Our renderings are virtual photographs, developed
          to portray buildings and spaces in the most photorealistic manner.
        </p>
      </div>

      {/* Right side: Image showcase */}
      <div className="images-showcase">
        <img src={gymImage} alt="Sports Complex in St. Maurice" className="images-bg-el" />
        
        {/* Architect/project details overlay at bottom left */}
        <div className="images-project-info">
          <span className="project-title">Sports Complex in St. Maurice</span>
          <span className="project-architect">Transversal + Acte Arch.</span>
          <span className="project-badge">1st Prize</span>
        </div>
      </div>

      {/* Next page indicator */}
      <div className="images-next-pill" onClick={onNext} id="images-next-btn">
        <span className="images-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
