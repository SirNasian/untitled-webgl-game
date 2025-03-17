import server from "./server/http-server";
import env from "./server/environment-variables";

import { WebSocket, WebSocketServer } from "ws";
import { v4 as genUUID, parse as parseUUID } from "uuid";

import { decode, encode, MessageType } from "./common/messages";

interface Client {
	socket: WebSocket;
}

const _clients: Record<string, Client> = {};

const generateClientID = (): number | null => {
	for (let i = 0; i < env.MAX_PLAYERS; i++)
		if (!_clients[i]) return i;
	return null;
};

new WebSocketServer({ server }).on("connection", (socket) => {
	const token = parseUUID(genUUID());
	const id = generateClientID();
	
	_clients[id] = { socket };
	console.log(`CLIENT_${id} CONNECTED`);
	socket.send(encode({ type: MessageType.INIT, token, id }));

	socket.on("close", () => {
		delete _clients[id];
		console.log(`CLIENT_${id} DISCONNECTED`);
	});

	socket.on("message", (data: Buffer) => {
		const buffer = data.buffer.slice(data.byteOffset, data.byteOffset+data.byteLength);
		const message = decode(buffer);
		console.debug(message);
	});
});

server.listen(3000, () => console.log(env));
