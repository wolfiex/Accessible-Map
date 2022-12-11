var map = (window.map = new maplibregl.Map({
  container: 'map',
  zoom: 12,
  center: [11.39085, 47.27574],
  pitch: 52,
  hash: true,
  style: {
  version: 8,
  sources: {
  osm: {
  type: 'raster',
  tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
  tileSize: 256,
  attribution: '&copy; OpenStreetMap Contributors',
  maxzoom: 19
  },
  terrainSource: {
  type: 'raster-dem',
  url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
  tileSize: 256
  },
  hillshadeSource: {
  type: 'raster-dem',
  url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
  tileSize: 256
  }
  },
  layers: [
  {
  id: 'osm',
  type: 'raster',
  source: 'osm'
  },
  {
  id: 'hills',
  type: 'hillshade',
  source: 'hillshadeSource',
  layout: { visibility: 'visible' },
  paint: { 'hillshade-shadow-color': '#473B24' }
  }
  ],
  terrain: {
  source: 'terrainSource',
  exaggeration: 1
  }
  },
  maxZoom: 18,
  maxPitch: 85
  }));
   
  map.addControl(
  new maplibregl.NavigationControl({
  visualizePitch: true,
  showZoom: true,
  showCompass: true
  })
  );
   
  map.addControl(
  new maplibregl.TerrainControl({
  source: 'terrainSource',
  exaggeration: 1
  })
  );
 