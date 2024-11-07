import Scene from '../Scene'

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

// Shaders
import vs from './particle.vs.glsl?raw'
import fs from './particle.fs.glsl?raw'

/** A fancy sparkling shimmery effect for the home page */
export default class HomeScene extends Scene {
  private particles = 10000
  private data: Record<any, any> = {}

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas)

    addExtensionsToContext(this.getContext())

    this.createParticles()
  }

  public dispose() {
    super.dispose()
  }

  public createParticles() {
    const gl = this.getContext()

    const numInstances = this.particles
    const instanceWorlds = new Float32Array(numInstances * 16)
    const randfRange = (x, y) => x + Math.random() * (y - x)
    const range = 20

    for (let i = 0; i < numInstances; ++i) {
      const mat = new Float32Array(instanceWorlds.buffer, i * 16 * 4, 16)
      m4.translation(
        [randfRange(-range, range), randfRange(-range, range), randfRange(0, range)],
        mat,
      )
      m4.rotateZ(mat, randfRange(0, Math.PI * 2), mat)
      m4.rotateX(mat, randfRange(0, Math.PI * 2), mat)
    }

    const arrays = primitives.createCubeVertices(0.03)
    Object.assign(arrays, {
      instanceWorld: {
        numComponents: 16,
        data: instanceWorlds,
        divisor: 1,
      },
    })

    const programInfo = createProgramInfo(gl, [vs, fs])
    const bufferInfo = createBufferInfoFromArrays(gl, arrays)
    const vertexArrayInfo = createVertexArrayInfo(gl, programInfo, bufferInfo)

    this.data = {
      programInfo,
      bufferInfo,
      vertexArrayInfo,
      instanceWorlds,
    }

    console.log(vertexArrayInfo)
  }

  public animate(deltaSeconds: number) {
    const gl = this.getContext()
    const { programInfo, vertexArrayInfo, instanceWorlds } = this.data
    const uniforms = {
      view: this.camera.view,
      viewProjection: this.camera.viewProjection,
    }

    for (let i = 0; i < this.particles; ++i) {
      const mat = new Float32Array(instanceWorlds.buffer, i * 16 * 4, 16)
      m4.rotateX(mat, deltaSeconds * Math.random(), mat)
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.data.bufferInfo.attribs.instanceWorld.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, instanceWorlds)

    gl.useProgram(programInfo.program)
    setBuffersAndAttributes(gl, programInfo, vertexArrayInfo)
    setUniforms(programInfo, uniforms)
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
