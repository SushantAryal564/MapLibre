import React, { useEffect, useState, useRef } from "react";
import maplibreGl from "maplibre-gl";
import GeoJsonloader from "../GeoJSON/GeoJsonloader";
function BaseLayer() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  useEffect(() => {
    const map = new maplibreGl.Map({
      container: mapContainer.current,
      center: [0, 0],
      zoom: 5,
      pitch: 0,
      hash: true,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            ],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap Contributors",
            maxzoom: 19,
          },
          terrainSource: {
            type: "raster-dem",
            tiles: [
              "https://vtc-cdn.maptoolkit.net/terrainrgb/{z}/{x}/{y}.webp",
            ],
            encoding: "mapbox",
            maxzoom: 14,
            minzoom: 4,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
        terrain: {
          source: "terrainSource",
          exaggeration: 1,
        },
      },
    });
    map.on("load", () => {
      map.addControl(
        new maplibreGl.NavigationControl({
          visualizePitch: true,
          showZoom: true,
          showCompass: true,
        })
      );
      map.addControl(
        new maplibreGl.TerrainControl({
          source: "terrainSource",
          exaggeration: 1,
        })
      );
    });
    setMap(map);
    return () => map.remove();
  }, []);
  return (
    <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }}>
      <GeoJsonloader map={map} />
    </div>
  );
}

export default BaseLayer;
