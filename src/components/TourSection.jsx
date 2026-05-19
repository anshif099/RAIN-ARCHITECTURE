import { useState } from 'react'
import tourSolaris from '../assets/tour_solaris.avif'
import tourVertigo from '../assets/tour_vertigo.avif'
import SolarisTourModal from './SolarisTourModal'
import VertigoTourModal from './VertigoTourModal'
import './TourSection.css'

export default function TourSection({ status, onNext, onOpenSolaris, onOpenVertigo }) {

  return (
    <div className={`tour-sec ${status}`}>

      {/* Left panel — Solaris */}
      <div className="tour-panel tour-panel--left" onClick={onOpenSolaris}>
        <img
          src={tourSolaris}
          alt="Play Solaris Tour"
          className="tour-bg-img"
          draggable={false}
        />
        {/* Dark gradient overlay */}
        <div className="tour-overlay" />

        {/* 360 badge + label */}
        <div className="tour-info">
          <div className="tour-badge">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M8.5 9.5c0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5v5c0 1.93-1.567 3.5-3.5 3.5S8.5 16.43 8.5 14.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <text x="7" y="13.5" fontSize="5.5" fontFamily="Inter,sans-serif" fontWeight="700" fill="currentColor">360</text>
            </svg>
          </div>
          <div className="tour-caption">
            <span className="tour-play">Play</span>
            <span className="tour-name">Solaris</span>
            <span className="tour-word">Tour</span>
          </div>
        </div>
      </div>

      {/* Right panel — Vertigo */}
      <div className="tour-panel tour-panel--right" onClick={onOpenVertigo}>
        <img
          src={tourVertigo}
          alt="Play Vertigo Tour"
          className="tour-bg-img"
          draggable={false}
        />
        {/* Dark gradient overlay */}
        <div className="tour-overlay" />

        {/* 360 badge + label */}
        <div className="tour-info">
          <div className="tour-badge">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M8.5 9.5c0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5v5c0 1.93-1.567 3.5-3.5 3.5S8.5 16.43 8.5 14.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <text x="7" y="13.5" fontSize="5.5" fontFamily="Inter,sans-serif" fontWeight="700" fill="currentColor">360</text>
            </svg>
          </div>
          <div className="tour-caption">
            <span className="tour-play">Play</span>
            <span className="tour-name">Vertigo</span>
            <span className="tour-word">Tour</span>
          </div>
        </div>

        {/* Next page pill — bottom-right of right panel */}
        <div 
          className="tour-next-pill" 
          onClick={(e) => {
            e.stopPropagation() // prevent opening Vertigo modal when navigating
            if (onNext) onNext()
          }} 
          id="tour-next-btn"
        >
          <span className="tour-next-label">next page</span>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1,2 6,6 11,2" />
          </svg>
        </div>
      </div>

    </div>
  )
}
