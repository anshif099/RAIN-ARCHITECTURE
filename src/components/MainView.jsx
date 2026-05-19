import heroVideo from '../assets/video_hero_3mbps.mp4'
import AboutImageSlider from './AboutImageSlider'
import './MainView.css'

export default function MainView({ page, goTo }) {

  return (
    <div className={`main-view main-view--page-${page} ${page >= 3 ? 'mv-hidden' : ''}`}>

      {/* ── Video background (stays on left, fades out) ── */}
      <div className={`mv-video ${page !== 0 ? 'mv-video--hidden' : ''}`}>
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="mv-video-el"
        />
      </div>

      {/* ── Slider image panel (slides in from right, then slides internally) ── */}
      <div className={`mv-about-img ${page !== 0 ? 'mv-about-img--visible' : ''}`}>
        <AboutImageSlider activeSlide={page === 2 ? 1 : 0} />
      </div>

      {/* ── White content panel (slides and fades according to page state) ── */}
      <div className={`mv-panel mv-panel--page-${page}`}>

        {/* Hero content */}
        <div className={`mv-content ${page !== 0 ? 'mv-content--out' : 'mv-content--in'}`}>
          <span className="mv-label">3D RENDERINGS</span>
          <h1 className="mv-title">Architectural<br />Visualization</h1>
          <p className="mv-desc">
            Rain Architecture produces{' '}
            <em>high quality Images, Animations, Walkthroughs and 360
            Virtual reality Tours</em> for Architecture and Real Estate.
          </p>
        </div>

        {/* About content (shared for both page 1 & 2) */}
        <div className={`mv-content ${page !== 0 ? 'mv-content--in' : 'mv-content--out'}`}>
          <span className="mv-label">ABOUT</span>
          <h1 className="mv-title">Bringing ideas<br />to Life</h1>
          <p className="mv-desc">
            We provide our clients with{' '}
            <em>top-class photorealistic 3D rendering services</em>{' '}
            including animations, still images, walkthroughs and{' '}
            <em>virtual reality tours</em>. We bring designs to{' '}
            <em>life with the latest technologies</em>.
          </p>
        </div>

      </div>

      {/* Always bottom-right of viewport — only render on page 0, 1, or 2 */}
      {page < 3 && (
        page === 0 ? (
          <div
            className="mv-next"
            onClick={() => goTo(page + 1)}
            id="mv-next-btn"
          >
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="12" y1="0" x2="12" y2="34" />
              <polyline points="4,26 12,36 20,26" />
            </svg>
            <span className="mv-next-label">next page</span>
          </div>
        ) : (
          <div
            className="mv-next-pill"
            onClick={() => goTo(page + 1)}
            id="mv-next-btn"
          >
            <span className="mv-next-label">next page</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1,2 6,6 11,2" />
            </svg>
          </div>
        )
      )}

    </div>
  )
}

