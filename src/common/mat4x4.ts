export const identity = () => new Float32Array([
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1,
]);

export const translate = (matrix: Float32Array, x: number, y: number, z: number): Float32Array =>
	new Float32Array([
		matrix[0],  matrix[1],  matrix[2],  matrix[3]  + x,
		matrix[4],  matrix[5],  matrix[6],  matrix[7]  + y,
		matrix[8],  matrix[9],  matrix[10], matrix[11] + z,
		matrix[12], matrix[13], matrix[14], matrix[15],
	]);

export const scale = (matrix: Float32Array, x: number, y: number, z: number): Float32Array =>
	new Float32Array([
		matrix[0] * x,  matrix[1],      matrix[2],      matrix[3],
		matrix[4],      matrix[5] * y,  matrix[6],      matrix[7],
		matrix[8],      matrix[9],      matrix[10] * z, matrix[11],
		matrix[12],     matrix[13],     matrix[14],     matrix[15],
	]);

export const rotateX = (matrix: Float32Array, angle: number): Float32Array => {
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	return multiply(
		new Float32Array([
			1, 0,  0, 0,
			0, c, -s, 0,
			0, s,  c, 0,
			0, 0,  0, 1,
		]),
		matrix
	);
};

export const rotateY = (matrix: Float32Array, angle: number): Float32Array => {
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	return multiply(
		new Float32Array([
			c,  0, s, 0,
			0,  1, 0, 0,
			-s, 0, c, 0,
			0,  0, 0, 1,
		]),
		matrix
	);
};

export const rotateZ = (matrix: Float32Array, angle: number): Float32Array => {
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	return multiply(
		new Float32Array([
			c, -s, 0, 0,
			s,  c, 0, 0,
			0,  0, 1, 0,
			0,  0, 0, 1,
		]),
		matrix
	);
};

export const multiply = (a: Float32Array, b: Float32Array): Float32Array => {
	const c = new Float32Array(16);

	for (let i = 0; i < a.length; i++) {
		const row = Math.trunc(i / 4);
		const column = i % 4;

		c[i] = 0;
		for (let j = 0; j < 4; j++)
			c[i] += a[4 * row + j] * b[4 * j + column];
	}

	return c;
};
