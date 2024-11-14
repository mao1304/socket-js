import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { createClient } from 'redis';

const client = createClient({
    password: 'WihZVLCgfWgerlvLn4p9AUHpnO9yMwYa',
    socket: {
        host: 'redis-10062.c114.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 10062
    }
});
import socketHandlers from './socketHandlers.js';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {cors: {origin: '*' } });

await client.connect();

app.use(express.static('public'));


// Objeto para almacenar las ubicaciones de los usuarios conectados
const users = {}; // Asegúrate de que este objeto esté definido antes de pasar al manejador

io.on('connection', (Socket) => {
    console.log('Client connection established:', Socket.id);

    // Pasa el objeto `users` al manejador del socket
    socketHandlers(io, Socket, users, client);

    Socket.on('disconnect', () => {
        console.log(`User disconnected: ${Socket.id}`);
        delete users[Socket.id]; // Elimina al usuario desconectado del objeto
        io.emit('userDisconnected', Socket.id); // Notifica a los clientes que el usuario se ha desconectado
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// async function getAvailableRepartidores(client) {
//     // Obtener todos los repartidores
//     const repartidores = await client.sendCommand(['HGETALL', 'repartidores']);
//     const repartidoresObj = {};
//     for (let i = 0; i < repartidores.length; i += 2) {
//         repartidoresObj[repartidores[i]] = repartidores[i + 1];
//     }
//     // Filtrar los repartidores que están disponibles
//     const disponibles = Object.entries(repartidores)
//         .filter(([_, data]) => {
//             const repartidor = JSON.parse(data);
//             return repartidor.disponible === true;
//         })
//         .map(([id, data]) => ({ id, ...JSON.parse(data) }));

//     return disponibles;
// }

// getAvailableRepartidores(client)
// .then(disponibles => {
//     console.log("Repartidores disponibles:", disponibles);
// })
// .catch(error => {
//     console.error("Error al obtener repartidores disponibles:", error);
// });