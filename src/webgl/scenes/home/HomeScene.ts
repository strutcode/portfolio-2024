import {
  addExtensionsToContext,
  createBufferInfoFromArrays,
  createProgramInfo,
  createVertexArrayInfo,
  drawBufferInfo,
  m4,
  primitives,
  setBuffersAndAttributes,
  setUniforms,
} from 'twgl.js'

import Scene from '../../Scene'

// Shaders -- using ?raw to import as string and avoid syntax errors
import vs from './particle.vs.glsl?raw'
import fs from './particle.fs.glsl?raw'

import points from './test2.json'
import OrbitCamera from '../../OrbitCamera'

/** A fancy sparkling shimmery effect for the home page */
export default class HomeScene extends Scene {
  public camera: OrbitCamera

  private particles = 10000
  private shape = new Float32Array(points)
  private data: Record<any, any> = {}

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas)

    this.camera = new OrbitCamera(canvas)

    // Load required WebGL extensions on start
    addExtensionsToContext(this.getContext())

    this.createParticles()

    this.camera.distance = 2.5
  }

  public dispose() {
    super.dispose()
  }

  /** Creates the particles used in the animation */
  public createParticles() {
    const gl = this.getContext()

    /** The total number of particles */
    const numInstances = this.particles
    /** The world matrices of each particle as a flat array of mat4 */
    const instanceWorlds = new Float32Array(numInstances * 16) // 4x4 = 16 floats per particle
    /** Get a random float between `x` and `y` */
    const randfRange = (x: number, y: number) => x + Math.random() * (y - x)
    /** The spread range of particles on initial spawn */
    const range = 20

    for (let i = 0; i < numInstances; ++i) {
      // Extract the world matrix of the current particle as a buffer view
      const mat = new Float32Array(instanceWorlds.buffer, i * 16 * 4, 16)

      // Randomize the position and rotation of the particle
      m4.translation(
        [randfRange(-range, range), randfRange(-range, range), randfRange(0, range)],
        mat,
      )
      m4.rotateZ(mat, randfRange(0, Math.PI * 2), mat)
      m4.rotateX(mat, randfRange(0, Math.PI * 2), mat)
    }

    // Create the vertex arrays for the particles
    const arrays = primitives.createCubeVertices(0.01)

    // Add the instance world matrix as an attribute
    Object.assign(arrays, {
      instanceWorld: {
        numComponents: 16,
        data: instanceWorlds,
        divisor: 1,
      },
    })

    // Create the program and buffer info
    const programInfo = createProgramInfo(gl, [vs, fs])
    const bufferInfo = createBufferInfoFromArrays(gl, arrays)
    const vertexArrayInfo = createVertexArrayInfo(gl, programInfo, bufferInfo)

    // Save the data for use in the render loop
    this.data = {
      programInfo,
      bufferInfo,
      vertexArrayInfo,
      instanceWorlds,
    }
  }

  /** Called by the base Scene class on render */
  public animate(deltaSeconds: number) {
    this.updateCamera(deltaSeconds)
    this.updateParticles(deltaSeconds)
    this.renderParticles()
  }

  public updateCamera(deltaSeconds: number) {
    this.camera.azimuth += deltaSeconds * 0.1
  }

  private updateParticles(deltaSeconds: number) {
    const gl = this.getContext()
    const { instanceWorlds } = this.data

    // Iterate every particle and rotate it slightly
    for (let i = 0; i < this.particles; ++i) {
      const mat = new Float32Array(instanceWorlds.buffer, i * 16 * 4, 16)
      const target = new Float32Array(this.shape.buffer, i * 3 * 4, 3)
      const diff = [target[0] - mat[12], target[1] - mat[13], target[2] - mat[14]]

      diff[0] *= deltaSeconds * 2
      diff[1] *= deltaSeconds * 2
      diff[2] *= deltaSeconds * 2

      m4.translate(mat, diff, mat)

      // Rotate the particle around the X axis by a random amount between 0.0 and 1.0 scaled to the frame rate (deltaSeconds)
      m4.rotateX(mat, deltaSeconds * Math.random(), mat)
    }

    // Update the buffer with the new world matrices
    gl.bindBuffer(gl.ARRAY_BUFFER, this.data.bufferInfo.attribs.instanceWorld.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, instanceWorlds)
  }

  private renderParticles() {
    // Sets up the context -- the uniforms and buffer info used for rendering and the original world matrix attribute array
    const gl = this.getContext()
    const { programInfo, vertexArrayInfo } = this.data
    const uniforms = {
      view: this.camera.view,
      viewProjection: this.camera.viewProjection,
    }

    // Activate the shaders
    gl.useProgram(programInfo.program)

    // Set the buffers and attributes
    setBuffersAndAttributes(gl, programInfo, vertexArrayInfo)

    // Update the uniforms
    setUniforms(programInfo, uniforms)

    // Draw the entire instance buffer
    drawBufferInfo(
      gl,
      vertexArrayInfo,
      gl.TRIANGLES,
      vertexArrayInfo.numelements,
      0,
      this.particles,
    )
  }
}
