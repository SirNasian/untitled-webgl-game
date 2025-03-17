interface Connection {
};

export const connect = ({
	url,
}: {
	url: string;
}): Connection => {
	const socket = new WebSocket(url);
	socket.addEventListener("message", (ev) => console.debug(ev.data));
	return {};
};
