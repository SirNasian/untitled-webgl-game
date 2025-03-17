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
	if (message.token) message.token.forEach((byte, index) => view.setUint8(index, byte));
	view.setUint8(16, message.type);

	switch (message.type) {
		case MessageType.INIT: return encodeInitMessage(buffer, message as InitMessage);
		default: return null;
	}
};

export const decode = (buffer: ArrayBuffer): Message | null => {
	const token = new Uint8Array(buffer.slice(0, 16));
	const type = new DataView(buffer).getUint8(16) as MessageType;
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
	id: new DataView(buffer).getUint8(17),
});
