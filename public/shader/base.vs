#version 300 es

uniform mat4 vertex_transform;

layout (location = 0) in vec3 vertex_position;
layout (location = 1) in vec2 vertex_uv;
out vec2 fragment_uv;

void main() {
	gl_Position = vertex_transform * vec4(vertex_position, 1.0);
	fragment_uv = vertex_uv;
}
