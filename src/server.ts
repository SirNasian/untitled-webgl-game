import server from "./server/http-server";
import vars from "./server/environment-variables";

import { WebSocket, WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";

import { decode, encode, MessageType } from "./common/messages";

const _sockets: Record<string, WebSocket> = {};

new WebSocketServer({ server }).on("connection", (socket) => {
	const token = uuid();
	const id = uuid();
	
	_sockets[id] = socket;
	console.log(`${id} CONNECTED`);
	socket.send(encode({ type: MessageType.INIT, token, id }));

	socket.on("close", () => {
		delete _sockets[id];
		console.log(`${id} DISCONNECTED`);
	});

	socket.on("message", (data: Buffer) => {
		const buffer = data.buffer.slice(data.byteOffset, data.byteOffset+data.byteLength);
		const message = decode(buffer);
		console.debug(message);
	});
});

server.listen(3000, () => console.log(vars));
