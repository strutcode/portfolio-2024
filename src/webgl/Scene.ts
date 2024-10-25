import Camera from './Camera'

export default abstract class Scene {
  public camera: Camera

  protected context: WebGLRenderingContext | null

  // This prevents unnecessarily costly rebinds on every frame drawn
  private boundRender = this.render.bind(this)
  private previousTime = performance.now()

  public constructor(canvas: HTMLCanvasElement) {
    // Initialize WebGL
    const gl = (this.context = canvas.getContext('webgl'))

    if (!gl) {
      throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.')
    }

    // Create a simple camera
    this.camera = new Camera(canvas)

    // Start the render loop
    requestAnimationFrame(this.boundRender)
  }

  public getContext() {
    return this.context!
  }

  public render() {
    // If this context is no longer valid, exit the render loop immediately
    if (!this.context) return

    const gl = this.context

    // Set up display
    gl.canvas.width = window.innerWidth
    gl.canvas.height = window.innerHeight
    this.camera.setAspectRatio(gl.canvas.clientWidth, gl.canvas.clientHeight)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Turn off depth test because everything is transparent
    gl.disable(gl.DEPTH_TEST)

    // Enable blending
    // Because the final frame is also transparent we have to use two blend functions to get the correct result
    gl.enable(gl.BLEND)
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    // Prepare the camera for the frame
    this.camera.render(gl)

    // Keep speed constant with varying framerate
    const presentTime = performance.now()
    const deltaSeconds = (presentTime - this.previousTime) / 1000

    this.animate(deltaSeconds)

    this.previousTime = presentTime

    requestAnimationFrame(this.boundRender)
  }

  public dispose() {
    if (this.context) {
      const gl = this.context

      // Minimize frame buffers before GC
      gl.canvas.width = 1
      gl.canvas.height = 1

      // If the lose context extension is available clean up after ourselves
      gl.getExtension('WEBGL_lose_context')?.loseContext()

      // Clear the context to stop the animation frame loop
      this.context = null
    }
  }

  protected abstract animate(deltaSeconds: number): void
}
