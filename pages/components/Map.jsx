import { useState, useEffect } from "react";
import { MapContainer, Circle, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./../../styles/Map.module.css";

function Map() {
  const position = [51.505, -0.09];
  const fillBlueOptions = { fillColor: "#0484D6" };
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  return (
    <MapContainer
      className={styles.MapContainer}
      center={position}
      zoom={20}
      minZoom={2}
      doubleClickZoom
      attributionControl
      scrollWheelZoom
      dragging
      animate
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle center={position} pathOptions={fillBlueOptions} radius={50} />
    </MapContainer>
  );
}

export default Map;
