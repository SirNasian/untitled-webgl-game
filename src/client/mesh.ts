import { ShaderProgram } from "./shader";
import { Texture } from "./texture";

let _vao: WebGLVertexArrayObject = null;

export interface Mesh {
	render: (shader: ShaderProgram, texture: Texture, vertex_transform: Float32Array) => void;
}

export const createMesh = (
	gl: WebGL2RenderingContext,
	vertices: Float32Array,
	indices: Uint32Array,
): Mesh => {
	const vao = gl.createVertexArray();
	gl.bindVertexArray(vao);

	const vbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	gl.enableVertexAttribArray(0);
	gl.enableVertexAttribArray(1);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0 * Float32Array.BYTES_PER_ELEMENT);
	gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

	const ebo = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

	const render = (shader: ShaderProgram, texture: Texture, vertex_transform: Float32Array): void => {
		shader.use();
		shader.setUniformMatrix4fv("vertex_transform", vertex_transform);
		shader.setUniform1i("fragment_texture", 0);

		texture.bind(0);

		(_vao === vao) || gl.bindVertexArray(_vao = vao);
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_INT, 0);
	};

	return {
		render,
	};
}
