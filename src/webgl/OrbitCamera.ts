import Camera from './Camera'

export default class OrbitCamera extends Camera {
  /** Horizontal angle in degrees */
  public azimuth = 0
  /** Vertical angle in degrees */
  public altitude = 0
  /** Distance from the target in meters */
  public distance = 10

  public render(gl: WebGLRenderingContext) {
    this.position = [
      this.distance * Math.cos(this.altitude) * Math.sin(this.azimuth),
      this.distance * Math.sin(this.altitude),
      this.distance * Math.cos(this.altitude) * Math.cos(this.azimuth),
    ]

    super.render(gl)
  }
}
