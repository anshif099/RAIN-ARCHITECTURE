import aboutLines from '../assets/about_lines.avif'
import aboutImage from '../assets/about_image.avif'
import './AboutImageSlider.css'

export default function AboutImageSlider({ activeSlide }) {
  return (
    <div className="about-image-slider">
      {/* Slide 1: Sketch drawing */}
      <div className={`slider-slide slide-sketch ${activeSlide === 0 ? 'slide--active' : ''}`}>
        <img
          src={aboutLines}
          alt="Architectural sketch"
          className="sketch-img"
        />
      </div>

      {/* Slide 2: Realistic Render */}
      <div className={`slider-slide slide-realistic ${activeSlide === 1 ? 'slide--active' : ''}`}>
        <img
          src={aboutImage}
          alt="Realistic architectural visualization"
          className="realistic-img"
        />
        <div className="realistic-caption">
          <span className="caption-bold">Solaris</span>
          <span className="caption-light">J.Gornicka - deGiovannini Arch.</span>
        </div>
      </div>
    </div>
  )
}
