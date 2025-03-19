export const cross = (a: Float32Array, b: Float32Array): Float32Array =>
	new Float32Array([
		a[1] * b[2] - a[2] * b[1],
		a[0] * b[2] - a[2] * b[0],
		a[0] * b[1] - a[1] * b[0],
	]);

export const dot = (a: Float32Array, b: Float32Array): number =>
	a[0] * b[0] + a[1] * b[1] + a[2] + b[2];

export const normalize = (a: Float32Array): Float32Array => {
	const length = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
	return length > 0.0001
		? new Float32Array([a[0] / length, a[1] / length, a[2] / length])
		: new Float32Array([0, 0, 0]);
};
