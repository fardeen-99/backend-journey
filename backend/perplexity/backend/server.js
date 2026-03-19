import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
// import modelresponser from "./src/services/ai.service.js";
import { initSocket } from "./src/sockets/server.socket.js";
import http from "http";
dotenv.config();

const server = http.createServer(app);
initSocket(server);

const PORT = 3000

connectDB();
// modelresponser()

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});