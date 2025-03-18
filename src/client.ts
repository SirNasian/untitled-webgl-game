import { connect } from "./client/connection";
import { createMesh } from "./client/mesh";
import { createShaderProgram, ShaderProgram } from "./client/shader";
import { createTexture } from "./client/texture";
import * as mat4 from "./common/mat4x4";

let _id: number = -1;

const connection = connect({
	url: `ws://${window.location.host}`,
	onInit: (id) => (_id = id),
});

const canvas = document.getElementsByTagName("canvas")[0];
const gl = canvas.getContext("webgl2");

gl.enable(gl.BLEND);
gl.enable(gl.CULL_FACE);
gl.enable(gl.DEPTH_TEST);

gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
gl.cullFace(gl.BACK);

const texture = createTexture(gl, "/texture/Untitled.png");

new ResizeObserver(() => {
	canvas.width = canvas.clientHeight;
	canvas.height = canvas.clientHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
}).observe(canvas);

const mesh = createMesh(
	gl,
	new Float32Array([
		-0.5, -0.5, 0.0, 0.0, 0.0,
		 0.5, -0.5, 0.0, 1.0, 0.0,
		-0.5,  0.5, 0.0, 0.0, 1.0,
		 0.5,  0.5, 0.0, 1.0, 1.0,
	]),
	new Uint32Array([
		0, 1, 2,
		1, 3, 2,
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

const render = async (shader: ShaderProgram) => {
	gl.clearColor(0.2, 0.3, 0.3, 1.0);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	mesh.render(shader, await texture, mat4.identity());

	requestAnimationFrame(() => render(shader));
};

init();
