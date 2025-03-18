#version 300 es
precision highp float;

uniform sampler2D fragment_texture;

in vec2 fragment_uv;
out vec4 fragment_colour;

void main() {
	fragment_colour = texture(fragment_texture, fragment_uv);
}
