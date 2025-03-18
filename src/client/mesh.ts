import { ShaderProgram } from "./shader";

let _vao: WebGLVertexArrayObject = null;

export interface Mesh {
	render: (shader: ShaderProgram) => void;
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
	gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0 * Float32Array.BYTES_PER_ELEMENT);

	const ebo = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

	const render = (shader: ShaderProgram): void => {
		shader.use();
		(_vao === vao) || gl.bindVertexArray(_vao = vao);
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_INT, 0);
	};

	return {
		render,
	};
}
