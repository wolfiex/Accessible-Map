import maplibregl from 'maplibre-gl';



if ('SpeechSynthesisUtterance' in window) {
  window.synth = window.speechSynthesis;
  window.msg = new SpeechSynthesisUtterance();
  msg.text = 'speech tools enabled - "context menu". Use two finger click on the trackpad to trigger'
  synth.speak(msg);
 }

const map = new maplibregl.Map ({
  container: 'map',
  zoom: 7,
  center: [-0.0692413790966953, 51.94653213902913],
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap Contributors',
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm',
      },
    ],
  },
});

map.on ('load', function () {
  fetch ('/ons-district21-bgc.geojson')
    .then (d => d.json ())
    .then (geoJSONcontent => {
      console.log (geoJSONcontent);
      // Add as source to the map
      map.addSource ('geojson-source', {
        type: 'geojson',
        data: geoJSONcontent,
      });

      map.addLayer ({
        id: 'uploaded-polygons',
        type: 'fill',
        source: 'geojson-source',
        paint: {
          'fill-color': 'rgba(255,255,255,.5)',
          'fill-outline-color': 'black',
          'fill-opacity': 1,
        },
        filter: ['==', '$type', 'Polygon'],
      });
    })
    .then (() => {
      // create the event listener
      map.on ('contextmenu', 'uploaded-polygons', function (e) {
        const firstfeature = e.features[0];
        const properties = firstfeature.properties;
        var name = properties.areanm;

        console.log (name, properties);
        window.msg.text = `Area ${name}`
        window.synth.speak (msg);
      });
    });
});
