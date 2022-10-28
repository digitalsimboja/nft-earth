import React, { useState, useEffect } from "react";
import { MapContainer, Circle, TileLayer, MapConsumer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import mapEvent from './MapEvents';
import icons from './constants'
import { useMapEvents } from 'react-leaflet/hooks'
import L from 'leaflet'
import Axios from 'axios'
import fetchData from "./MapEvents";

// const { MapContainer, Circle, TileLayer } = dynamic(() => import('react-leaflet'), {ssr: false}); //load it on client side only




function Map() {
   const position = [51.505, -0.09]
   const fillBlueOptions = { fillColor: "#0484D6" };
   const [map, setMap] = useState(null);
   const [what3words, setWhat3Words] = useState(false)
  

  
  
   function MyComponent() {
      
      const map =  useMapEvents({
        click: (e) => {
          let ne =('ne', map.getBounds().getNorthEast())
          let sw =('sw', map.getBounds().getSouthWest())
          setWhat3Words(true)
          let geoJsonData = fetchData(ne, sw)
          
         setWhat3Words(false)
      
        }
      });
      return null;
    }
   
   

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
         
            <MyComponent/> 
        

         <Circle center={position} pathOptions={fillBlueOptions} radius={50} />

      </MapContainer>
   );
}

export default Map;