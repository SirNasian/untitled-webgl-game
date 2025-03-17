export enum MessageType {
	INIT = 0,
};

interface BaseMessage {
	token?: Uint8Array,
	type: MessageType,
}

export interface InitMessage extends BaseMessage {
	type: MessageType.INIT,
	id: number,
}

export type Message = InitMessage;

export const encode = (message: Message): ArrayBuffer | null => {
	const buffer = new ArrayBuffer(getBufferSize(message.type));
	const view = new DataView(buffer);
	view.setUint8(0, (message.type << 1) | (message.token ? 1 : 0));
	if (message.token) message.token.forEach((byte, offset) => view.setUint8(1+offset, byte));

	switch (message.type) {
		case MessageType.INIT: return encodeInitMessage(buffer, message as InitMessage);
		default: return null;
	}
};

export const decode = (buffer: ArrayBuffer): Message | null => {
	const view = new DataView(buffer);
	const type = view.getUint8(0) >> 1 as MessageType;
	const token = (view.getUint8(0) & 1) ? new Uint8Array(buffer.slice(1, 17)) : undefined;
	if (!Object.values(MessageType).includes(type))
		return null;

	switch (type) {
		case MessageType.INIT: return decodeInitMessage(buffer, { token, type });
		default: return null;
	}
};

const getBufferSize = (type: MessageType): number => {
	switch (type) {
		case MessageType.INIT: return 18;
		default: return 0;
	}
};

const encodeInitMessage = (buffer: ArrayBuffer, message: InitMessage): ArrayBuffer => {
	const view = new DataView(buffer);
	view.setUint8(17, message.id);
	return buffer;
};

const decodeInitMessage = (buffer: ArrayBuffer, message: BaseMessage): InitMessage => ({
	...message,
	id: new DataView(buffer).getUint8(message.token ? 17 : 1),
});
