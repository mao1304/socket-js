// Inicializa el mapa
const map = L.map('map').setView([4.1420, -73.6266], 13);

// Añade la capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Define los parámetros de la solicitud
const osrmUrl = 'http://router.project-osrm.org/route/v1/driving';
const coordinates = '4.1420,-73.6266;4.0742,-73.4915';
const options = '?overview=full&geometries=geojson&steps=false';

// Construye la URL completa
const url = `${osrmUrl}/${coordinates}${options}`;

// Realiza la solicitud GET al servidor OSRM
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Extrae la geometría de la respuesta (asumiendo que está en la primera ruta, en el primer leg)
    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0].legs[0].geometry;

      // Verifica la geometría en consola
      console.log('Ruta encontrada:', route);

      // Añade la ruta al mapa como GeoJSON si está disponible
      if (route) {
        L.geoJSON(route).addTo(map);
      } else {
        console.error('No se encontró geometría en la respuesta');
      }
    } else {
      console.error('No se encontraron rutas');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
