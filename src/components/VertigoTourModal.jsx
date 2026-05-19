import { useEffect, useRef, useState } from 'react'
import './VertigoTourModal.css'

// Import 14 new beautiful unique high-resolution architectural assets
import antiparosB from '../assets/antiparos_b.avif'
import antiparosD from '../assets/antiparos_d.avif'
import baselA from '../assets/basel_a.avif'
import baselB from '../assets/basel_b.avif'
import codinesA from '../assets/codines_a.avif'
import codinesB from '../assets/codines_b.avif'
import gregorExt from '../assets/gregor_ext.avif'
import gregorInt from '../assets/gregor_int.avif'
import lakehouseExt from '../assets/lakehouse_ext.avif'
import lakehouseInt from '../assets/lakehouse_int.avif'
import voltaA from '../assets/volta_a.avif'
import voltaB from '../assets/volta_b.avif'
import walkewegA from '../assets/walkeweg_a.avif'
import walkewegB from '../assets/walkeweg_b.avif'

const scenes = [
  { img: antiparosB, pano: antiparosB, name: 'Antiparos Exterior' },
  { img: antiparosD, pano: antiparosD, name: 'Antiparos Interior' },
  { img: baselA, pano: baselA, name: 'Basel Courtyard' },
  { img: baselB, pano: baselB, name: 'Basel Living' },
  { img: codinesA, pano: codinesA, name: 'Codines Entrance' },
  { img: codinesB, pano: codinesB, name: 'Codines Suite' },
  { img: gregorExt, pano: gregorExt, name: 'Gregor Villa' },
  { img: gregorInt, pano: gregorInt, name: 'Gregor Library' },
  { img: lakehouseExt, pano: lakehouseExt, name: 'Lakehouse Deck' },
  { img: lakehouseInt, pano: lakehouseInt, name: 'Lakehouse Dining' },
  { img: voltaA, pano: voltaA, name: 'Volta Pavilion' },
  { img: voltaB, pano: voltaB, name: 'Volta Atrium' },
  { img: walkewegA, pano: walkewegA, name: 'Walkeweg Walkway' },
  { img: walkewegB, pano: walkewegB, name: 'Walkeweg Lounge' }
]

export default function VertigoTourModal({ isOpen, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [showThumbs, setShowThumbs] = useState(true)
  const [vrMode, setVrMode] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [hotspotList, setHotspotList] = useState([])

  // WebGL ref & state
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const texturesRef = useRef([])
  const glRef = useRef(null)
  const programRef = useRef(null)

  // Camera orientation & view state
  const cameraRef = useRef({
    yaw: Math.PI * 0.5,
    pitch: 0,
    fov: 1.0,
    isDragging: false,
    startX: 0,
    startY: 0,
    startYaw: 0,
    startPitch: 0,
    velYaw: -0.001, // opposite rotation direction
    velPitch: 0,
    width: 0,
    height: 0,
    lastTime: 0
  })

  // Manage body class for scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('tour-modal-active')
    } else {
      document.body.classList.remove('tour-modal-active')
    }
    return () => {
      document.body.classList.remove('tour-modal-active')
    }
  }, [isOpen])

  // Initialize WebGL and Load all textures once
  useEffect(() => {
    if (!isOpen) return

    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }
    glRef.current = gl

    // Shaders - Authentic full 360-degree sphere equirectangular projection
    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uYaw;
      uniform float uPitch;
      uniform float uAspect;
      uniform float uFov;
      uniform bool uVrMode;
      const float PI = 3.14159265359;

      void main() {
        vec2 uv = vUv;
        float aspect = uAspect;
        float yawOffset = 0.0;

        if (uVrMode) {
          if (uv.x < 0.0) {
            uv.x = (uv.x + 0.5) * 2.0;
            yawOffset = -0.04;
          } else {
            uv.x = (uv.x - 0.5) * 2.0;
            yawOffset = 0.04;
          }
          aspect = uAspect * 0.5;
        }

        // Standard perspective ray in camera space
        vec3 ray = normalize(vec3(uv.x * aspect * uFov, uv.y * uFov, -1.0));

        // Rotate ray around X-axis (Pitch)
        float cp = cos(uPitch);
        float sp = sin(uPitch);
        vec3 r1 = vec3(
          ray.x,
          ray.y * cp - ray.z * sp,
          ray.y * sp + ray.z * cp
        );

        // Rotate ray around Y-axis (Yaw)
        float cy = cos(uYaw + yawOffset);
        float sy = sin(uYaw + yawOffset);
        vec3 r2 = vec3(
          r1.x * cy + r1.z * sy,
          r1.y,
          -r1.x * sy + r1.z * cy
        );

        // Convert 3D ray direction to spherical coordinate equirectangular mapping
        float phi = atan(r2.z, r2.x);
        float theta = acos(clamp(r2.y, -1.0, 1.0));
        vec2 texCoord = vec2(phi / (2.0 * PI) + 0.5, theta / PI);

        // WebGL unsharp mask to make the high-resolution panoramas look incredibly crisp
        float tx = 1.0 / 1024.0;
        float ty = 1.0 / 1024.0;

        vec4 color = texture2D(uTexture, texCoord) * 3.5;
        color -= texture2D(uTexture, texCoord + vec2(-tx, 0.0)) * 0.625;
        color -= texture2D(uTexture, texCoord + vec2(tx, 0.0)) * 0.625;
        color -= texture2D(uTexture, texCoord + vec2(0.0, -ty)) * 0.625;
        color -= texture2D(uTexture, texCoord + vec2(0.0, ty)) * 0.625;

        gl_FragColor = clamp(color, 0.0, 1.0);
      }
    `

    // Compile helpers
    const compileShader = (source, type) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
        return null
      }
      return shader
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER)
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER)
    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    programRef.current = program

    gl.useProgram(program)

    // Full screen quad buffer
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    )

    const positionLocation = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Create textures array for all 14 scenes using high-resolution panoramas
    const loadedTextures = scenes.map((scene, i) => {
      const tex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

      // Temporary single dark pixel
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([15, 15, 15, 255])
      )

      const img = new Image()
      img.src = scene.pano
      img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
        if (i === currentIdx) {
          setIsReady(true)
        }
      }
      return tex
    })

    texturesRef.current = loadedTextures

    // Uniform positions
    const uYawLocation = gl.getUniformLocation(program, 'uYaw')
    const uPitchLocation = gl.getUniformLocation(program, 'uPitch')
    const uAspectLocation = gl.getUniformLocation(program, 'uAspect')
    const uFovLocation = gl.getUniformLocation(program, 'uFov')
    const uVrModeLocation = gl.getUniformLocation(program, 'uVrMode')

    let animFrame
    const camera = cameraRef.current

    // Render loop
    const render = (time) => {
      const delta = Math.min((time - camera.lastTime) / 1000, 0.1)
      camera.lastTime = time

      // High-quality auto-resize backing store support
      const scale = window.devicePixelRatio || 1
      const dw = Math.floor(canvas.clientWidth * scale)
      const dh = Math.floor(canvas.clientHeight * scale)

      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width = dw
        canvas.height = dh
        camera.width = dw
        camera.height = dh
        gl.viewport(0, 0, dw, dh)
      }

      // Drag inertia or auto-rotation
      if (!camera.isDragging) {
        camera.yaw += camera.velYaw
        camera.pitch += camera.velPitch
        camera.velYaw *= 0.94
        camera.velPitch *= 0.94

        if (Math.abs(camera.velYaw) < 0.0002) {
          camera.velYaw = -0.0002 // slow spin (reversed)
        }
      } else {
        camera.velYaw *= 0.8
        camera.velPitch *= 0.8
      }

      // Keep pitch in bounds
      camera.pitch = Math.max(-Math.PI / 2 + 0.15, Math.min(Math.PI / 2 - 0.15, camera.pitch))

      // Clean/Draw
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)

      // Bind current texture
      if (texturesRef.current[currentIdx]) {
        gl.bindTexture(gl.TEXTURE_2D, texturesRef.current[currentIdx])
      }

      gl.uniform1f(uYawLocation, camera.yaw)
      gl.uniform1f(uPitchLocation, camera.pitch)
      gl.uniform1f(uAspectLocation, camera.width / (camera.height || 1))
      gl.uniform1f(uFovLocation, camera.fov)
      gl.uniform1i(uVrModeLocation, vrMode ? 1 : 0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      // Update street-view navigation hotspots (For all 14 scenes)
      const hotspots = []

      if (!vrMode) {
        const cssWidth = camera.width / scale
        const cssHeight = camera.height / scale
        const aspect = cssWidth / (cssHeight || 1)
        const fovV = camera.fov
        const fovH = fovV * aspect

        // Forward Hotspot (to next scene, positioned at yaw = Math.PI * 0.5)
        if (currentIdx < 13) {
          const targetYaw = Math.PI * 0.5
          let diffY = targetYaw - camera.yaw
          diffY = Math.atan2(Math.sin(diffY), Math.cos(diffY))
          const diffP = -0.15 - camera.pitch

          if (Math.abs(diffY) < fovH * 0.5 && Math.abs(diffP) < fovV * 0.5) {
            const rx = cssWidth / 2 + (diffY / fovH) * (cssWidth / 2)
            const ry = cssHeight / 2 - (diffP / fovV) * (cssHeight / 2)
            hotspots.push({
              type: 'forward',
              x: rx,
              y: ry,
              targetIdx: currentIdx + 1,
              title: `Go forward to ${scenes[currentIdx + 1].name}`
            })
          }
        }

        // Backward Hotspot (to prev scene, positioned at yaw = Math.PI * 1.5)
        if (currentIdx > 0) {
          const targetYaw = Math.PI * 1.5
          let diffY = targetYaw - camera.yaw
          diffY = Math.atan2(Math.sin(diffY), Math.cos(diffY))
          const diffP = -0.15 - camera.pitch

          if (Math.abs(diffY) < fovH * 0.5 && Math.abs(diffP) < fovV * 0.5) {
            const rx = cssWidth / 2 + (diffY / fovH) * (cssWidth / 2)
            const ry = cssHeight / 2 - (diffP / fovV) * (cssHeight / 2)
            hotspots.push({
              type: 'backward',
              x: rx,
              y: ry,
              targetIdx: currentIdx - 1,
              title: `Go back to ${scenes[currentIdx - 1].name}`
            })
          }
        }
      }

      setHotspotList(hotspots)
      animFrame = requestAnimationFrame(render)
    }

    animFrame = requestAnimationFrame((t) => {
      camera.lastTime = t
      render(t)
    })

    return () => {
      cancelAnimationFrame(animFrame)
    }
  }, [isOpen, currentIdx, vrMode])

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return
      cameraRef.current.width = canvasRef.current.clientWidth
      cameraRef.current.height = canvasRef.current.clientHeight
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isOpen) return null

  // Change scene with cross-fade transition
  const changeScene = (idx) => {
    if (idx < 0 || idx >= scenes.length) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrentIdx(idx)
      setTransitioning(false)
    }, 350) // Duration matches transition css
  }

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    const camera = cameraRef.current
    camera.isDragging = true
    camera.startX = e.clientX
    camera.startY = e.clientY
    camera.startYaw = camera.yaw
    camera.startPitch = camera.pitch
  }

  const handleMouseMove = (e) => {
    const camera = cameraRef.current
    if (!camera.isDragging) return
    const dx = e.clientX - camera.startX
    const dy = e.clientY - camera.startY

    const sens = 0.003
    const targetY = camera.startYaw + dx * sens
    const targetP = camera.startPitch - dy * sens

    camera.velYaw = targetY - camera.yaw
    camera.velPitch = targetP - camera.pitch

    camera.yaw = targetY
    camera.pitch = targetP
  }

  const handleMouseUp = () => {
    cameraRef.current.isDragging = false
  }

  // Touch handlers
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return
    const touch = e.touches[0]
    const camera = cameraRef.current
    camera.isDragging = true
    camera.startX = touch.clientX
    camera.startY = touch.clientY
    camera.startYaw = camera.yaw
    camera.startPitch = camera.pitch
  }

  const handleTouchMove = (e) => {
    if (e.touches.length !== 1) return
    const touch = e.touches[0]
    const camera = cameraRef.current
    if (!camera.isDragging) return
    const dx = touch.clientX - camera.startX
    const dy = touch.clientY - camera.startY

    const sens = 0.004
    const targetY = camera.startYaw + dx * sens
    const targetP = camera.startPitch - dy * sens

    camera.velYaw = targetY - camera.yaw
    camera.velPitch = targetP - camera.pitch

    camera.yaw = targetY
    camera.pitch = targetP
  }

  // Button-based rotation
  const rotateLeft = () => { cameraRef.current.velYaw = -0.03 }
  const rotateRight = () => { cameraRef.current.velYaw = 0.03 }
  const rotateUp = () => { cameraRef.current.velPitch = 0.02 }
  const rotateDown = () => { cameraRef.current.velPitch = -0.02 }

  // Zoom
  const zoomIn = () => {
    cameraRef.current.fov = Math.max(0.4, cameraRef.current.fov - 0.15)
  }
  const zoomOut = () => {
    cameraRef.current.fov = Math.min(1.5, cameraRef.current.fov + 0.15)
  }

  // Fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
      setIsFullscreen(false)
    }
  }

  return (
    <div className="vertigo-modal-backdrop" ref={containerRef}>
      {/* Top Header navbar */}
      <div className="vertigo-header">
        <button className="vertigo-close-btn" onClick={onClose} aria-label="Close Tour">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main showcase area */}
      <div
        className={`vertigo-viewer ${transitioning ? 'vertigo-viewer--fade' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <canvas ref={canvasRef} className="vertigo-canvas" />

        {/* Loading Spinner */}
        {!isReady && (
          <div className="vertigo-loader">
            <div className="vertigo-spinner" />
            <span>Loading Panoramic Scene...</span>
          </div>
        )}

        {/* Street view corridor navigation arrows (for all scenes) */}
        {hotspotList.map((hs, i) => (
          <button
            key={i}
            className={`vertigo-street-arrow vertigo-street-arrow--${hs.type}`}
            style={{
              left: `${hs.x}px`,
              top: `${hs.y}px`
            }}
            onClick={() => changeScene(hs.targetIdx)}
            title={hs.title}
          >
            {/* Street View chevron arrow */}
            <svg viewBox="0 0 100 100" width="70" height="70" className="street-arrow-svg">
              <polygon points="50,15 90,55 70,55 70,90 30,90 30,55 10,55" fill="#ffffff" stroke="#000000" strokeWidth="4" />
            </svg>
          </button>
        ))}

        {/* VR split line helper */}
        {vrMode && <div className="vertigo-vr-divider" />}
      </div>

      {/* Dynamic Navigation & Thumbnail panel */}
      <div className="vertigo-controls-container">
        {/* Horizontal Thumbnails Tray */}
        {showThumbs && (
          <div className="vertigo-thumbnails-tray">
            <div className="vertigo-thumbnails-scroll">
              {scenes.map((scene, idx) => (
                <div
                  key={idx}
                  className={`vertigo-thumb-card ${idx === currentIdx ? 'active' : ''}`}
                  onClick={() => changeScene(idx)}
                >
                  <img src={scene.img} alt={scene.name} className="vertigo-thumb-img" />
                  <span className="vertigo-thumb-label">{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className="vertigo-control-bar">
          {/* Leftside: Prev scene & thumbnails toggle */}
          <div className="bar-group">
            <button className="bar-btn" onClick={() => changeScene((currentIdx - 1 + 14) % 14)} title="Previous Scene">
              {/* Double left arrows */}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M11 6L5 12L11 18V6Z" />
                <path d="M19 6L13 12L19 18V6Z" />
              </svg>
            </button>
            <button className={`bar-btn ${showThumbs ? 'active' : ''}`} onClick={() => setShowThumbs(!showThumbs)} title="Toggle Thumbnails">
              {/* Grid 4-squares icon */}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>

          {/* Center: Camera rotation & zoom & VR controls */}
          <div className="bar-group">
            <button className="bar-btn" onMouseDown={rotateLeft} title="Look Left">
              {/* Left arrow */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12,19 5,12 12,5" />
              </svg>
            </button>
            <button className="bar-btn" onMouseDown={rotateRight} title="Look Right">
              {/* Right arrow */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            </button>
            <button className="bar-btn" onMouseDown={rotateUp} title="Look Up">
              {/* Up arrow */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5,12 12,5 19,12" />
              </svg>
            </button>
            <button className="bar-btn" onMouseDown={rotateDown} title="Look Down">
              {/* Down arrow */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19,12 12,19 5,12" />
              </svg>
            </button>
            <span className="bar-divider" />
            <button className="bar-btn" onClick={zoomIn} title="Zoom In">
              {/* Plus icon */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button className="bar-btn" onClick={zoomOut} title="Zoom Out">
              {/* Minus icon */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span className="bar-divider" />
            <button className={`bar-btn bar-btn--vr ${vrMode ? 'active' : ''}`} onClick={() => setVrMode(!vrMode)} title="Toggle VR Stereoscopic View">
              {/* VR goggles/glasses icon */}
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm2.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path d="M12 14c-1 0-1.5-.5-1.5-1.5S11 11 12 11s1.5.5 1.5 1.5S13 14 12 14z" />
              </svg>
            </button>
          </div>

          {/* Rightside: Fullscreen, Close controlbar, Next scene */}
          <div className="bar-group">
            <button className="bar-btn" onClick={toggleFullscreen} title="Toggle Fullscreen">
              {/* Fullscreen crop icon */}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m0 8v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3m0-8V5a2 2 0 0 0-2-2h-3" />
              </svg>
            </button>
            <button className="bar-btn" onClick={() => setShowThumbs(!showThumbs)} title="Minimize Tray">
              {/* Minimizing down-arrow-bar icon */}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="20" x2="21" y2="20" />
                <polyline points="8,10 12,14 16,10" />
              </svg>
            </button>
            <button className="bar-btn" onClick={() => changeScene((currentIdx + 1) % 14)} title="Next Scene">
              {/* Double right arrows */}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M13 6L19 12L13 18V6Z" />
                <path d="M5 6L11 12L5 18V6Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
