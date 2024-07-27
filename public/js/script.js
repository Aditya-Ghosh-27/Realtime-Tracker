// Initializing socketIO
const socket = io(); // Calling io function -> sends a connection request to the backend i.e to the app.js file(app.set(express.staticpath) so we would need to handle that)

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        }, 
        (error) => {
        console.error(error);
        },
        // changing the settings
        {
            enableHighAccuracy: true,
            timeout: 2500,
            maximumAge: 0
        });
}

const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const markers = {};

socket.on("received-location", (data) => {
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude], 16);
    if(markers[id]){
        markers[id].setLatLong([latitude, longitude]);
    }
    else{
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnected", (id) => {
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];

    }
})