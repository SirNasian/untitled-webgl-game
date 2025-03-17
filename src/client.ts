import { connect } from "./client/connection";

let _token: Uint8Array | null = null;
let _id: number = -1;

const connection = connect({
	url: `ws://${window.location.host}`,
	onInit: (token, id) => (_token = token) && (_id = id),
});
