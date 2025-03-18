import { connect } from "./client/connection";
import { createMesh } from "./client/mesh";
import { createShaderProgram, ShaderProgram } from "./client/shader";

let _id: number = -1;

const connection = connect({
	url: `ws://${window.location.host}`,
	onInit: (id) => (_id = id),
});

const canvas = document.getElementsByTagName("canvas")[0];
const gl = canvas.getContext("webgl2");

new ResizeObserver(() => {
	canvas.width = canvas.clientHeight;
	canvas.height = canvas.clientHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
}).observe(canvas);

const mesh = createMesh(
	gl,
	new Float32Array([
		-0.5, -0.5, 0.0,
		 0.5, -0.5, 0.0,
		 0.0,  0.5, 0.0,
	]),
	new Uint32Array([
		0, 1, 2,
	]),
);

const init = async () => {
	const [vertex_source, fragment_source] = await Promise.all([
		window.fetch("/shader/base.vs").then(response => response.text()),
		window.fetch("/shader/base.fs").then(response => response.text()),
	])

	const shader = createShaderProgram(gl, vertex_source, fragment_source, "base");

	render(shader);
};

const render = (shader: ShaderProgram) => {
	gl.clearColor(0, 0, 0, 1);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	mesh.render(shader);

	requestAnimationFrame(() => render(shader));
};

init();
