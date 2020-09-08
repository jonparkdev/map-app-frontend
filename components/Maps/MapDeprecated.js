/**
 * With my time constraints I opted to go with the React-Leaflet package
 */

// import { useEffect, useRef, useState } from 'react'
// import Popup from './MapComponents/Popup'
//
// import dynamic from 'next/dynamic'
// // const MapLeaflet = dynamic(() => import('react-leaflet/lib/Map'), {
// //   ssr: false
// // });
//
// const Map = () => {
//
//   // sets flag for repainting markers
//   const [onClickMarker, setOnClickMarker] = useState(false)
//
//   const [location, setLocation] = useState(null)
//
// //   const [, updateState] = React.useState();
// // const forceUpdate = React.useCallback(() => updateState({}), []);
//
//   // create a mutable ref for map object
//   const myMap = useRef()
//   // Help keep track of click events
//   const clickRef = useRef(0)
//   // A ref for a selected marker
//   const selectedMarkerRef = useRef()
//   useEffect(() => {
//     // Only renders map on first load
//     if(!myMap.current) {
//       // import map objext from leaflet
//       const L = require('leaflet')
//       // instantiate map object to ref variable
//       myMap.current = L.map('mapid').setView([51.505, -0.09], 7);
//       // add tile layer to map object from mapbox
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       }).addTo(myMap.current);
//
//       // add event handlers
//       myMap.current.on('click', onMapClick)
//       myMap.current.on('dblclick', onMapDoubleClick)
//     } else {
//       console.log(selectedMarkerRef.current)
//       // selectedMarkerRef.current.openPopup()
//     }
//   }, [onClickMarker]);
//
//   // target a point onClick
//   const onMapClick = (e) => {
//     const { lat, lng } = e.latlng
//     // add to click counter
//     clickRef.current = clickRef.current + 1;
//     // timer needed to distinguish double click from single click
//     setTimeout(function(){
//        if(clickRef.current == 1){
//
//          // check if temporary marker has been set
//          if(!selectedMarkerRef.current) {  // not set
//            // create temporary marker with popup
//            selectedMarkerRef.current = L.marker([lat, lng])
//            selectedMarkerRef.current.bindPopup(Popup)
//
//            // set event click handler
//            // selectedMarkerRef.current.on('click', () => {
//            //   forceUpdate()
//            // })
//            // add temporary to map
//            selectedMarkerRef.current.addTo(myMap.current)
//            // set marker for rerender and for future event use
//            setOnClickMarker(true)
//
//          } else { // marker already set
//
//            // remove marker from map
//            selectedMarkerRef.current.remove(myMap.current)
//            selectedMarkerRef.current = false
//            setOnClickMarker(false)
//
//          }
//           // reset click count after event complete
//           clickRef.current = 0
//        }
//     }, 300);
//   }
//
//   const onMapDoubleClick = (e) => {
//     clickRef.current = 0
//   }
//
//   return (
//     <>
//       <div id="mapid" />
//       <style jsx>
//         {`
//           #mapid {
//             z-index: 0;
//             height: 100vh;
//             width: 100%;
//             overflow: none;
//           }
//         `}
//       </style>
//     </>
//   )
// }
//
// export default Map
