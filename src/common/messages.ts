export enum MessageType {
	INIT = 0,
};

interface BaseMessage {
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
	view.setUint8(0, message.type);

	switch (message.type) {
		case MessageType.INIT: return encodeInitMessage(buffer, message.id);
		default: return null;
	}
};

export const decode = (buffer: ArrayBuffer): Message | null => {
	const view = new DataView(buffer);
	const type = view.getUint8(0) as MessageType;
	if (!Object.values(MessageType).includes(type))
		return null;

	switch (type) {
		case MessageType.INIT: return decodeInitMessage(buffer, type);
		default: return null;
	}
};

const getBufferSize = (type: MessageType): number => {
	switch (type) {
		case MessageType.INIT: return 2;
		default: return 0;
	}
};

const encodeInitMessage = (buffer: ArrayBuffer, id: number): ArrayBuffer => {
	const view = new DataView(buffer);
	view.setUint8(1, id);
	return buffer;
};

const decodeInitMessage = (buffer: ArrayBuffer, type: MessageType): InitMessage => ({
	type,
	id: new DataView(buffer).getUint8(1),
});
