attribute vec4 position;
attribute vec3 normal;
attribute mat4 instanceWorld;

varying vec3 frag_Normal;

uniform mat4 viewProjection;
uniform mat4 view;

void main() {
  mat4 worldView = view * instanceWorld;
  mat4 worldViewProjection = viewProjection * instanceWorld;

  gl_Position = worldViewProjection * position;
  frag_Normal = (worldView * vec4(normal, 0.0)).xyz;
}