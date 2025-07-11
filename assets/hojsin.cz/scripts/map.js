/* global L */
const API_KEY = '6hlig4UnptJZRQSxNSaRMobUDoti2DYAunyG8d-5myA';

/*
We create the map and set its initial coordinates and zoom.
See https://leafletjs.com/reference.html#map
*/
const coords = [49.58349836348118, 14.714412202043206];
const zoom = 14;

const map = L.map('map')
    .setView(coords, zoom);

/*
Then we add a raster tile layer with REST API Mapy.cz tiles
See https://leafletjs.com/reference.html#tilelayer
*/
L.tileLayer(`https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${API_KEY}`, {
    minZoom: 0,
    maxZoom: 19,
    attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
})
    .addTo(map);

/*
We also require you to include our logo somewhere over the map.
We create our own map control implementing a documented interface,
that shows a clickable logo.
See https://leafletjs.com/reference.html#control
*/
const LogoControl = L.Control.extend({
    options: {
        position: 'bottomleft',
    },

    onAdd(/* mapInstance */) {
        const container = L.DomUtil.create('div');
        const link = L.DomUtil.create('a', '', container);

        link.setAttribute('href', 'https://en.mapy.cz/turisticka?x=14.7144122&y=49.5835401&z=17&pano=1&source=addr&id=10420735"');
        link.setAttribute('target', '_blank');
        link.innerHTML = '<img src="https://api.mapy.cz/img/api/logo.svg" />';
        L.DomEvent.disableClickPropagation(link);

        return container;
    },
});

// finally we add our LogoControl to the map
new LogoControl().addTo(map);

L.marker(coords)
    .addTo(map);
