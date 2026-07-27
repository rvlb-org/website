// NetworkThree.js — Three.js 3D particle network scene
// Runs as a class so the Vue component can mount/destroy it cleanly

import * as THREE from 'three'

export class NetworkScene {
  constructor(canvas) {
    this.canvas = canvas
    this.animId = null
    this.nodes = []
    this.lines = []
    this.color = new THREE.Color('#10b981')
    this._init()
  }

  _init() {
    const W = this.canvas.clientWidth
    const H = this.canvas.clientHeight

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(W, H)
    this.renderer.setClearColor(0x000000, 0)

    // Scene & Camera
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    this.camera.position.set(0, 0, 50)

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    this.scene.add(ambient)
    this.pointLight = new THREE.PointLight(0x10b981, 3, 100)
    this.pointLight.position.set(0, 0, 30)
    this.scene.add(this.pointLight)

    // Particles (background stars)
    this._buildParticles()

    // Network nodes
    this._buildNetwork()

    // Central glowing sphere (the "packet")
    this._buildPacket()

    // Mouse parallax
    this.mouse = { x: 0, y: 0 }
    window.addEventListener('mousemove', this._onMouse.bind(this))
    window.addEventListener('resize', this._onResize.bind(this))

    this._animate()
  }

  _buildParticles() {
    const count = 1800
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 300
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({
      color: 0x334155,
      size: 0.5,
      transparent: true,
      opacity: 0.8
    })
    this.stars = new THREE.Points(geo, mat)
    this.scene.add(this.stars)
  }

  _buildNetwork() {
    // Create floating spheres as "nodes" in a 3D web
    const nodeCount = 30
    const nodePositions = []
    const nodeMeshes = []

    for (let i = 0; i < nodeCount; i++) {
      const r = 18 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos((Math.random() * 2) - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      nodePositions.push(new THREE.Vector3(x, y, z))

      const geo = new THREE.SphereGeometry(0.35, 16, 16)
      const mat = new THREE.MeshStandardMaterial({
        color: this.color,
        emissive: this.color,
        emissiveIntensity: 0.5,
        metalness: 0.3,
        roughness: 0.4
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, z)
      mesh.userData.origPos = mesh.position.clone()
      mesh.userData.speed = 0.001 + Math.random() * 0.002
      mesh.userData.phase = Math.random() * Math.PI * 2
      this.scene.add(mesh)
      nodeMeshes.push(mesh)
    }

    this.nodes = nodeMeshes

    // Connect nodes that are close enough
    const lineMat = new THREE.LineBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: 0.2
    })
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 14) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i], nodePositions[j]
          ])
          const line = new THREE.Line(geo, lineMat.clone())
          this.scene.add(line)
          this.lines.push(line)
        }
      }
    }
    this.nodeMat = nodeMeshes.map(n => n.material)
    this.linesMat = this.lines.map(l => l.material)
  }

  _buildPacket() {
    // The glowing orb at the center
    const geo = new THREE.SphereGeometry(2.5, 32, 32)
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: this.color,
      emissiveIntensity: 2,
      metalness: 0.8,
      roughness: 0.1,
      transparent: true,
      opacity: 0.95
    })
    this.packet = new THREE.Mesh(geo, mat)
    this.packet.position.set(0, 0, 0)
    this.scene.add(this.packet)

    // Outer ring
    const ringGeo = new THREE.TorusGeometry(4, 0.08, 12, 80)
    const ringMat = new THREE.MeshStandardMaterial({
      color: this.color,
      emissive: this.color,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.7
    })
    this.ring1 = new THREE.Mesh(ringGeo, ringMat)
    this.ring2 = new THREE.Mesh(ringGeo.clone(), ringMat.clone())
    this.ring2.rotation.x = Math.PI / 2
    this.scene.add(this.ring1)
    this.scene.add(this.ring2)

    this.packetMat = mat
    this.ring1Mat = ringMat
    this.ring2Mat = this.ring2.material
  }

  // Call this from Vue when concept changes
  setColor(hex) {
    this.color = new THREE.Color(hex)
    const c = this.color

    // Update packet
    this.packetMat.emissive.set(c)
    this.ring1Mat.color.set(c)
    this.ring1Mat.emissive.set(c)
    this.ring2Mat.color.set(c)
    this.ring2Mat.emissive.set(c)

    // Update point light
    this.pointLight.color.set(c)

    // Update nodes
    this.nodeMat.forEach(m => {
      m.color.set(c)
      m.emissive.set(c)
    })

    // Update lines
    this.linesMat.forEach(m => {
      m.color.set(c)
    })
  }

  _onMouse(e) {
    this.mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
    this.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
  }

  _onResize() {
    const W = this.canvas.clientWidth
    const H = this.canvas.clientHeight
    this.camera.aspect = W / H
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(W, H)
  }

  _animate() {
    this.animId = requestAnimationFrame(this._animate.bind(this))
    const t = performance.now() * 0.001

    // Slow camera parallax from mouse
    this.camera.position.x += (this.mouse.x * 8 - this.camera.position.x) * 0.03
    this.camera.position.y += (-this.mouse.y * 5 - this.camera.position.y) * 0.03
    this.camera.lookAt(0, 0, 0)

    // Animate nodes (breathing float)
    this.nodes.forEach(n => {
      const op = n.userData.origPos
      const s  = n.userData.speed
      const ph = n.userData.phase
      n.position.x = op.x + Math.sin(t * s + ph) * 1.2
      n.position.y = op.y + Math.cos(t * s * 0.7 + ph) * 1.2
      n.position.z = op.z + Math.sin(t * s * 0.5 + ph) * 0.6
    })

    // Spin the network slowly
    this.scene.rotation.y = t * 0.04
    this.scene.rotation.x = Math.sin(t * 0.025) * 0.15

    // Pulse the packet
    const pulse = 1 + Math.sin(t * 2.5) * 0.08
    this.packet.scale.setScalar(pulse)
    this.packetMat.emissiveIntensity = 1.5 + Math.sin(t * 3) * 0.8

    // Spin rings
    this.ring1.rotation.z = t * 0.6
    this.ring2.rotation.y = t * 0.9

    // Spin stars slowly
    this.stars.rotation.y = t * 0.008
    this.stars.rotation.x = t * 0.003

    this.renderer.render(this.scene, this.camera)
  }

  destroy() {
    cancelAnimationFrame(this.animId)
    window.removeEventListener('mousemove', this._onMouse.bind(this))
    window.removeEventListener('resize', this._onResize.bind(this))
    this.renderer.dispose()
  }
}
