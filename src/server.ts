import server from "./server/http-server";
import vars from "./server/environment-variables";

server.listen(3000, () => console.log(vars));
