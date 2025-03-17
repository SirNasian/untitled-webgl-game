import { connect } from "./client/connection";

const connection = connect({ url: `ws://${window.location.host}` });
