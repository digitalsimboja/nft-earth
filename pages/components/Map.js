import React, { useState, useEffect } from "react";
import { MapContainer, Circle, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
   const position = [51.505, -0.09]
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
      <MapContainer  center={position}
      zoom={20}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      style={{
        height: "900px",
        width: "100%",
        position: "absolute",
        zIndex: "1",
       }} whenCreated={setMap}>
         <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
         <Circle center={position} pathOptions={fillBlueOptions} radius={50} />
      </MapContainer>
   );
}

export default Map;