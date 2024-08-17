import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Mapbox = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    const fetchDataAndMakeMap = async () => {
      try {
        const response = await fetch("/api/listing/geojson");
        const data = await response.json();

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/light-v10",
          center: [78.9629, 20.5937],
          zoom: 4,
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl());

        mapRef.current.on("load", () => {
          mapRef.current.addSource("listings", {
            type: "geojson",
            data: data,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
          });

          mapRef.current.addLayer({
            id: "clusters",
            type: "circle",
            source: "listings",
            filter: ["has", "point_count"],
            paint: {
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#00BCD4",
                10,
                "#2196F3",
                30,
                "#3F51B5",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                15,
                10,
                20,
                30,
                25,
              ],
            },
          });

          mapRef.current.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "listings",
            filter: ["has", "point_count"],
            layout: {
              "text-field": ["get", "point_count_abbreviated"],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            },
          });

          mapRef.current.addLayer({
            id: "unclustered-point",
            type: "circle",
            source: "listings",
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-color": "#11b4da",
              "circle-radius": 4,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
            },
          });

          // inspect a cluster on click
          mapRef.current.on("click", "clusters", (e) => {
            const features = mapRef.current.queryRenderedFeatures(e.point, {
              layers: ["clusters"],
            });
            const clusterId = features[0].properties.cluster_id;
            mapRef.current
              .getSource("listings")
              .getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) return;

                mapRef.current.easeTo({
                  center: features[0].geometry.coordinates,
                  zoom: zoom,
                });
              });
          });

          // When a click event occurs on a feature in
          // the unclustered-point layer, open a popup at
          // the location of the feature, with
          // description HTML from its properties.
          mapRef.current.on("click", "unclustered-point", (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const propertyName = e.features[0].properties.name;
            const desc = e.features[0].properties.description;
            const description =
              desc.length > 50 ? desc.slice(0, 65) + "..." : desc;

            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(
                `<strong>Property Name:</strong> ${propertyName}<br>
                <strong>Description:</strong> ${description}<br>`
              )
              .addTo(mapRef.current);
          });

          mapRef.current.on("mouseenter", "clusters", () => {
            mapRef.current.getCanvas().style.cursor = "pointer";
          });
          mapRef.current.on("mouseleave", "clusters", () => {
            mapRef.current.getCanvas().style.cursor = "";
          });
        });
      } catch (error) {
        console.error("Error fetching GeoJSON data: ", err);
      }
    };

    fetchDataAndMakeMap();

    return () => mapRef.current?.remove();
  }, []);

  return (
    <div
      id="map"
      ref={mapContainerRef}
      style={{ height: 500, width: "100%" }}
    ></div>
  );
};

export default Mapbox;
