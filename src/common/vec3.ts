export type Vec3 = Float32Array & { readonly __type: "Vec3" };

export const create = (x: number, y: number, z: number): Vec3 =>
	new Float32Array([x, y, z]) as Vec3;

export const cross = (a: Vec3, b: Vec3): Vec3 =>
	create(
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0],
	);

export const dot = (a: Vec3, b: Vec3): number =>
	a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

export const normalize = (a: Vec3): Vec3 => {
	const length = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
	return (length > 0.0001)
		? create(a[0]/length, a[1]/length, a[2]/length)
		: create(0, 0, 0);
};

export const add = (a: Vec3, b: Vec3): Vec3 =>
	new Float32Array([
		a[0] + b[0],
		a[1] + b[1],
		a[2] + b[2],
	]) as Vec3;

export const subtract = (a: Vec3, b: Vec3): Vec3 =>
	new Float32Array([
		a[0] - b[0],
		a[1] - b[1],
		a[2] - b[2],
	]) as Vec3;
