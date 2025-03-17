export enum MessageType {
	INIT = 0,
};

interface BaseMessage {
	token?: string,
	type: MessageType,
}

export interface InitMessage extends BaseMessage {
	type: MessageType.INIT,
	id: string,
}

export type Message = InitMessage;

export const encode = (message: Message): ArrayBuffer | null => {
	const buffer = new ArrayBuffer(getBufferSize(message.type));
	const view = new DataView(buffer);
	if (message.token) new TextEncoder().encode(message.token).forEach((byte, index) => view.setInt8(index, byte));
	view.setInt8(36, message.type);

	switch (message.type) {
		case MessageType.INIT: return encodeInitMessage(buffer, message as InitMessage);
		default: return null;
	}
};

export const decode = (buffer: ArrayBuffer): Message | null => {
	const token = new TextDecoder().decode(buffer.slice(0, 36));
	const type = new DataView(buffer).getInt8(36) as MessageType;
	if (!Object.values(MessageType).includes(type))
		return null;

	switch (type) {
		case MessageType.INIT: return decodeInitMessage(buffer, { token, type });
		default: return null;
	}
};

const getBufferSize = (type: MessageType): number => {
	switch (type) {
		case MessageType.INIT: return 73;
		default: return 0;
	}
};

const encodeInitMessage = (buffer: ArrayBuffer, message: InitMessage): ArrayBuffer => {
	const view = new DataView(buffer);
	new TextEncoder().encode(message.id).forEach((byte, index) => view.setInt8(37+index, byte));
	return buffer;
};

const decodeInitMessage = (buffer: ArrayBuffer, message: BaseMessage): InitMessage => ({
	...message,
	id: new TextDecoder().decode(buffer.slice(37, 73))
});
