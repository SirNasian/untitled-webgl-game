let _offset: number = -1;
let _texture: WebGLTexture = null;

export interface Texture {
	bind: (offset: number) => void;
}

export const createTexture = async (gl: WebGL2RenderingContext, url: string): Promise<Texture> =>
	new Promise<Texture>((resolve) => {
		const image = new Image();
		image.addEventListener("load", () => {
			const texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

			const bind = (offset: number): void => {
				if ((_offset !== offset) || (_texture !== texture)) {
					_offset = offset;
					_texture = texture;
					gl.activeTexture(gl.TEXTURE0 + offset);
					gl.bindTexture(gl.TEXTURE_2D, texture);
				}
			};

			resolve({ bind });
		});
		image.src = url;
	});

