import React, { useState, useEffect } from "react";
import { MapContainer, Circle, TileLayer, useMap } from "react-leaflet";
import what3words from "@what3words/api";
import { What3wordsService } from "@what3words/api";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { GREEN } from "../constants";
import { drawChosenSquares, drawGrid } from "../utils/helpers"


const options = {
   enableHighAccuracy: true,
}

function Grid({
   api,
   setMoveEnd,
   setLineOpacity,

}) {
   const map = useMap()
   useEffect(() => {
      map.whenReady(() => drawGrid(map, api))
      map.on('zoomend', function () {
         setMoveEnd(Math.random())
         drawGrid(map, api)
      })

      map.on('dragend', function () {
         setMoveEnd(Math.random())
         drawGrid(map, api)
      })

      map.on('movestart', () => {
         setLineOpacity(0)
      })
   }, [map, api])

   return null

}

function ChosenSquares({
   api,
   chosenSquares,
   isClaiming,
   words,
   setMoveEnd,
   claimed,
   moveEnd,
}) {
   const map = useMap()

   useEffect(() => {
      if (chosenSquares.length) {
         if (!isClaiming && !claimed) {
            drawChosenSquares(map, api, [words], isClaiming, setMoveEnd)
         }
      }
   }, [chosenSquares, isClaiming, moveEnd])

   return null
}

function Map() {
   // const position = [51.505, -0.09]
   const fillBlueOptions = { fillColor: "#0484D6" };
   const [map, setMap] = useState(null);

   const [hasAccessToLocation, setHasAccessToLocation] = useState(false)
   const [isClaiming, setIsClaiming] = useState(false)
   const [claimed, setClaimed] = useState(false)
   const [chosenSquares, setChosenSquares] = useState([])
   const [words, setWords] = useState('')
   const [initialCoords, setInitialCoords] = useState()
   const [moveEnd, setMoveEnd] = useState(0)

   const [lineRight, setLineRight] = useState(0)
   const [lineBottom, setLineBottom] = useState(0)
   const [lineOpacity, setLineOpacity] = useState(1)

   const [popupOpened, setPopupOpened] = useState(false)

   const api = what3words()
   api.setApiKey(process.env.NEXT_API_KEY)


   useEffect(() => {
      const id = navigator.geolocation.watchPosition(
         (position) => {
            setHasAccessToLocation(true)
            const {
               coords: { latitude: lat, longitude: lng }
            } = position
            console.log('Position: ', position)
            if (!initialCoords || (initialCoords[0] !== lat && initialCoords[1] !== lng)) {
               setInitialCoords([lat, lng])
               api.convertTo3wa({
                  coordinates: { lat, lng }
               })
                  .then((res) => {
                     setWords(res.words)
                     if (!chosenSquares.includes(res.words)) {
                        setChosenSquares([...chosenSquares, res.words])
                     }
                  })
                  .catch((err) => {
                     setHasAccessToLocation(false)
                     console.error(err)
                  })
            }
         },
         (err) => {
            setHasAccessToLocation(false)
            console.error(err)
         },
         options
      )

      return () => navigator.geolocation.clearWatch(id)
      // if (map) {
      //    setInterval(function () {
      //       map.invalidateSize();
      //    }, 100);
      // }
   }, [initialCoords, chosenSquares]);

   useEffect(() => {
      if (isClaiming) return
      const el = document.getElementsByClassName(words + GREEN.slice(1))[0]

      // Check and fix
      if (el) {
         const rect = el.getBoundingClientRect()
         setLineRight(rect.left - 50)
         setLineBottom(rect.bottom - 60)
         setLineOpacity(1)
      }

   }, [moveEnd, chosenSquares, isClaiming])

   const startTracking = () => {
      setIsClaiming(true)
   }

   const finishTracking = () => {
      setIsClaiming(false)
      setClaimed(true)
      setPopupOpened(true)
   }

   if (!hasAccessToLocation || !initialCoords) {
      return <div style={{ margin: '2rem' }}>Loading...</div>
   }

   return (
      <MapContainer center={initialCoords}
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
         <Circle center={initialCoords} pathOptions={fillBlueOptions} radius={50} />
      </MapContainer>
   );
}

export default Map;