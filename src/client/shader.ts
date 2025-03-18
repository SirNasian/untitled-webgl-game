let _program: WebGLProgram = null;

export interface ShaderProgram {
	getAttribLocation: (name: string) => GLint;
	setUniformMatrix4fv: (name: string, data: Float32Array) => void;
	use: () => void;
}

export const createShaderProgram = (
	gl: WebGL2RenderingContext,
	vertex_source: string,
	fragment_source: string,
	name: string = "unnamed",
): ShaderProgram => {
	const program = compileProgram(gl, vertex_source, fragment_source, name);

	const attribute_locations: Record<string, GLint> = {};
	const getAttribLocation = (name: string): GLint => {
		if (!attribute_locations[name])
			attribute_locations[name] = gl.getAttribLocation(program, name);
		return attribute_locations[name];
	};

	const uniform_locations: Record<string, WebGLUniformLocation> = {};
	const getUniformLocation = (name: string): WebGLUniformLocation => {
		if (!uniform_locations[name])
			uniform_locations[name] = gl.getUniformLocation(program, name);
		return uniform_locations[name];
	};

	const setUniformMatrix4fv = (name: string, data: Float32Array): void => {
		const location = getUniformLocation(name);
		gl.uniformMatrix4fv(location, true, data);
	};

	return {
		getAttribLocation,
		setUniformMatrix4fv,
		use: () => (_program === program) || gl.useProgram(_program = program),
	};
};

const compileProgram = (
	gl: WebGL2RenderingContext,
	vertex_source: string,
	fragment_source: string,
	name: string = "unnamed",
): WebGLProgram => {
	const program = gl.createProgram();
	const vertex_shader = compileShader(gl, gl.VERTEX_SHADER, vertex_source, name);
	const fragment_shader = compileShader(gl, gl.FRAGMENT_SHADER, fragment_source, name);

	gl.attachShader(program, vertex_shader);
	gl.attachShader(program, fragment_shader);
	gl.linkProgram(program);

	gl.deleteShader(vertex_shader);
	gl.deleteShader(fragment_shader);

	const info = gl.getProgramInfoLog(program);
	if (info) throw new Error(`Failed to create "${name}" shader program: ${info}`);

	return program;
}

const compileShader = (gl: WebGL2RenderingContext, type: GLenum, source: string, name: string = "unnamed"): WebGLShader => {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	const shader_types: Record<GLenum, string> = {};
	shader_types[gl.VERTEX_SHADER] = "vertex";
	shader_types[gl.FRAGMENT_SHADER] = "fragment";

	const info = gl.getShaderInfoLog(shader);
	if (info) throw new Error(`Failed to compile "${name}" ${shader_types[type]} shader: ${info}`);

	return shader;
};
