import React, { useEffect } from "react";
import usa from "./../TestData/json2.json";
import * as turf from "@turf/turf";
import maplibreGl from "maplibre-gl";

function GeoJsonloader({ map }) {
  function animatePoint(map, route, point) {
    var pointCoords = point.features[0].geometry.coordinates;
    var lineStringCoords = route.features[0].geometry.coordinates;
    var i = 0;
    var intervalId = setInterval(function () {
      if (i < lineStringCoords.length) {
        pointCoords = lineStringCoords[i];
        point.features[0].geometry.coordinates = pointCoords;
        map.getSource("point").setData(point);
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 10);
  }

  useEffect(() => {
    if (!map) return;
    map.on("load", function () {
      var origin = [76.121593, 19.45995];
      var destination = [88.155974, 26.646384];
      var route = usa;
      console.log(usa.features);
      // usa.features.forEach((migrationLine) => {
      //   let origin = migrationLine.properties.start;
      //   let destination = migrationLine.properties.end;
      //   var lineDistance = turf.lineDistance(route.features[0], "kilometers");
      //   var arc = [];
      //   var steps = 500;
      //   for (var i = 0; i < lineDistance; i += lineDistance / steps) {
      //     var segment = turf.along(route.features[0], i, "kilometers");
      //     arc.push(segment.geometry.coordinates);
      //   }
      //   route.features[0].geometry.coordinates = arc;
      //   map.addSource("point", {
      //     type: "geojson",
      //     data: point,
      //   });
      //   map.addLayer({
      //     id: "point",
      //     source: "point",
      //     type: "circle",
      //     layout: {},
      //     paint: {
      //       "circle-radius": 5,
      //       "circle-color": "red",
      //     },
      //   });
      //   animatePoint(map, route, point);
      // });
      var point = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: origin,
            },
          },
        ],
      };
      var lineDistance = turf.lineDistance(route.features[5], "kilometers");
      var arc = [];
      var steps = 500;
      for (var i = 0; i < lineDistance; i += lineDistance / steps) {
        var segment = turf.along(route.features[5], i, "kilometers");
        arc.push(segment.geometry.coordinates);
      }
      route.features[0].geometry.coordinates = arc;
      map.addSource("route", {
        type: "geojson",
        data: usa,
      });
      map.addSource("point", {
        type: "geojson",
        data: point,
      });
      map.addLayer({
        id: "route",
        source: "route",
        type: "line",
        paint: {
          "line-width": 2,
          "line-color": "#007cbf",
        },
      });
      map.addLayer({
        id: "point",
        source: "point",
        type: "circle",
        layout: {},
        paint: {
          "circle-radius": 10,
          "circle-color": "red",
        },
      });
      // map.on("click", "route", function (e) {
      //   new maplibreGl.Popup()
      //     .setHTML(e.features[0].properties.regionName)
      //     .addTo(map);
      // });
      console.log(route);
      animatePoint(map, route, point);
      setInterval(function () {
        animatePoint(map, route, point);
      }, 5000);
    });
  }, [map]);
}

export default GeoJsonloader;
