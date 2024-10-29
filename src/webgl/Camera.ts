import { m4 } from 'twgl.js'

// Pre-calculated constant ratio
const degToRad = (deg: number) => deg * 0.01745

export default class Camera {
  /** The  current aspect ratio of the view */
  public aspect = 16 / 9

  /** The output matrix of the camera */
  public view = m4.identity()
  public viewProjection = m4.identity()

  public constructor(canvas: HTMLCanvasElement) {
    this.setAspectRatio(canvas.clientWidth, canvas.clientHeight)
  }

  /** Prepares and updates the camera. Doesn't actually render anything but still necessary. */
  public render(gl: WebGLRenderingContext) {
    // Typical 90 degree horizontal field of view converted to a vertical field of view via the aspect ratio
    const verticalFov = degToRad(90 / this.aspect)

    // Create a perspective transformation based on the field of view
    const projection = m4.perspective(verticalFov, this.aspect, 0.1, 200)

    // The camera position
    const eye = [0, 0, -10]

    // The look at position
    const target = [0, 0, 0]

    // A constant "up" vector, here +Y is up
    const up = [0, 1, 0]

    // Create the view transformation used to place objects in the camera's line of sight
    this.view = m4.inverse(m4.lookAt(eye, target, up))

    // Combine the view and projection transformations into a camera lens like transformation
    this.viewProjection = m4.multiply(projection, this.view)
  }

  /** Update the aspect ratio, useful to use on window resize for example */
  public setAspectRatio(width: number, height: number) {
    this.aspect = width / height
  }
}
