import { connect } from "./client/connection";

let _id: string;
let _token: string;

const connection = connect({
	url: `ws://${window.location.host}`,
	onInit: (token, id) => (_token = token) && (_id = id) && console.debug({ _id, _token }),
});
