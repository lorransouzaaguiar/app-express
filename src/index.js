import { app } from "./server.js";

const hostname = '127.0.0.1';
const port = 3000;

const server = app.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`))

export {server}
