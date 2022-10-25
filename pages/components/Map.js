import React, { useState, useEffect, useRef } from "react";
import { MapContainer, Circle, TileLayer, useMap } from "react-leaflet";
// import { GridSectionGeoJsonResponse } from "@what3words/api";
import "leaflet/dist/leaflet.css";
import Head from 'next/head';
// import useGeolocation from '../../functionality/useGeolocation'
import useLocation from '../../functionality/useLocation';
import L from 'leaflet'




function Map() {
   const position = [51.505, -0.09]
   const fillBlueOptions = { fillColor: "#0484D6" };
   const mapRef = useRef()
   const [map, setMap] = useState(null);
   // const greenOptions = {color:'green'}
   const getLocation = useLocation()


   
   const markerIcon = new L.Icon({
      iconUrl: require('../../public/marker.png'),
      iconSize:[35, 45],
      iconAnchor:[17,46],
      popupAnchor:[0, -46]
   })



   // place the what3word api here that would convert to address or lat and long
   // const location = useGeolocation()
   // let swlat = location.coordinates.southwest.lat
   // let swlng = location.coordinates.southwest.lng
   // let northlat = location.coordinates.northeast.lat
   // let northlng = location.coordinate.northeast.lng

   // function would be called when the button is clicked
   // const showMyLocation = ()=>{
   //    if (location.loaded && !location.error){
   //       mapRef.current.leafletElement.flyTo([location.coordinates.lat, location.coordinates.lng], 
   //          {animate:true})
   //    }else{
   //       alert(location.error.message)
   //    }
   // }
  

   useEffect(() => {
      if (map) {
         setInterval(function () {
            map.invalidateSize();
         }, 100);
      }

      if(map){

      }
   }, [map]);

   return (
      <div>
         {/* <Head>
            
         </Head> */}
         <MapContainer  center={position}
         ref = {mapRef}
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
            {getLocation.loaded && !getLocation.error &&
            (
            <Marker 
            icon= {markerIcon}
            position={[
               
               getLocation.coordinates.lat, 
               getLocation.coordinates.lng,
            ]}
            ></Marker>
            )}

            

         </MapContainer>
         {/* <button onClick = {showMyLocation}>Get location</button> */}
      </div>
   );
}
// get the location of the user.. get the lon
// make the marker land on where the user is 


export default Map;
