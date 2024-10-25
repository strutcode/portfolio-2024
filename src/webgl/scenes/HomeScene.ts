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
  protected static programInfo: ReturnType<typeof createProgramInfo>

  public worldTransform = m4.scale(m4.translate(m4.identity(), [0, 0, -5]), [0.01, 0.01, 0.01])
  protected bufferInfo: ReturnType<typeof primitives.createXYQuadBufferInfo>

  public constructor(gl: WebGLRenderingContext) {
    // Create the shader program if it doesn't exist
    if (!Particle.programInfo) {
      Particle.programInfo = createProgramInfo(gl, [vs, fs])
    }

    // Create a buffer for the geometry
    this.bufferInfo = primitives.createXYQuadBufferInfo(gl)
  }

  public render(scene: Scene) {
    const uniforms = {
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

  public createParticles() {
    const gl = this.getContext()
    const range = 1000

    for (let i = 0; i < 1000; i++) {
      const particle = new Particle(gl)
      const x = Math.random() * range - range * 0.5
      const y = Math.random() * range * 0.5 - range * 0.25

      particle.worldTransform = m4.translate(particle.worldTransform, [x, y, 0])

      this.particles.push(particle)
    }
  }

  public animate(deltaSeconds: number) {
    for (const particle of this.particles) {
      particle.worldTransform = m4.translate(particle.worldTransform, [0, deltaSeconds, 0])
      particle.worldTransform = m4.rotateX(
        particle.worldTransform,
        Math.random() * Math.PI * 2 * deltaSeconds,
      )
      particle.render(this)
    }
  }
}
