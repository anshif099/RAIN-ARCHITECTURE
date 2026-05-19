import { useEffect, useRef, useState } from 'react'
import panoImage from '../assets/spanish_pavilion_pano.png'
import './VirtualTourSection.css'

export default function VirtualTourSection({ status, onNext }) {
  const canvasRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  
  // Dragging and inertia state
  const stateRef = useRef({
    yaw: Math.PI * 0.5, // Initial angle
    pitch: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    startYaw: 0,
    startPitch: 0,
    velYaw: 0.0008, // Slow default auto-rotate inertia
    velPitch: 0,
    lastTime: 0,
    width: 0,
    height: 0,
  })

  useEffect(() => {
    // Expose krpano global embedding functions to satisfy script compatibility
    window.embedpano = function (e) {
      console.log('krpano mock embedpano:', e)
      if (e && e.target) {
        const targetEl = document.getElementById(e.target)
        if (targetEl) {
          targetEl.innerHTML = `<div style="width:100%;height:100%;color:#fff;display:flex;align-items:center;justify-content:center;background:#000;">krpano 3D Viewer Embedded</div>`
        }
      }
    }
    window.removepano = function (id) {
      console.log('krpano mock removepano:', id)
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      console.warn('WebGL not supported, falling back to 2D canvas')
      return
    }

    // Shaders code
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
      const float PI = 3.14159265359;

      void main() {
        float fov = 1.0; // Field of view multiplier
        vec3 ray = normalize(vec3(vUv.x * uAspect * fov, vUv.y * fov, -1.0));

        // Rotate ray around X (Pitch)
        float cp = cos(uPitch);
        float sp = sin(uPitch);
        vec3 r1 = vec3(
          ray.x,
          ray.y * cp - ray.z * sp,
          ray.y * sp + ray.z * cp
        );

        // Rotate ray around Y (Yaw)
        float cy = cos(uYaw);
        float sy = sin(uYaw);
        vec3 r2 = vec3(
          r1.x * cy + r1.z * sy,
          r1.y,
          -r1.x * sy + r1.z * cy
        );

        // Convert 3D ray to 2D equirectangular coordinate
        float phi = atan(r2.z, r2.x);
        float theta = acos(clamp(r2.y, -1.0, 1.0));
        vec2 uvPano = vec2(phi / (2.0 * PI) + 0.5, theta / PI);

        gl_FragColor = texture2D(uTexture, uvPano);
      }
    `

    // Compile shader helper
    const compileShader = (source, type) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
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

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Set up positions buffer (full screen quad)
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

    // Load panorama texture
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    // Placeholder pixel while texture loads
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([20, 20, 20, 255])
    )

    const img = new Image()
    img.src = panoImage
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      setIsReady(true)
    }

    // Uniform locations
    const uYawLocation = gl.getUniformLocation(program, 'uYaw')
    const uPitchLocation = gl.getUniformLocation(program, 'uPitch')
    const uAspectLocation = gl.getUniformLocation(program, 'uAspect')

    let animationFrameId
    const state = stateRef.current

    // Render loop
    const render = (time) => {
      const delta = Math.min((time - state.lastTime) / 1000, 0.1)
      state.lastTime = time

      // Resize canvas to container
      const displayWidth = canvas.clientWidth
      const displayHeight = canvas.clientHeight
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
        state.width = displayWidth
        state.height = displayHeight
        gl.viewport(0, 0, canvas.width, canvas.height)
      }

      // Auto-rotation inertia decay and dragging
      if (!state.isDragging) {
        state.yaw += state.velYaw
        state.pitch += state.velPitch
        state.velYaw *= 0.95
        state.velPitch *= 0.95

        // Slowly pick up normal drift speed if inertia gets low
        if (Math.abs(state.velYaw) < 0.0003) {
          state.velYaw = 0.0003
        }
      } else {
        state.velYaw *= 0.8
        state.velPitch *= 0.8
      }

      // Keep angles in check
      const PI = Math.PI
      state.pitch = Math.max(-PI / 2 + 0.1, Math.min(PI / 2 - 0.1, state.pitch))

      // Clear and draw
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.uniform1f(uYawLocation, state.yaw)
      gl.uniform1f(uPitchLocation, state.pitch)
      gl.uniform1f(uAspectLocation, state.width / (state.height || 1))

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame((t) => {
      state.lastTime = t
      render(t)
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Drag interaction handlers
  const handleMouseDown = (e) => {
    const state = stateRef.current
    state.isDragging = true
    state.startX = e.clientX
    state.startY = e.clientY
    state.startYaw = state.yaw
    state.startPitch = state.pitch
  }

  const handleMouseMove = (e) => {
    const state = stateRef.current
    if (!state.isDragging) return
    const dx = e.clientX - state.startX
    const dy = e.clientY - state.startY

    // Sensitivity factor
    const sens = 0.003
    const targetYaw = state.startYaw + dx * sens
    const targetPitch = state.startPitch - dy * sens

    // Calculate instant velocity for flick release inertia
    state.velYaw = targetYaw - state.yaw
    state.velPitch = targetPitch - state.pitch

    state.yaw = targetYaw
    state.pitch = targetPitch
  }

  const handleMouseUpOrLeave = () => {
    stateRef.current.isDragging = false
  }

  // Touch handlers for mobile devices
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return
    const touch = e.touches[0]
    const state = stateRef.current
    state.isDragging = true
    state.startX = touch.clientX
    state.startY = touch.clientY
    state.startYaw = state.yaw
    state.startPitch = state.pitch
  }

  const handleTouchMove = (e) => {
    if (e.touches.length !== 1) return
    const touch = e.touches[0]
    const state = stateRef.current
    if (!state.isDragging) return
    const dx = touch.clientX - state.startX
    const dy = touch.clientY - state.startY

    const sens = 0.004
    const targetYaw = state.startYaw + dx * sens
    const targetPitch = state.startPitch - dy * sens

    state.velYaw = targetYaw - state.yaw
    state.velPitch = targetPitch - state.pitch

    state.yaw = targetYaw
    state.pitch = targetPitch
  }

  return (
    <div className={`vt-sec ${status}`}>
      {/* Left Panel: White column with description text */}
      <div className="vt-panel">
        <div className="vt-content-wrapper">
          <span className="vt-label">360 VIRTUAL TOURS</span>
          <h1 className="vt-title">Look around,<br />Move around</h1>
          <p className="vt-desc">
            We bring your clients inside your designs making it possible for them to feel
            and explore photorealistic virtual spaces as if they were actually there. Our
            360° virtual tours do not require any special equipment and they can easily
            be hosted online. They can be played from anywhere with a smartphone, tablet,
            computer or a virtual reality headset.
          </p>
        </div>
      </div>

      {/* Right Panel: Interactive 3D WebGL Viewer */}
      <div className="vt-showcase">
        <div
          className="vt-viewer-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
        >
          <canvas ref={canvasRef} className="vt-canvas" />

          {/* Loading Indicator */}
          {!isReady && (
            <div className="vt-loader">
              <div className="vt-spinner" />
              <span>Loading 3D Tour...</span>
            </div>
          )}

          {/* Project description tag at bottom left */}
          <div className="vt-project-label">
            <span className="vt-proj-bold">Spanish Pavilion. Expo Dubai 2020</span>{' '}
            <span className="vt-proj-regular">External Reference + OnionLab</span>
            <span className="vt-prize-badge">1st Prize</span>
          </div>

          {/* Instructions overlay */}
          <div className="vt-instruction">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>Drag to look around in 360°</span>
          </div>
        </div>
      </div>

      {/* Next page indicator */}
      <div className="vt-next-pill" onClick={onNext} id="vt-next-btn">
        <span className="vt-next-label">next page</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="1,2 6,6 11,2" />
        </svg>
      </div>
    </div>
  )
}
