import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import MainView from '../components/MainView'
import FilmsSection from '../components/FilmsSection'
import FilmsGallery from '../components/FilmsGallery'
import ImagesSection from '../components/ImagesSection'
import ImagesSecondSection from '../components/ImagesSecondSection'
import ImagesThirdSection from '../components/ImagesThirdSection'
import ImagesFourthSection from '../components/ImagesFourthSection'
import ImagesFifthSection from '../components/ImagesFifthSection'
import ImagesSixthSection from '../components/ImagesSixthSection'
import ImagesSeventhSection from '../components/ImagesSeventhSection'
import ImagesEighthSection from '../components/ImagesEighthSection'
import ImagesNinthSection from '../components/ImagesNinthSection'
import ImagesTenthSection from '../components/ImagesTenthSection'
import ImagesEleventhSection from '../components/ImagesEleventhSection'
import ImagesTwelfthSection from '../components/ImagesTwelfthSection'
import ImagesThirteenthSection from '../components/ImagesThirteenthSection'
import ImagesFourteenthSection from '../components/ImagesFourteenthSection'
import ImagesFifteenthSection from '../components/ImagesFifteenthSection'
import ImagesSixteenthSection from '../components/ImagesSixteenthSection'
import ImagesSeventeenthSection from '../components/ImagesSeventeenthSection'
import VirtualTourSection from '../components/VirtualTourSection'
import TourSection from '../components/TourSection'
import ContactSection from '../components/ContactSection'
import SolarisTourModal from '../components/SolarisTourModal'
import VertigoTourModal from '../components/VertigoTourModal'
import './HomePage.css'

export default function HomePage() {
  // 0: Hero, ..., 22: Virtual Tour, 23: 360 Tours (Solaris + Vertigo), 24: Contact Section
  const [page, setPage] = useState(0)
  const [activeModal, setActiveModal] = useState(null)
  const [solarisOpen, setSolarisOpen] = useState(false)
  const [vertigoOpen, setVertigoOpen] = useState(false)
  const locked = useRef(false)

  const goTo = (targetPage) => {
    if (locked.current) return
    if (targetPage < 0 || targetPage > 24) return
    if (targetPage === page) return
    locked.current = true
    setPage(targetPage)
    setTimeout(() => { locked.current = false }, 1100)
  }

  // Wheel
  useEffect(() => {
    const onWheel = (e) => {
      if (activeModal || solarisOpen || vertigoOpen || document.body.classList.contains('tour-modal-active')) return
      e.preventDefault()
      if (e.deltaY > 0) goTo(page + 1)
      else goTo(page - 1)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [page, activeModal, solarisOpen, vertigoOpen])

  // Touch
  const touchY = useRef(null)
  useEffect(() => {
    const onStart = (e) => {
      if (activeModal || solarisOpen || vertigoOpen || document.body.classList.contains('tour-modal-active')) return
      touchY.current = e.touches[0].clientY
    }
    const onEnd = (e) => {
      if (activeModal || solarisOpen || vertigoOpen || document.body.classList.contains('tour-modal-active')) return
      if (touchY.current === null) return
      const delta = touchY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) > 40) goTo(delta > 0 ? page + 1 : page - 1)
      touchY.current = null
    }
    window.addEventListener('touchstart', onStart)
    window.addEventListener('touchend', onEnd)
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [page, activeModal, solarisOpen, vertigoOpen])

  return (
    <main className="home-page" id="home">
      {!activeModal && !solarisOpen && !vertigoOpen && <Navbar onNavigate={goTo} />}
      <MainView page={page} goTo={goTo} />
      <FilmsSection active={page === 3} onNext={() => goTo(4)} />
      <FilmsGallery 
        active={page === 4} 
        onNext={() => goTo(5)} 
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
      <ImagesSection status={page === 5 ? 'active' : page > 5 ? 'past' : 'future'} onNext={() => goTo(6)} />
      <ImagesSecondSection status={page === 6 ? 'active' : page > 6 ? 'past' : 'future'} onNext={() => goTo(7)} />
      <ImagesThirdSection status={page === 7 ? 'active' : page > 7 ? 'past' : 'future'} onNext={() => goTo(8)} />
      <ImagesFourthSection status={page === 8 ? 'active' : page > 8 ? 'past' : 'future'} onNext={() => goTo(9)} />
      <ImagesFifthSection status={page === 9 ? 'active' : page > 9 ? 'past' : 'future'} onNext={() => goTo(10)} />
      <ImagesSixthSection status={page === 10 ? 'active' : page > 10 ? 'past' : 'future'} onNext={() => goTo(11)} />
      <ImagesSeventhSection status={page === 11 ? 'active' : page > 11 ? 'past' : 'future'} onNext={() => goTo(12)} />
      <ImagesEighthSection status={page === 12 ? 'active' : page > 12 ? 'past' : 'future'} onNext={() => goTo(13)} />
      <ImagesNinthSection status={page === 13 ? 'active' : page > 13 ? 'past' : 'future'} onNext={() => goTo(14)} />
      <ImagesTenthSection status={page === 14 ? 'active' : page > 14 ? 'past' : 'future'} onNext={() => goTo(15)} />
      <ImagesEleventhSection status={page === 15 ? 'active' : page > 15 ? 'past' : 'future'} onNext={() => goTo(16)} />
      <ImagesTwelfthSection status={page === 16 ? 'active' : page > 16 ? 'past' : 'future'} onNext={() => goTo(17)} />
      <ImagesThirteenthSection status={page === 17 ? 'active' : page > 17 ? 'past' : 'future'} onNext={() => goTo(18)} />
      <ImagesFourteenthSection status={page === 18 ? 'active' : page > 18 ? 'past' : 'future'} onNext={() => goTo(19)} />
      <ImagesFifteenthSection status={page === 19 ? 'active' : page > 19 ? 'past' : 'future'} onNext={() => goTo(20)} />
      <ImagesSixteenthSection status={page === 20 ? 'active' : page > 20 ? 'past' : 'future'} onNext={() => goTo(21)} />
      <ImagesSeventeenthSection status={page === 21 ? 'active' : page > 21 ? 'past' : 'future'} onNext={() => goTo(22)} />
      <VirtualTourSection status={page === 22 ? 'active' : page > 22 ? 'past' : 'future'} onNext={() => goTo(23)} />
      <TourSection 
        status={page === 23 ? 'active' : page > 23 ? 'past' : 'future'} 
        onNext={() => goTo(24)} 
        onOpenSolaris={() => setSolarisOpen(true)}
        onOpenVertigo={() => setVertigoOpen(true)}
      />
      <ContactSection status={page === 24 ? 'active' : page > 24 ? 'past' : 'future'} onBackToTop={() => goTo(0)} />

      {/* Root-Level 360 Virtual Tour overlays (Prevents nested transform fixed-positioning Webkit bugs!) */}
      <SolarisTourModal isOpen={solarisOpen} onClose={() => setSolarisOpen(false)} />
      <VertigoTourModal isOpen={vertigoOpen} onClose={() => setVertigoOpen(false)} />
    </main>
  )
}
