// Define los parámetros de la solicitud
const osrmUrl = 'http://router.project-osrm.org/route/v1/driving';
const coordinates = '4.1420,-73.6266;4.0742,-73.4915;3.9742,-73.2915';
const options = '?overview=false';

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
    // Extrae la geometría de la respuesta
    console.log(data);
    // const route = data.routes[0].geometry;

  })
  .catch(error => {
    console.error('Error:', error);
  });