import { connect } from "./client/connection";
import { createShaderProgram, ShaderProgram } from "./client/shader";

let _id: number = -1;

const connection = connect({
	url: `ws://${window.location.host}`,
	onInit: (id) => (_id = id),
});

const canvas = document.getElementsByTagName("canvas")[0];
const gl = canvas.getContext("webgl2");

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

	requestAnimationFrame(() => render(shader));
};

init();
