attribute vec4 position;
attribute vec3 normal;

varying vec3 frag_Normal;

uniform mat4 worldViewProjection;
uniform mat4 worldView;

void main() {
  gl_Position = worldViewProjection * position;
  frag_Normal = (worldView * vec4(normal, 0.0)).xyz;
}