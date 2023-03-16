import React, { useEffect, useState, useRef } from "react";
import maplibreGl from "maplibre-gl";
function BaseLayer() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  useEffect(() => {
    const map = new maplibreGl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [0, 0],
      zoom: 9,
    });
    setMap(map);
    return () => map.remove();
  }, []);
  return (
    <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }}></div>
  );
}

export default BaseLayer;
