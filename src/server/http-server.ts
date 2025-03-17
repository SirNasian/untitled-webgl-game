import * as fs from "fs";
import * as http from "http";
import * as path from "path";

export default http.createServer((req, res) => {
	if (req.url === "/favicon.ico")
		return res.writeHead(200).end();

	let filepath = path.join(__dirname, "public", req.url);
	if (fs.existsSync(filepath) && fs.statSync(filepath).isDirectory())
		filepath = path.join(filepath, 'index.html');

	fs.readFile(filepath, (err, data) => {
		err
			? res.writeHead(404, { "Content-Type": "text/plain" }).end("404 Not Found")
			: res.writeHead(200).end(data);
	});
});
