import React from 'react'
import { render } from 'react-dom'

import Loading from '../components/common/Loading'




const Something = () => {

   React.useEffect(() => {
     const L = require('react-leaflet')


     const position = [51.505, -0.09]
     const map = (
       <L.Map style={{height: '100vh'}} center={position} zoom={13}>
         <L.TileLayer
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
         />
         <L.Marker position={position}>
           <L.Popup>
            <Loading/>
           </L.Popup>
         </L.Marker>
       </L.Map>
     )
     render(map, document.getElementById('map-container'))
   })


   return (
     <div id="map-container" style={{height: '100vh', position: 'relative'}}>

     </div>
   )
 }


export default Something
