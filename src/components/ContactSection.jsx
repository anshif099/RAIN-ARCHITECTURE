import roomImg from '../assets/room.avif'
import './ContactSection.css'

export default function ContactSection({ status, onBackToTop }) {
  return (
    <div className={`contact-sec ${status}`}>
      {/* Left Column - Contact Details */}
      <div className="contact-left">
        {/* Info Content Block */}
        <div className="contact-info-block">
          <span className="contact-badge">CONTACT</span>
          <h2 className="contact-title">Let's do something great together</h2>
          
          <p className="contact-desc">
            We collaborate with architects, designers, developers and real estate agencies worldwide. 
            We work in English, Spanish and Catalan. Get in touch to discuss your project or request a quote.
          </p>

          <a href="https://www.rainhopes.in" target="_blank" rel="noopener noreferrer" className="contact-email-link">
            www.rainhopes.in
          </a>

          {/* Social Links (Instagram) */}
          <div className="contact-socials">
            <a 
              href="https://www.instagram.com/rainhopes?igsh=MWtrNjM2eTBjZHNtdg==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-social-btn"
              title="Follow us on Instagram"
              aria-label="Instagram"
            >
              {/* Instagram SVG icon */}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Right Column - Visual Showcase */}
      <div className="contact-right">
        <img 
          src={roomImg} 
          alt="Architectural space" 
          className="contact-bg-img"
          draggable={false}
        />
        
        {/* Dark elegant visual overlay */}
        <div className="contact-visual-overlay" />

        {/* Large centered white website text exactly as in screenshot */}
        <div className="contact-center-email">
          <a href="https://www.rainhopes.in" target="_blank" rel="noopener noreferrer">
            www.rainhopes.in
          </a>
        </div>

        {/* Bottom-right Back To Top pill */}
        <div className="contact-back-pill" onClick={onBackToTop} id="contact-back-btn">
          <span className="contact-back-label">back to top</span>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="11,6 6,2 1,6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
