export default (io, Socket, users, client) => {

    Socket.on('location', async (data) => {
        const { domiID, latitude, longitude, estado } = data;
        console.log(`User ${Socket.id} - Latitude: ${latitude}, Longitude: ${longitude}, domiID: ${domiID}, estado: ${estado}`);

            // Guardar la ubicación y el estado del repartidor en Redis como JSON
            try {
                await client.hSet(
                  "repartidores",  // Nombre del hash en Redis
                  domiID,    // Clave única para el repartidor
                  JSON.stringify({ latitude, longitude, estado}) // Datos del repartidor en JSON
                );
                console.log(`Ubicación del repartidor guardada en Redis con éxito`);
              } catch (error) {
                console.error(`Error al guardar la ubicación del repartidor en Redis: ${error.message}`);
              }
        // Obtener todas las ubicaciones actualizadas de Redis
        try {
            const repartidores = await client.sendCommand(['HGETALL', 'repartidores']);
            const repartidoresObj = {};

            for (let i = 0; i < repartidores.length; i += 2) {
                repartidoresObj[repartidores[i]] = JSON.parse(repartidores[i + 1]);
            }

            // Emitir todas las ubicaciones a los clientes conectados
            io.emit('locationsUpdate', repartidoresObj);
        } catch (error) {
            console.error(`Error al obtener las ubicaciones desde Redis: ${error.message}`);
        }
    });
};