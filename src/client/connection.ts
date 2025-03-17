import { decode, MessageType } from "../common/messages";

interface Connection {
};

export const connect = ({
	url,
	onInit,
}: {
	url: string;
	onInit: (token: Uint8Array | null, id: number) => void;
}): Connection => {
	const socket = new WebSocket(url);

	socket.addEventListener("message", async ({ data }: { data: Blob }) => {
		const message = decode(await data.arrayBuffer());

		switch (message.type) {
			case MessageType.INIT: return onInit(message.token ?? null, message.id);
		}
	});

	return {};
};
