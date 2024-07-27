import express from 'express';
import http from 'http';
import { Socket } from 'socket.io';
const app = express();
const PORT = 3000;

const server = http.createServer(app);
const io = Socket(server);

app.get("/", function(req, res){
    res.send("hey");
})

server.listen(PORT, () => {
    console.log(`I am running on PORT ${PORT}`);
})