    document.addEventListener('DOMContentLoaded', function () {
        const socket = io('http://localhost:3000');

        var map = L.map('map').setView([4.11, -73.60], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        var imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
        imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
        L.imageOverlay(imageUrl, imageBounds).addTo(map);
        var marker = L.marker([51.508, -0.09]).addTo(map);

        socket.on('location', (data) => {
            const { latitude, longitude } = data;
            console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
            // marker.update(latitude, longitude);
            marker.setLatLng([latitude, longitude]);
            // curl 'http://router.project-osrm.org/route/v1/driving/13.388860,52.517037;13.397634,52.529407;13.428555,52.523219?overview=false'
            
        });
        let latitude;
        let longitude;

            // Agrega un marcador al mapa usando el icono personalizado
            L.marker([0,0], { icon: customIcon }).addTo(map)
                .bindPopup('Este es un marcador con un icono personalizado.')
                .openPopup();

    });
