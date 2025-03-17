const path = require("path");

const generateBundle = ({ entry, target, output_filename, output_directory }) => ({
	entry,
	target,
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			}
		],
	},
	resolve: { extensions: [".ts", ".js"] },
	externals: ["bufferutil", "utf-8-validate"],
	output: { filename: output_filename, path: output_directory },
})

module.exports = [
	generateBundle({
		entry: path.join(__dirname, "src", "client.ts"),
		target: "web",
		output_filename: "client.js",
		output_directory: path.join(__dirname, "public", "js"),
	}),
	generateBundle({
		entry: path.join(__dirname, "src", "server.ts"),
		target: "node",
		output_filename: "server.js",
		output_directory: __dirname,
	}),
];
