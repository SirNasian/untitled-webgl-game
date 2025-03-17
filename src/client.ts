import { connect } from "./client/connection";

let _token: string;
let _id: number;

const connection = connect({
	url: `ws://${window.location.host}`,
	onInit: (token, id) => (_token = token) && (_id = id),
});
