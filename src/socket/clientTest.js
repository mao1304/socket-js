const ioClient = require('socket.io-client');

// URL del servidor de sockets, asegúrate de reemplazarlo con la correcta
const SERVER_URL = 'https://60sgw4z5-3000.use.devtunnels.ms/'; // Cambia esto si es necesario

// Función para generar una coordenada aleatoria dentro de un rango
function getRandomCoordinate(min, max) {
  return (Math.random() * (max - min) + min).toFixed(6);
}

// Función para generar una conexión simulada
function createConnection(domiID) {
  const socket = ioClient(SERVER_URL);

  // Generar coordenadas aleatorias en Villavicencio
  const latitude = getRandomCoordinate(4.11, 4.20);     // Latitud en el rango de Villavicencio
  const longitude = getRandomCoordinate(-73.75, -73.65); // Longitud en el rango de Villavicencio

  // Enviar la ubicación al servidor
  socket.emit('location', {
    domiID: `domi_${domiID}`,
    latitude: latitude,
    longitude: longitude
  });

  console.log(`Conexión creada para domiID: domi_${domiID}, Latitude: ${latitude}, Longitude: ${longitude}`);

  // Escuchar el evento de actualización de ubicaciones
  socket.on('locationsUpdate', (data) => {
    console.log(`Actualización de ubicaciones recibida para domi_${domiID}:`, data);
  });

  // Manejo de cierre de conexión
  socket.on('disconnect', () => {
    console.log(`Conexión cerrada para domiID: domi_${domiID}`);
  });
}

// Crear 10 conexiones
for (let i = 1; i <= 10; i++) {
  createConnection(i);
}
