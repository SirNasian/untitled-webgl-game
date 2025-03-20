import * as vec3 from "./vec3";

export type Mat4 = Float32Array & { readonly __type: "Mat4" };

export const identity = () => new Float32Array([
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1,
]) as Mat4;

export const translate = (matrix: Mat4, x: number, y: number, z: number): Mat4 =>
	multiply(
		matrix,
		new Float32Array([
			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1,
		]) as Mat4,
	);

export const scale = (matrix: Mat4, x: number, y: number, z: number): Mat4 =>
	multiply(
		matrix,
		new Float32Array([
			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1,
		]) as Mat4,
	);

export const rotateX = (matrix: Mat4, angle: number): Mat4 => {
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	return multiply(
		matrix,
		new Float32Array([
			1, 0,  0, 0,
			0, c, -s, 0,
			0, s,  c, 0,
			0, 0,  0, 1,
		]) as Mat4,
	);
};

export const rotateY = (matrix: Mat4, angle: number): Mat4 => {
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	return multiply(
		matrix,
		new Float32Array([
			c,  0, s, 0,
			0,  1, 0, 0,
			-s, 0, c, 0,
			0,  0, 0, 1,
		]) as Mat4,
	);
};

export const rotateZ = (matrix: Mat4, angle: number): Mat4 => {
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	return multiply(
		matrix,
		new Float32Array([
			c, -s, 0, 0,
			s,  c, 0, 0,
			0,  0, 1, 0,
			0,  0, 0, 1,
		]) as Mat4,
	);
};

export const multiply = (a: Mat4, b: Mat4): Mat4 => {
	const c = new Float32Array(16) as Mat4;

	for (let i = 0; i < a.length; i++) {
		const row = Math.trunc(i / 4);
		const column = i % 4;

		c[i] = 0;
		for (let j = 0; j < 4; j++)
			c[i] += a[4 * row + j] * b[4 * j + column];
	}

	return c;
};

export const lookAt = (from: vec3.Vec3, to: vec3.Vec3, up: vec3.Vec3): Mat4 => {
	const z = vec3.normalize(vec3.subtract(from, to));
	const x = vec3.normalize(vec3.cross(up, z));
	const y = vec3.normalize(vec3.cross(z, x));
	return new Float32Array([
		x[0], x[1], x[2], -vec3.dot(x, from),
		y[0], y[1], y[2], -vec3.dot(y, from),
		z[0], z[1], z[2], -vec3.dot(z, from),
		0, 0, 0, 1,
	]) as Mat4;
}
