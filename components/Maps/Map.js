import React, { useEffect, useState, useRef } from 'react'
import {connect} from 'react-redux'
import { render } from 'react-dom'
import PopupContent from './MapComponents/Popup'
import { Provider, useDispatch } from 'react-redux'
import { selectMarker, removeMarker } from '../../redux/actions'

const Map = ({ dispatch }) => {

  const [selectedMarker, setSelectedMarker] = useState(null)

  const clickRef = useRef(0)
  // target a point onClick
  const onMapClick = (e, Marker, Popup) => {
    const { lat, lng } = e.latlng

    //add to click counter
    clickRef.current = clickRef.current + 1;
    // timer needed to distinguish double click from single click
    setTimeout(function(){
       if(clickRef.current == 1){
         // check if temporary marker has been set
         if(!selectedMarker) {  // not set
           setSelectedMarker(
             <Marker position={[lat,lng]}>
               <Popup>
                  <PopupContent/>
               </Popup>
             </Marker>
           )
           dispatch(selectMarker({id: null, location: [lat,lng]}))
         } else { // marker already set
           setSelectedMarker(null)
            dispatch(removeMarker())
         }
          // reset click count after event complete
          clickRef.current = 0
       }
    }, 300);
  }

  const onMapDoubleClick = (e) => {
    clickRef.current = 0
  }


  useEffect(() => {
    const { Map, TileLayer, Marker, Popup } = require('react-leaflet')

    const position = [51.505, -0.09]
    const map = (

        <Map
          onDblClick={onMapDoubleClick}
          onClick={(e) => onMapClick(e, Marker, Popup)}
          style={{height: '100vh'}}
          center={position}
          zoom={13}
        >
          <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {selectedMarker}
        </Map>

    )
    render(map, document.getElementById('mapid'))

  }, [selectedMarker])


   return (
     <>
       <div id="mapid" />
       <style jsx>
         {`
           #mapid {
             position:absolute;
             top: 0;
             right: 0;
             z-index: 0;
             height: 100vh;
             width: 100%;
             overflow: none;
           }
         `}
       </style>
     </>
   )
 }

export default connect()(Map)
