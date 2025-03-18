import * as fs from "fs";
import * as http from "http";
import * as path from "path";

export default http.createServer(async (req, res) => {
	if (req.url === "/favicon.ico")
		return res.writeHead(200).end();

	let filepath = path.join(__dirname, "public", req.url);
	if (fs.existsSync(filepath) && fs.statSync(filepath).isDirectory())
		filepath = path.join(filepath, 'index.html');

	const data = fs.readFileSync(filepath);

	if (filepath.endsWith(".js"))
		res.setHeader("Content-Type", "text/javascript");

	else if (filepath.endsWith(".png"))
		res.setHeader("Content-Type", "image/png");

	res.writeHead(200).end(data);
});
