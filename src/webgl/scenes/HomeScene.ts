import Scene from '../Scene'

import {
  createProgramInfo,
  drawBufferInfo,
  m4,
  primitives,
  setBuffersAndAttributes,
  setUniforms,
} from 'twgl.js'

// Shaders
import vs from './particle.vs.glsl?raw'
import fs from './particle.fs.glsl?raw'

/** A simple 3D particle */
export class Particle {
  protected static programInfo?: ReturnType<typeof createProgramInfo>

  public static dispose() {
    Particle.programInfo = undefined
  }

  public worldTransform = m4.identity()
  protected bufferInfo: ReturnType<typeof primitives.createXYQuadBufferInfo>

  public constructor(gl: WebGLRenderingContext) {
    // Create the shader program if it doesn't exist
    if (!Particle.programInfo) {
      Particle.programInfo = createProgramInfo(gl, [vs, fs])
    }

    // Create a buffer for the geometry
    this.bufferInfo = primitives.createXYQuadBufferInfo(gl, 0.02)
  }

  public render(scene: Scene) {
    if (!Particle.programInfo) return

    const uniforms = {
      worldView: m4.multiply(scene.camera.view, this.worldTransform),
      worldViewProjection: m4.multiply(scene.camera.viewProjection, this.worldTransform),
    }

    const gl = scene.getContext()

    // Set the shader
    gl.useProgram(Particle.programInfo.program)

    // Prepare the geometry
    setBuffersAndAttributes(gl, Particle.programInfo, this.bufferInfo)

    // Set the shader data
    setUniforms(Particle.programInfo, uniforms)

    // Finally draw
    drawBufferInfo(gl, this.bufferInfo)
  }
}

/** A fancy sparkling shimmery effect for the home page */
export default class HomeScene extends Scene {
  private particles: Particle[] = []

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas)

    this.createParticles()
  }

  public dispose() {
    super.dispose()

    this.particles = []
    Particle.dispose()
  }

  public createParticles() {
    const gl = this.getContext()
    const range = 20

    for (let i = 0; i < 1000; i++) {
      const particle = new Particle(gl)
      const x = Math.random() * range - range * 0.5
      const y = Math.random() * range * 0.5 - range * 0.25

      particle.worldTransform = m4.rotateX(
        particle.worldTransform,
        Math.random() * Math.PI * 2,
      )
      particle.worldTransform = m4.translate(particle.worldTransform, [x, y, 0])

      this.particles.push(particle)
    }
  }

  public animate(deltaSeconds: number) {
    for (const particle of this.particles) {
      particle.worldTransform = m4.rotateX(
        particle.worldTransform,
        deltaSeconds * 3,
      )

      particle.render(this)
    }
  }
}
