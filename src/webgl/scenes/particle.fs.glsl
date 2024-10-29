precision mediump float;

varying vec3 frag_Normal;

const vec4 lit = vec4(0.615, 0.87, 1.0, 1.0);
const vec4 unlit = vec4(0.1, 0.125, 0.27, 1.0);
const vec3 sun = vec3(0.33, -0.33, 0.33);

void main() {
  gl_FragColor = mix(unlit, lit, dot(normalize(sun), normalize(frag_Normal)));
}