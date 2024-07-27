const express = require('express');
const http = require('http');
const Socket = require('socket.io');
const app = express();
const path = require('path');
const PORT = 3000;

const server = http.createServer(app);
const io = Socket(server);

// Setting up ejs
app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname , "public")));
app.use(express.static("public"));

// Handling the io
io.on("connection", function(socket){
    console.log("connected");
    // Accepting the location on backend
    socket.on("send-location", function(data){
        io.emit("received-location", {id: socket.id, ...data });
    });
    socket.on("disconnect", function(){
        io.emit("user-disconnect", socket.id);
    });
});

app.get("/", function(req, res){
    res.render("index");
})

server.listen(PORT, () => {
    console.log(`I am running on PORT ${PORT}`);
})