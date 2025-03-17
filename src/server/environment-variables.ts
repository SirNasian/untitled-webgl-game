export default {
	PORT: Number(process.env.PORT ?? 3000),
	MAX_CLIENTS: Number(process.env.MAX_CLIENTS ?? 256),
};
