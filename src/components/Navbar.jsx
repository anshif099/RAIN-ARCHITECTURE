import { useState } from 'react'
import './Navbar.css'

export default function Navbar({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar" id="main-navbar">
      {/* Wordmark */}
      <a
        href="/"
        className="navbar-logo"
        id="nav-logo-link"
        onClick={(e) => {
          e.preventDefault()
          if (onNavigate) onNavigate(0)
        }}
      >
        <span className="navbar-wordmark">RAIN-ARCHITECTURE</span>
      </a>

      {/* Right side */}
      <div className="navbar-right">
        <a 
          href="#contact" 
          className="navbar-contact" 
          id="nav-contact-btn"
          onClick={(e) => {
            e.preventDefault()
            if (onNavigate) onNavigate(24)
          }}
        >
          Contact
        </a>

        {/* Hamburger menu */}
        <button
          className={`navbar-menu-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="nav-menu-btn"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Overlay menu */}
      {menuOpen && (
        <div className="nav-overlay" id="nav-overlay">
          <button
            className="overlay-close"
            onClick={() => setMenuOpen(false)}
            id="nav-overlay-close"
          >
            ✕
          </button>
          <ul className="overlay-links">
            {['Home', 'About', 'Films', 'Images', 'Tours', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="overlay-link"
                  onClick={(e) => {
                    e.preventDefault()
                    setMenuOpen(false)
                    if (onNavigate) {
                      if (item === 'Home') onNavigate(0)
                      else if (item === 'About') onNavigate(1)
                      else if (item === 'Films') onNavigate(4)
                      else if (item === 'Images') onNavigate(5)
                      else if (item === 'Tours') onNavigate(22)
                      else if (item === 'Contact') onNavigate(24)
                    }
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
