import { connect } from "./client/connection";

let _id: number = -1;

const connection = connect({
	url: `ws://${window.location.host}`,
	onInit: (id) => (_id = id),
});
