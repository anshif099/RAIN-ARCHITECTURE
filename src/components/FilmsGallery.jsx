import aboutImage from '../assets/about_image.avif'
import filmVilla from '../assets/film_villa.avif'
import filmVertigo from '../assets/film_vertigo.avif'
import './FilmsGallery.css'

export default function FilmsGallery({ active, onNext, activeModal, setActiveModal }) {

  const items = [
    {
      id: 'solaris',
      title: 'Solaris',
      sub: 'Film',
      image: aboutImage,
      videoUrl: 'https://player.vimeo.com/video/829716759?autoplay=1&muted=0',
      description: '3D rendered animation of an exclusive residential development in Switzerland.',
      developer: 'La Strada Properties',
      architect: 'Justyna Gornicka - Hervé De Giovannini Architecte',
    },
    {
      id: 'villa',
      title: 'Villa',
      sub: 'Film',
      image: filmVilla,
      videoUrl: 'https://player.vimeo.com/video/830866369?autoplay=1&muted=0',
      description: 'Cinematic 3D animation exploring a premium modern villa nestled in a serene lakeside setting.',
      developer: 'Lakeshore Estates Ltd.',
      architect: 'Justyna Gornicka - G. Gornicka Architects',
    },
    {
      id: 'vertigo',
      title: 'Vertigo',
      sub: 'Film',
      image: filmVertigo,
      videoUrl: 'https://player.vimeo.com/video/830818477?autoplay=1&muted=0',
      description: 'Stunning visualization of high-density premium modern row houses featuring modular metal facades and organic landscaping.',
      developer: 'Urban Heights Group',
      architect: 'Hervé De Giovannini & Partners',
    },
  ]

  return (
    <div className={`films-gallery ${active ? 'films-gallery--active' : ''}`}>
      <div className="gallery-columns">
        {items.map((item, idx) => (
          <div key={idx} className="gallery-col" onClick={() => setActiveModal(item)}>
            <img src={item.image} alt={item.title} className="col-bg-img" />
            <div className="col-overlay">
              <div className="play-button-container">
                <div className="play-circle">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" className="play-icon-svg">
                    <path d="M1.5 1.5v11l9-5.5-9-5.5z" />
                  </svg>
                </div>
                <div className="play-text-group">
                  <span className="play-title">{item.title}</span>
                  <span className="play-sub">{item.sub}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pill-shaped Next page indicator */}
      <div className="gallery-next" onClick={onNext} id="gallery-next-btn">
        <span className="gallery-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" className="next-chevron-svg">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>

      {/* Vimeo Player Overlay Modal */}
      {activeModal && (
        <div className="films-modal" id="films-video-modal">
          <button 
            className="modal-close-btn" 
            onClick={() => setActiveModal(null)}
            aria-label="Close video player"
            id="modal-close-btn"
          >
            ✕
          </button>
          
          <div className="modal-content-wrapper">
            {/* Left side: Iframe Video player */}
            <div className="modal-video-pane">
              <div className="iframe-aspect-ratio-box">
                <iframe
                  src={activeModal.videoUrl}
                  title={`${activeModal.title} Film`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="modal-iframe-el"
                ></iframe>
              </div>
            </div>

            {/* Right side: Film info */}
            <div className="modal-info-pane">
              <h2 className="modal-info-title">{activeModal.title}</h2>
              <p className="modal-info-desc">{activeModal.description}</p>
              
              <div className="modal-metadata">
                <div className="meta-row">
                  <span className="meta-label">Developer:</span>
                  <span className="meta-value">{activeModal.developer}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Architect:</span>
                  <span className="meta-value">{activeModal.architect}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
