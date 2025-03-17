import server from "./server/http-server";
import vars from "./server/environment-variables";

import { WebSocket, WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";

const _sockets: Record<string, WebSocket> = {};

new WebSocketServer({ server }).on("connection", (socket) => {
	const token = uuid();
	const id = uuid();
	
	_sockets[id] = socket;
	socket.send(JSON.stringify({ token, id }));
});

server.listen(3000, () => console.log(vars));
