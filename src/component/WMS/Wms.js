import React, { useEffect } from "react";

function Wms({ map }) {
  useEffect(() => {
    if (!map) return;
    map.on("load", function () {
      map.addSource("wms", {
        type: "raster",
        tiles: [
          "http://127.0.0.1:8080/geoserver/Lalitpur/wms?service=WMS&version=1.1.0&request=GetMap&layers=Lalitpur%3AAmenities&bbox=85.28457641601562%2C27.617332458496094%2C85.35060119628906%2C27.69175148010254&width=681&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers",
        ],
        tileSize: 256,
      });
      map.addLayer(
        {
          id: "wms-test-layer",
          type: "raster",
          source: "wms",
          paint: {},
        },
        "aeroway_fill"
      );
    });
  }, [map]);
  return;
}

export default Wms;
