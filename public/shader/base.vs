#version 300 es

layout (location = 0) in vec3 vertex_position;

uniform mat4 vertex_transform;

void main() {
	gl_Position = vertex_transform * vec4(vertex_position, 1.0);
}
